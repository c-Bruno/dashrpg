import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/config
 *
 * POST — Creates a new key–value configuration entry.
 *         Both `name` (unique identifier) and `value` are required.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { body } = req;

      if (!body.name || !body.value) {
        return res.status(400).json({ error: 'Values Not Set' });
      }

      // Explicitly select only expected fields to prevent mass-assignment of unknown columns
      const config = await prisma.config.create({
        data: { name: body.name, value: body.value },
      });

      return res.status(201).json(config);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[config] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
