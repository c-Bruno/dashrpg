import path from 'node:path';
import { defineConfig } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: path.join('src', 'prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DB_PROVIDER_URL,
  },
});
