const WITCH_DICES = Object.freeze({
  D4: 'd4',
  D6: 'd6',
  D8: 'd8',
  D10: 'd10',
  D12: 'd12',
  D20: 'd20',
});

const DICE_ROLLS = Object.freeze({
  table: [
    /*0*/ { normal: 20 }, // Atributos com valor = 1
    /*1*/ { normal: 19, good: 20 }, // Atributos com valor = 2
    /*2*/ { normal: 18, good: 20 }, // Atributos com valor = 3
    /*3*/ { normal: 17, good: 19 }, // Atributos com valor = 4
    /*4*/ { normal: 16, good: 19, extreme: 20 }, // Atributos com valor = 5
    /*5*/ { normal: 15, good: 19, extreme: 20 }, // Atributos com valor = 6
    /*6*/ { normal: 14, good: 18, extreme: 20 }, // Atributos com valor = 7
    /*7*/ { normal: 13, good: 18, extreme: 20 }, // Atributos com valor = 8
    /*8*/ { normal: 12, good: 17, extreme: 20 }, // Atributos com valor = 9
    /*9*/ { normal: 11, good: 17, extreme: 20 }, // Atributos com valor = 10
    /*10*/ { normal: 10, good: 16, extreme: 20 }, // Atributos com valor = 11
    /*11*/ { normal: 9, good: 16, extreme: 19 }, // Atributos com valor = 12
    /*12*/ { normal: 8, good: 16, extreme: 19 }, // Atributos com valor = 13
    /*13*/ { normal: 7, good: 15, extreme: 19 }, // Atributos com valor = 14
    /*14*/ { normal: 6, good: 14, extreme: 19 }, // Atributos com valor = 15
    /*15*/ { normal: 5, good: 14, extreme: 18 }, // Atributos com valor = 16
    /*16*/ { normal: 5, good: 14, extreme: 18 }, // Atributos com valor = 17
    /*17*/ { normal: 5, good: 13, extreme: 18 }, // Atributos com valor = 18
    /*18*/ { normal: 5, good: 12, extreme: 18 }, // Atributos com valor = 19
    /*19*/ { normal: 5, good: 12, extreme: 18 }, // Atributos com valor = 20
    /*20*/ { normal: 5, good: 11, extreme: 17 }, // Atributos com valor iguais ou superiores a 21
  ],
});

export default { WITCH_DICES, DICE_ROLLS };
