import { DiceLabelColor, DiceOutcome } from 'common/enums/roll-dice.enum';

type DiceResult = {
  number: string;
  description?: any;
  color: DiceLabelColor;
};

export const rollDamage = (damageAmount: string): DiceResult => {
  const diceNumber = rollDice(damageAmount);

  const diceTypeResult = calcDice(diceNumber, damageAmount);
  const diceColor = getDiceColor(diceTypeResult);
  return { number: diceNumber, description: diceTypeResult, color: diceColor };
};

// Rolador de dados
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

// Calcula qual o tipo do resultado do dado (Extremo, Bom, Normal, Fracasso)
export const calcDice = (dice: string, damageAmount: string): DiceOutcome => {
  const numericDice = Number(dice);
  if (numericDice === 20 && damageAmount === '1d20') return DiceOutcome.ExtremeSuccess; // 20 NATURAL
  if (numericDice === 100 && damageAmount === '1d100') return DiceOutcome.ExtremeSuccess; // 100 NATURAL
  if (numericDice === 1) return DiceOutcome.ExtremeFailure; // 1 NATURAL
  return DiceOutcome.Normal;
};

// Retorna a cor do label
export const getDiceColor = (outcome: DiceOutcome): DiceLabelColor => {
  switch (outcome) {
    case DiceOutcome.ExtremeSuccess:
      return DiceLabelColor.Success;
    case DiceOutcome.ExtremeFailure:
      return DiceLabelColor.Error;
    default:
      return DiceLabelColor.Primary;
  }
};
