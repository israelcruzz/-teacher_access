import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3033),
  JWT_SECRET: z.coerce.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error("Enviroment Variables Not Found");
}

export const env = _env.data;
