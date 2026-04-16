import { prisma } from 'common/libs/prisma.lib';
import type { NextApiHandler } from 'next';

/**
 * Handler for /api/inventory
 *
 * POST — Creates a new inventory item linked to the specified character and
 *         inserts the junction record in the characterInventory table.
 * GET  — Returns all inventory items sorted alphabetically by description.
 */
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { body } = req;

      if (!body.description) {
        return res.status(400).json({ error: 'Name not set' });
      }

      const inventory = await prisma.inventory.create({ data: body });

      // Create the junction record directly — no need to query the character first
      // since character_id arrives in the body and is stored on the inventory row itself
      await prisma.characterInventory.create({
        data: { character_id: body.character_id, inventory_id: inventory.id },
      });

      return res.status(201).json(inventory);
    } else if (req.method === 'GET') {
      const inventories = await prisma.inventory.findMany({
        orderBy: [{ description: 'asc' }],
      });

      return res.status(200).json(inventories);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    console.error('[inventory] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
