'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ClockIcon,
	TextAlignMiddleIcon,
	Cross1Icon,
} from '@radix-ui/react-icons';

import { TaskSchema } from '@/zodSchemas/schemas';
import { cn } from '@/lib/utils';
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
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

export const AddTaskForm = ({
	setDialogOpen,
	onSubmit,
}: {
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
	onSubmit: Function;
}) => {
	const form = useForm<z.infer<typeof TaskSchema>>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: '',
			description: undefined,
			priority: undefined,
			date: undefined,
			completed: false,
			id: generateId(),
		},
	});

	const [calendarOpen, setCalendarOpen] = useState(false);

	const dateValue = form.watch('date');
	const priorityValue = form.watch('priority');
	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((formData) => {
						onSubmit(formData);
						form.reset();
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
											className='shadow-none border-0 focus-visible:ring-0 text-2xl p-0'
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
								<FormField
									control={form.control}
									name='priority'
									render={({ field }) => (
										<FormItem className='flex items-center gap-4 h-10 space-y-0'>
											<button
												className={cn(
													'font-normal flex',
													!field.value &&
														'text-muted-foreground'
												)}
												type='button'
												onClick={() => {
													field.onChange('low');
												}}
											>
												<TextAlignMiddleIcon className='w-6 h-6' />
											</button>
											<FormControl>
												{priorityValue && (
													<>
														<Select
															onValueChange={
																field.onChange
															}
															defaultValue={
																field.value
															}
															value={field.value}
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
														<button
															onClick={(e) => {
																e.preventDefault();
																field.onChange(
																	undefined
																);
															}}
														>
															<Cross1Icon className=' w-4 h-4 hover:text-destructive transition' />
														</button>
													</>
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='date'
								render={({ field }) => (
									<FormItem className='flex gap-4 items-center h-10 space-y-0'>
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
										{dateValue !== undefined && (
											<>
												<Button
													className='rounded-full text-'
													variant='outline'
													type='button'
													onClick={() => {
														setCalendarOpen(
															!calendarOpen
														);
													}}
												>
													{format(dateValue, 'PPP')}
												</Button>
												<button
													onClick={(e) => {
														e.preventDefault();
														field.onChange(
															undefined
														);
													}}
												>
													<Cross1Icon className=' w-4 h-4 hover:text-destructive transition' />
												</button>
											</>
										)}
									</FormItem>
								)}
							/>
						</div>
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
