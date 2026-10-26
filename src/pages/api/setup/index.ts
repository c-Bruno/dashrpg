import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/setup
 *
 * POST — Seeds the configuration table with default application settings.
 *         Intended to be called once during initial environment setup.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      // Default timing values that control the dice animation on the client
      const configs = [
        { name: 'DICE_ON_SCREEN_TIMEOUT_IN_MS', value: '5000' },
        { name: 'TIME_BETWEEN_DICES_IN_MS', value: '2000' },
      ];

      await prisma.config.createMany({ data: configs });

      return res.status(201).json({ success: true });
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[setup] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
