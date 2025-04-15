const calcSpaceInventory = (character: any) => {
  if (!character) return null;

  const baseSpace = 10;

  const strengthBonus =
    character.skills?.reduce((acc, item) => {
      const skillName = item?.skill?.name?.toUpperCase();
      if (skillName?.includes('FORÇA') || skillName?.includes('FORCA')) {
        return acc + (Number(item.value) * 2 || 0);
      }
      return acc;
    }, 0) ?? 0;

  const occupiedSpace =
    character.inventory?.reduce((acc, item) => {
      return acc + (Number(item.inventory?.weight) || 0);
    }, 0) ?? 0;

  return baseSpace + strengthBonus - occupiedSpace;
};

export default calcSpaceInventory;
