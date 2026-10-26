import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Builds the nested `create` payload to connect a list of entities
 * to a newly created character via Prisma's nested write API.
 *
 * @param array - List of entities with at least an `id` field
 * @param entityName - Prisma relation field name (e.g. 'attribute', 'skill')
 */
const parseRelationArray = (array: { id: number }[], entityName: string) =>
  array.map((item) => ({
    [entityName]: {
      connect: { id: item.id },
    },
  }));

/**
 * Handler for /api/character
 *
 * POST — Creates a new character and automatically links all existing
 *         attributes and skills to it via junction tables.
 * GET  — Returns all characters with their full attribute and skill data.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { body } = req;

      if (!body.name) {
        return res.status(400).json({ error: 'Name not set' });
      }

      // Fetch existing attributes and skills in parallel to minimise latency
      const [attributes, skills] = await Promise.all([
        prisma.attribute.findMany({ select: { id: true } }),
        prisma.skill.findMany({ select: { id: true } }),
      ]);

      // Create the character and connect all attributes/skills in a single query
      const character = await prisma.character.create({
        data: {
          ...body,
          attributes: { create: parseRelationArray(attributes, 'attribute') },
          skills: { create: parseRelationArray(skills, 'skill') },
        },
        include: {
          attributes: true,
          skills: true,
        },
      });

      return res.status(201).json(character);
    } else if (req.method === 'GET') {
      // Return each character with its nested attribute and skill definitions
      const characters = await prisma.character.findMany({
        include: {
          attributes: { include: { attribute: true } },
          skills: { include: { skill: true } },
        },
      });

      return res.status(200).json(characters);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[character] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
