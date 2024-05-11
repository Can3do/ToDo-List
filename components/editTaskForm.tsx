'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClockIcon, TextAlignMiddleIcon } from '@radix-ui/react-icons';

import { TaskType } from '@/zodSchemas/schemas';
import { TaskSchema } from '@/zodSchemas/schemas';
import { cn } from '@/lib/utils';
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
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { UseTasksContext } from '@/components/taskContext';

export const EditTaskForm = ({
	setDialogOpen,
	todo,
}: {
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
	todo: z.infer<typeof TaskSchema>;
}) => {
	const form = useForm<z.infer<typeof TaskSchema>>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: todo.title,
			description: todo.description,
			priority: todo.priority,
			date: todo.date,
			id: todo.id,
			completed: todo.completed,
		},
	});
	const [, setTasks] = UseTasksContext();
	const { id } = todo;
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [isPriorityFieldShowing, setIsPriorityFieldShowing] = useState(
		!!todo.priority
	);
	const dateValue = form.watch('date');

	const saveTodo = (formData: z.infer<typeof TaskSchema>) => {
		setTasks((oldTodos: TaskType[]) => {
			let oldTodosCopy = [...oldTodos];
			const index = oldTodosCopy.findIndex((todo) => todo.id === id);
			if (index === -1) return oldTodos; // si no encuentra el todo, no hace nada
			const newTodosArray = oldTodosCopy.map((todo) => {
				if (todo.id !== id) return todo;
				return {
					...todo,
					...formData,
				};
			});
			return newTodosArray;
		});
		setDialogOpen(false);
	};

	const cancelEdit = () => {
		setDialogOpen(false);
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((formData) => {
						saveTodo(formData);
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
									<FormControl>
										<Input
											placeholder='Title'
											type='text'
											{...field}
											className='border-0 focus-visible:ring-0 text-2xl p-0 shadow-none'
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
								<FormItem className='flex flex-col w-full'>
									<FormControl>
										<Textarea
											placeholder='Details'
											className='shadow-none border-0 focus-visible:ring-0 text-lg p-0'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex flex-col gap-4 w-full'>
							<div className='flex gap-4 items-center h-10'>
								<button
									type='button'
									onClick={() => {
										setIsPriorityFieldShowing(
											!isPriorityFieldShowing
										);
									}}
								>
									<TextAlignMiddleIcon className='w-6 h-6' />
								</button>
								{isPriorityFieldShowing && (
									<FormField
										control={form.control}
										name='priority'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													>
														<SelectTrigger>
															<SelectValue placeholder='Select a priority'></SelectValue>
														</SelectTrigger>

														<SelectContent>
															<SelectGroup>
																<SelectItem
																	value='low'
																	onClick={(
																		e
																	) => {
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
							<div className='flex gap-4 items-center h-10'>
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
														<button
															className={cn(
																'font-normal flex',
																!field.value &&
																	'text-muted-foreground'
															)}
														>
															<ClockIcon className='w-6 h-6' />
														</button>
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
															field.onChange(
																data
															);
															setCalendarOpen(
																false
															);
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
								{dateValue !== undefined && (
									<div className='flex'>
										<Button
											className='rounded-full text-'
											variant='outline'
											type='button'
											onClick={() => {
												setCalendarOpen(!calendarOpen);
											}}
										>
											{format(dateValue, 'PPP')}
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className='flex gap-6'>
						<Button
							type='submit'
							size='lg'
							variant='green'
							className='w-full mt-12'
						>
							Save
						</Button>
						<Button
							type='button'
							size='lg'
							variant='secondary'
							className='w-full mt-12'
							onClick={cancelEdit}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
