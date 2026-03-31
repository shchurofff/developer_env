import * as z from "zod";

export const projectServerSchema = z.object({
  name: z.string().trim().min(3).max(32),
  description: z.string().trim().min(20).max(150),
  stack: z.array(z.string()).min(1),
  startDay: z.coerce.date(),
  endDay: z
    .preprocess(
      (value) => (value === null || value === "" ? undefined : value),
      z.coerce.date().optional()
    )
    .optional(),
  status: z.enum(["WORKING_NOW", "WORKED"]),
  favicon: z.instanceof(File).nullable().optional(),
});

// export type ProjectServerFormValues = z.infer<typeof projectServerSchema>;
