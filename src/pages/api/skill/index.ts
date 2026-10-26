import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/skill
 *
 * POST — Creates a new skill definition and automatically assigns it to every
 *         existing character by inserting rows in the characterSkills junction table.
 * GET  — Returns all skill definitions sorted alphabetically by name.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { body } = req;

      if (!body.name) {
        return res.status(400).json({ error: 'Name not set' });
      }

      const skill = await prisma.skill.create({ data: body });

      // Propagate the new skill to every existing character so the sheet stays consistent
      const characters = await prisma.character.findMany({ select: { id: true } });

      await Promise.all(
        characters.map((character) =>
          prisma.characterSkills.create({
            data: { character_id: character.id, skill_id: skill.id },
          })
        )
      );

      return res.status(201).json(skill);
    } else if (req.method === 'GET') {
      const skills = await prisma.skill.findMany({
        orderBy: [{ name: 'asc' }],
      });

      return res.status(200).json(skills);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[skill] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
