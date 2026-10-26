-- AlterTable: Add optional inventory_id FK to combat table
-- Weapons can now be linked to an inventory item (they occupy space)
ALTER TABLE "combat" ADD COLUMN "inventory_id" INTEGER;

-- CreateIndex: inventory_id must be unique (one inventory item = at most one combat record)
CREATE UNIQUE INDEX "combat_inventory_id_key" ON "combat"("inventory_id");

-- AddForeignKey
ALTER TABLE "combat" ADD CONSTRAINT "combat_inventory_id_fkey"
  FOREIGN KEY ("inventory_id")
  REFERENCES "inventory"("id")
  ON DELETE SET NULL
  ON UPDATE CASCADE;
