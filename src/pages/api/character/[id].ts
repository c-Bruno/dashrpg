import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/character/[id]
 *
 * DELETE — Removes a character and all its related data (rolls, attributes,
 *           skills) atomically via a Prisma transaction.
 * GET    — Returns a single character with fully populated attributes and skills.
 * PUT    — Updates scalar fields of a character by id.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const id = Number(req.query.id);

      // Build delete operations — order matters for FK constraints:
      // dependent junction/data rows must be removed before the parent record
      const deleteRolls = prisma.roll.deleteMany({ where: { character_id: id } });
      const deleteAttributes = prisma.characterAttributes.deleteMany({ where: { character_id: id } });
      const deleteSkills = prisma.characterSkills.deleteMany({ where: { character_id: id } });
      const deleteCharacter = prisma.character.delete({ where: { id } });

      // Execute all deletes atomically so the DB is never left in a partial state
      await prisma.$transaction([deleteRolls, deleteAttributes, deleteSkills, deleteCharacter]);

      return res.status(200).json({ success: true, callback: 'removeCharacter', id });
    } else if (req.method === 'GET') {
      const id = Number(req.query.id);

      // Include nested attribute and skill definitions for the character sheet view
      const character = await prisma.character.findUnique({
        where: { id },
        include: {
          attributes: { include: { attribute: true } },
          skills: { include: { skill: true } },
        },
      });

      return res.status(200).json(character);
    } else if (req.method === 'PUT') {
      const { body } = req;
      const id = Number(req.query.id);

      const character = await prisma.character.update({
        where: { id },
        data: body,
      });

      return res.status(200).json(character);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[character/[id]] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
