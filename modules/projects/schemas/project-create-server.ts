import * as z from "zod";

export const projectServerSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().min(20).max(100),
  stack: z.array(z.string()),
  startDate: z.coerce.date(),
  status: z.enum(["WORKING_NOW", "WORKED"]),
  favicon: z
    .instanceof(File)

    .nullable()
    .optional(),
});

// export type ProjectServerFormValues = z.infer<typeof projectServerSchema>;
