import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const id = Number(req.query.id);

      // Check for a linked inventory item before deleting
      const combatRecord = await prisma.combat.findUnique({ where: { id } });
      const linkedInventoryId = combatRecord?.inventory_id ?? null;

      if (linkedInventoryId) {
        await prisma.$transaction([
          prisma.characterCombat.deleteMany({ where: { combat_id: id } }),
          prisma.combat.delete({ where: { id } }),
          prisma.characterInventory.deleteMany({ where: { inventory_id: linkedInventoryId } }),
          prisma.inventory.delete({ where: { id: linkedInventoryId } }),
        ]);
      } else {
        await prisma.$transaction([
          prisma.characterCombat.deleteMany({ where: { combat_id: id } }),
          prisma.combat.delete({ where: { id } }),
        ]);
      }

      return res.status(200).json({ success: true, id, linkedInventoryId });
    } else if (req.method === 'PUT') {
      const id = Number(req.query.id);
      const { weapon, type, damage, current_load, total_load } = req.body;

      // Build update with only provided fields — supports both full edits and partial shoot updates
      const data = Object.fromEntries(
        Object.entries({ weapon, type, damage, current_load, total_load }).filter(([, v]) => v !== undefined),
      );

      const combat = await prisma.combat.update({ where: { id }, data });

      return res.status(200).json(combat);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[combat/[id]] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
