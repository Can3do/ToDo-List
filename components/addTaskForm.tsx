'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	TextAlignLeftIcon,
	ClockIcon,
	TextAlignMiddleIcon,
} from '@radix-ui/react-icons';

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
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';

const addTasksFormSchema = z.object({
	title: z
		.string()
		.min(1, 'The title is required')
		.max(48, 'The title must be shorter than 48 characters.'),
	description: z
		.string()
		.max(512, 'The description must be shorter than 512 characters'),
	priority: z.enum(['low', 'medium', 'high', '']),
	date: z.date(),
});

export const AddTaskForm = ({
	setTodos,
	setDialogOpen,
}: {
	setTodos: Dispatch<SetStateAction<TodoType[]>>;
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const form = useForm<z.infer<typeof addTasksFormSchema>>({
		resolver: zodResolver(addTasksFormSchema),
		defaultValues: {
			title: '',
			description: '',
			priority: 'low',
			date: new Date(),
		},
	});

	const [calendarOpen, setCalendarOpen] = useState(false);

	const createTodo: SubmitHandler<z.infer<typeof addTasksFormSchema>> = (
		todoFormFields
	) => {
		setTodos((oldTodos) => [
			...oldTodos,
			{
				...todoFormFields,
				id: generateId(),
				completed: false,
			},
		]);
		form.reset();
	};

	const [isDescriptionFieldShowing, setIsDescriptionFieldShowing] =
		useState(false);
	const [isPriorityFieldShowing, setIsPriorityFieldShowing] = useState(false);

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((formData) => {
						createTodo(formData);
						setDialogOpen(false);
					})}
					className='flex flex-col gap-6 rounded-lg'
				>
					<div className='flex gap-4 flex-wrap items-end'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem className='flex flex-col w-full'>
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
						{isDescriptionFieldShowing && (
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem className='flex flex-col w-full'>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Description'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						{isPriorityFieldShowing && (
							<FormField
								control={form.control}
								name='priority'
								render={({ field }) => (
									<FormItem className='flex flex-col w-full'>
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
														<SelectItem
															value='low'
															onClick={(e) => {
																e.stopPropagation();
															}}
														>
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
						)}
					</div>

					<div className='flex gap-2'>
						<Button
							type='button'
							variant='ghost'
							onClick={() => {
								setIsDescriptionFieldShowing(
									!isDescriptionFieldShowing
								);
							}}
						>
							<TextAlignLeftIcon className='w-5 h-5' />
						</Button>
						<Button
							type='button'
							variant='ghost'
							onClick={() => {
								setIsPriorityFieldShowing(
									!isPriorityFieldShowing
								);
							}}
						>
							<TextAlignMiddleIcon className='w-5 h-5' />
						</Button>
						<FormField
							control={form.control}
							name='date'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<Popover
										open={calendarOpen}
										onOpenChange={setCalendarOpen}
									>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'ghost'}
													className={cn(
														'font-normal flex',
														!field.value &&
															'text-muted-foreground'
													)}
												>
													<ClockIcon className='w-5 h-5' />
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
												onSelect={(data) => {
													field.onChange(data);
													setCalendarOpen(false);
												}}
												disabled={(date) =>
													date < new Date()
												}
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						type='submit'
						size='lg'
						variant='default'
						className='w-full mt-12'
					>
						Add Task
					</Button>
				</form>
			</Form>
		</>
	);
};
