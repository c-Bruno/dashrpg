import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/character/attribute
 *
 * PUT — Updates the value of a specific attribute for a given character.
 *       Uses the composite primary key (character_id, attribute_id) to locate the record.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      const { character_id, attribute_id, value } = req.body;

      if (!character_id || !attribute_id || value === undefined || value === null) {
        return res.status(400).json({ error: 'Missing Required Data' });
      }

      // Locate the junction row via its composite PK and update the stored value
      const result = await prisma.characterAttributes.update({
        data: { value: value.toString() },
        where: {
          character_id_attribute_id: { attribute_id, character_id },
        },
      });

      return res.status(200).json(result);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[character/attribute] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
