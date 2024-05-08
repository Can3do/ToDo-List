'use client';
import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { type TodoType } from '@/app/page';
import { generateId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from '@/components/ui/select';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from './ui/calendar';

import { z } from 'zod';

const addTasksFormSchema = z.object({
	title: z.string().max(48, 'The title must be shorter than 48 characters.'),
	description: z
		.string()
		.max(512, 'The description must be shorter than 512 characters'),
	priority: z.enum(['low', 'medium', 'high']),
	date: z.date(),
});

export const AddTaskForm = ({
	setTodos,
}: {
	setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
	const form = useForm<z.infer<typeof addTasksFormSchema>>({
		resolver: zodResolver(addTasksFormSchema),
		defaultValues: {
			title: '',
			description: '',
			priority: 'low',
		},
	});

	const createTodo: SubmitHandler<z.infer<typeof addTasksFormSchema>> = (
		TodoformFields
	) => {
		setTodos((oldTodos) => [
			...oldTodos,
			{
				...TodoformFields,
				id: generateId(),
				completed: false,
			},
		]);
		form.reset();
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(createTodo)}
					className='flex flex-col gap-6 border p-6 rounded-lg'
				>
					<div className='flex gap-4 flex-wrap items-end'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem className='flex flex-col w-full lg:w-auto'>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											placeholder='Title'
											type='text'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem className='flex flex-col w-full lg:w-auto'>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											placeholder='Description'
											type='text'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='priority'
							render={({ field }) => (
								<FormItem className='flex flex-col w-full lg:w-auto'>
									<FormLabel>Priority</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder='Select a priority'></SelectValue>
											</SelectTrigger>

											<SelectContent>
												<SelectGroup>
													<SelectItem value='low'>
														Low
													</SelectItem>
													<SelectItem value='medium'>
														Medium
													</SelectItem>
													<SelectItem value='high'>
														High
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='date'
							render={({ field }) => (
								<FormItem className='flex flex-col w-full lg:w-auto'>
									<FormLabel>Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'pl-3 font-normal flex justify-start',
														!field.value &&
															'text-muted-foreground'
													)}
												>
													{field.value ? (
														format(
															field.value,
															'PPP'
														)
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className='w-auto p-0'
											align='start'
										>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date < new Date()
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						size='lg'
						variant='default'
						className='w-full lg:max-w-32'
					>
						Add Task
					</Button>
				</form>
			</Form>
		</>
	);
};
