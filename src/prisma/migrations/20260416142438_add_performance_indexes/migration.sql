-- CreateIndex
CREATE INDEX "character_attributes_attribute_id_idx" ON "character_attributes"("attribute_id");

-- CreateIndex
CREATE INDEX "character_combat_combat_id_idx" ON "character_combat"("combat_id");

-- CreateIndex
CREATE INDEX "character_inventory_inventory_id_idx" ON "character_inventory"("inventory_id");

-- CreateIndex
CREATE INDEX "character_skills_skill_id_idx" ON "character_skills"("skill_id");

-- CreateIndex
CREATE INDEX "roll_character_id_idx" ON "roll"("character_id");
