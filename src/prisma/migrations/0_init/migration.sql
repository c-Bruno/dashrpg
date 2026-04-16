-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "player_name" TEXT,
    "weight" TEXT,
    "occupation" TEXT,
    "birth" TEXT,
    "birthplace" TEXT,
    "fear" TEXT,
    "armor" INTEGER NOT NULL DEFAULT 0,
    "current_hit_points" INTEGER NOT NULL DEFAULT 0,
    "max_hit_points" INTEGER NOT NULL DEFAULT 0,
    "current_sanity_points" INTEGER NOT NULL DEFAULT 0,
    "max_sanity_points" INTEGER NOT NULL DEFAULT 0,
    "current_picture" INTEGER NOT NULL DEFAULT 1,
    "is_dead" BOOLEAN NOT NULL DEFAULT false,
    "is_creazy" BOOLEAN NOT NULL DEFAULT false,
    "standard_character_picture_url" TEXT,
    "injured_character_picture_url" TEXT,
    "specialItem" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_inventory" (
    "character_id" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "character_inventory_pkey" PRIMARY KEY ("character_id","inventory_id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "weight" DOUBLE PRECISION DEFAULT 0.00,
    "character_id" INTEGER NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_attributes" (
    "character_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "character_attributes_pkey" PRIMARY KEY ("character_id","attribute_id")
);

-- CreateTable
CREATE TABLE "attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "skill_id" INTEGER,

    CONSTRAINT "attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_combat" (
    "character_id" INTEGER NOT NULL,
    "combat_id" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "character_combat_pkey" PRIMARY KEY ("character_id","combat_id")
);

-- CreateTable
CREATE TABLE "combat" (
    "id" SERIAL NOT NULL,
    "weapon" TEXT NOT NULL,
    "type" TEXT,
    "damage" TEXT,
    "current_load" TEXT,
    "total_load" TEXT,
    "character_id" INTEGER NOT NULL,

    CONSTRAINT "combat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_skills" (
    "character_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "value" TEXT,

    CONSTRAINT "character_skills_pkey" PRIMARY KEY ("character_id","skill_id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roll" (
    "id" SERIAL NOT NULL,
    "max_number" INTEGER NOT NULL,
    "rolled_number" INTEGER NOT NULL,
    "character_id" INTEGER NOT NULL,
    "rolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "config_name_key" ON "config"("name");

-- AddForeignKey
ALTER TABLE "character_inventory" ADD CONSTRAINT "character_inventory_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_inventory" ADD CONSTRAINT "character_inventory_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_attributes" ADD CONSTRAINT "character_attributes_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_attributes" ADD CONSTRAINT "character_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_combat" ADD CONSTRAINT "character_combat_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_combat" ADD CONSTRAINT "character_combat_combat_id_fkey" FOREIGN KEY ("combat_id") REFERENCES "combat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_skills" ADD CONSTRAINT "character_skills_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_skills" ADD CONSTRAINT "character_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roll" ADD CONSTRAINT "roll_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
