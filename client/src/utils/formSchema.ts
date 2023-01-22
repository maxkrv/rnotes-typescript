import { z } from "zod";

export const formSchema = z
	.object({
		email: z.string().email({ message: "Invalid email" }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters long" }),
	})
	.required({ email: true, password: true, message: "This field is required" });

export type FormSchemaType = z.infer<typeof formSchema>;
