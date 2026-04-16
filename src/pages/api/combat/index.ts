import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/combat
 *
 * POST — Creates a new combat item linked to the specified character and inserts
 *         the junction record in the characterCombat table.
 * GET  — Returns all combat items sorted alphabetically by weapon name.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { body } = req;

      if (!body.weapon) {
        return res.status(400).json({ error: 'Name not set' });
      }

      const combat = await prisma.combat.create({ data: body });

      // Create the junction record directly — no need to query the character first
      // since character_id arrives in the body and is stored on the combat row itself
      await prisma.characterCombat.create({
        data: { character_id: body.character_id, combat_id: combat.id },
      });

      return res.status(201).json(combat);
    } else if (req.method === 'GET') {
      const combat = await prisma.combat.findMany({
        orderBy: [{ weapon: 'asc' }],
      });

      return res.status(200).json(combat);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[combat] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
