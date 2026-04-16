import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/config/[name]
 *
 * PUT — Updates the value of an existing config entry identified by its unique name.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      const { body } = req;
      // Extract name from the route segment — always a string at this point
      const name = req.query.name as string;

      const config = await prisma.config.update({
        where: { name },
        data: body,
      });

      return res.status(200).json(config);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[config/[name]] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
