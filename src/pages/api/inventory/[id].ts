import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/inventory/[id]
 *
 * DELETE — Removes all character–inventory junction rows first, then deletes the
 *           inventory item atomically via a Prisma transaction.
 * PUT    — Updates the description or other fields of an existing inventory item.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const id = Number(req.query.id);

      // Remove junction rows before the parent to satisfy FK constraints
      const deleteFromCharacterInventory = prisma.characterInventory.deleteMany({
        where: { inventory_id: id },
      });

      const deleteInventory = prisma.inventory.delete({ where: { id } });

      await prisma.$transaction([deleteFromCharacterInventory, deleteInventory]);

      return res.status(200).json({ success: true });
    } else if (req.method === 'PUT') {
      const { body } = req;

      if (!body.description) {
        return res.status(400).json({ error: 'Name not set' });
      }

      const id = Number(req.query.id);

      const inventory = await prisma.inventory.update({ where: { id }, data: body });

      return res.status(200).json(inventory);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[inventory/[id]] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
