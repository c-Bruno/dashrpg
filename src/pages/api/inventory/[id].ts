import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const id = Number(req.query.id);

      // Check for a linked combat record before deleting
      const linkedCombat = await prisma.combat.findUnique({ where: { inventory_id: id } });
      const linkedCombatId = linkedCombat?.id ?? null;

      if (linkedCombatId) {
        await prisma.$transaction([
          prisma.characterCombat.deleteMany({ where: { combat_id: linkedCombatId } }),
          prisma.combat.delete({ where: { id: linkedCombatId } }),
          prisma.characterInventory.deleteMany({ where: { inventory_id: id } }),
          prisma.inventory.delete({ where: { id } }),
        ]);
      } else {
        await prisma.$transaction([
          prisma.characterInventory.deleteMany({ where: { inventory_id: id } }),
          prisma.inventory.delete({ where: { id } }),
        ]);
      }

      return res.status(200).json({ success: true, id, linkedCombatId });
    } else if (req.method === 'PUT') {
      const id = Number(req.query.id);
      const { description, weight } = req.body;

      const inventory = await prisma.inventory.update({ where: { id }, data: { description, weight } });

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
