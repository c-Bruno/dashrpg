import dicesConstant from 'common/constants/dices.constant';
import { DiceLabelColor, DiceOutcome } from 'common/enums/roll-dice.enum';

type DiceResult = {
  number: string;
  description?: string;
  color: DiceLabelColor;
};

export type RollDiceResult = {
  number: string;
  description?: string;
  color: 'primary' | 'error' | 'success' | 'info' | 'warning';
};

// attributeValue: valor numérico do atributo do personagem (1–21+)
export const rollDamage = (damageAmount: string, attributeValue?: number): DiceResult => {
  const diceNumber = rollDice(damageAmount);
  const diceTypeResult = calcDice(Number(diceNumber), damageAmount, attributeValue);
  const diceColor = getDiceColor(diceTypeResult);
  return { number: diceNumber, description: diceTypeResult, color: diceColor };
};

export const rollDice = (dice: string): string => {
  let totalDamage = 0;

  dice.split('+').forEach((segment) => {
    const trimmed = segment.trim();
    const [rawCount, rawSides] = trimmed.split('d');

    const count = Number(rawCount);
    const sides = Number(rawSides);

    if (!Number.isFinite(count) || !Number.isFinite(sides)) return;

    for (let i = 0; i < count; i++) {
      totalDamage += Math.floor(Math.random() * sides) + 1;
    }
  });

  return String(totalDamage);
};

export const calcDice = (roll: number, damageAmount: string, attributeValue?: number): DiceOutcome => {
  if (roll === 1) return DiceOutcome.ExtremeFailure;

  // Teste de atributo: compara o resultado com os limiares da tabela
  if (attributeValue !== undefined) {
    const index = Math.min(Math.max(attributeValue - 1, 0), 20);
    const thresholds = dicesConstant.DICE_ROLLS.table[index] as { normal: number; good?: number; extreme?: number };

    if (thresholds.extreme !== undefined && roll >= thresholds.extreme) return DiceOutcome.ExtremeSuccess;
    if (thresholds.good !== undefined && roll >= thresholds.good) return DiceOutcome.GoodSuccess;
    if (roll >= thresholds.normal) return DiceOutcome.Success;
    return DiceOutcome.Failure;
  }

  // Rolagem de dano sem atributo: apenas detecta resultados naturais extremos
  if (roll === 20 && damageAmount === '1d20') return DiceOutcome.ExtremeSuccess;
  if (roll === 100 && damageAmount === '1d100') return DiceOutcome.ExtremeSuccess;
  return DiceOutcome.Normal;
};

export const getDiceColor = (outcome: DiceOutcome): DiceLabelColor => {
  switch (outcome) {
    case DiceOutcome.ExtremeSuccess:
      return DiceLabelColor.Success;
    case DiceOutcome.GoodSuccess:
      return DiceLabelColor.Info;
    case DiceOutcome.Success:
      return DiceLabelColor.Primary;
    case DiceOutcome.Failure:
      return DiceLabelColor.Warning;
    case DiceOutcome.ExtremeFailure:
      return DiceLabelColor.Error;
    default:
      return DiceLabelColor.Primary;
  }
};
