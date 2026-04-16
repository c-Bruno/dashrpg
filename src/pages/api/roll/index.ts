import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

import { generateRandomNumber } from '../../../utils';

/**
 * Handler for /api/roll
 *
 * POST — Generates one or more dice rolls for a character, persists each result
 *         to the database, and returns the full list of rolled values.
 *
 *         Required body fields: `character_id`, `max_number`.
 *         Optional body field:  `times` (defaults to 1).
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { body } = req;

      if (!body.character_id || !body.max_number) {
        return res.status(400).json({ error: 'Data not Set' });
      }

      // Guard against rolling for a non-existent character before writing any data
      const character = await prisma.character.findUnique({
        where: { id: Number(body.character_id) },
        select: { id: true },
      });

      if (!character) {
        return res.status(400).json({ error: 'Character not found' });
      }

      const times = body.times ? Number(body.times) : 1;

      // Build all roll records in memory first, then persist with a single createMany
      const rolls = Array.from({ length: times }, () => ({
        max_number: Number(body.max_number),
        rolled_number: generateRandomNumber(body.max_number),
        character_id: Number(body.character_id),
      }));

      await prisma.roll.createMany({ data: rolls });

      return res.status(201).json(rolls);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[roll] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
