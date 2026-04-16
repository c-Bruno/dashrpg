import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/combat/[id]
 *
 * DELETE — Removes all character–combat junction rows first, then deletes the
 *           combat item atomically via a Prisma transaction.
 * PUT    — Updates the weapon or other fields of an existing combat item.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const id = Number(req.query.id);

      // Remove junction rows before the parent to satisfy FK constraints
      const deleteFromCharacterCombat = prisma.characterCombat.deleteMany({
        where: { combat_id: id },
      });

      const deleteCombat = prisma.combat.delete({ where: { id } });

      await prisma.$transaction([deleteFromCharacterCombat, deleteCombat]);

      return res.status(200).json({ success: true, callback: 'removeCombat', id });
    } else if (req.method === 'PUT') {
      const { body } = req;

      if (!body.weapon) {
        return res.status(400).json({ error: 'Weapon not set' });
      }

      const id = Number(req.query.id);

      const combat = await prisma.combat.update({ where: { id }, data: body });

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
