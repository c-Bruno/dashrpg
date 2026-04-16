import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'O nome do personagem é obrigatório'),
  player_name: z.string().nullable().optional(),
  age: z.coerce.number().nullable().optional(),
  gender: z.string().nullable().optional(),
  fear: z.string().nullable().optional(),
  birth: z.string().nullable().optional(),
  weight: z.string().nullable().optional(),
  birthplace: z.string().nullable().optional(),
  occupation: z.string().nullable().optional(),
});

export default schema;
