import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/attribute/[id]
 *
 * DELETE — Removes all character–attribute junction rows first, then deletes the
 *           attribute definition atomically via a Prisma transaction.
 * PUT    — Updates the name or other fields of an existing attribute definition.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'DELETE') {
      const id = Number(req.query.id);

      // Remove junction rows before the parent to satisfy FK constraints
      const deleteFromCharacterAttributes = prisma.characterAttributes.deleteMany({
        where: { attribute_id: id },
      });

      const deleteAttribute = prisma.attribute.delete({ where: { id } });

      await prisma.$transaction([deleteFromCharacterAttributes, deleteAttribute]);

      return res.status(200).json({ success: true, callback: 'removeAttribute', id });
    } else if (req.method === 'PUT') {
      const { body } = req;

      if (!body.name) {
        return res.status(400).json({ error: 'Name not set' });
      }

      const id = Number(req.query.id);

      const attribute = await prisma.attribute.update({ where: { id }, data: body });

      return res.status(200).json(attribute);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[attribute/[id]] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
