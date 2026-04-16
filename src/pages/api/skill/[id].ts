import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/skill/[id]
 *
 * DELETE — Removes all character–skill junction rows first, then deletes the
 *           skill definition atomically via a Prisma transaction.
 * PUT    — Updates the name or other fields of an existing skill definition.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const id = Number(req.query.id);

      // Remove junction rows before the parent to satisfy FK constraints
      const deleteFromCharacterSkills = prisma.characterSkills.deleteMany({
        where: { skill_id: id },
      });

      const deleteSkill = prisma.skill.delete({ where: { id } });

      await prisma.$transaction([deleteFromCharacterSkills, deleteSkill]);

      return res.status(200).json({ success: true, callback: 'removeSkill', id });
    } else if (req.method === 'PUT') {
      const { body } = req;

      if (!body.name) {
        return res.status(400).json({ error: 'Name not set' });
      }

      const id = Number(req.query.id);

      const skill = await prisma.skill.update({ where: { id }, data: body });

      return res.status(200).json(skill);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[skill/[id]] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
