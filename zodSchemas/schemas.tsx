import { z } from 'zod';

export const TaskSchema = z.object({
	id: z.string(),
	title: z
		.string()
		.min(1, 'The title is required')
		.max(48, 'The title must be shorter than 48 characters.'),
	description: z
		.string()
		.max(512, 'The description must be shorter than 512 characters'),
	priority: z.enum(['low', 'medium', 'high', '']).optional(),
	date: z.date().optional(),
	completed: z.boolean(),
});

export type TaskType = z.infer<typeof TaskSchema>;
