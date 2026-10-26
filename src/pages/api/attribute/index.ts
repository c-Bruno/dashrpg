import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/attribute
 *
 * POST — Creates a new attribute definition and automatically assigns it to every
 *         existing character by inserting rows in the characterAttributes junction table.
 * GET  — Returns all attribute definitions sorted alphabetically by name.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { body } = req;

      if (!body.name) {
        return res.status(400).json({ error: 'Name not set' });
      }

      const attribute = await prisma.attribute.create({ data: body });

      // Propagate the new attribute to every existing character so the sheet stays consistent
      const characters = await prisma.character.findMany({ select: { id: true } });

      await Promise.all(
        characters.map((character) =>
          prisma.characterAttributes.create({
            data: { character_id: character.id, attribute_id: attribute.id },
          }),
        ),
      );

      return res.status(201).json(attribute);
    } else if (req.method === 'GET') {
      const attributes = await prisma.attribute.findMany({
        orderBy: [{ name: 'asc' }],
      });

      return res.status(200).json(attributes);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[attribute] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
