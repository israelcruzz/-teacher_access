import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.coerce.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error("Enviroment Variables Not Found");
}

export const env = _env;
