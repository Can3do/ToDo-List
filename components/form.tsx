'use client';
import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { type TodoType } from '@/app/page';
import { generateId } from '@/lib/utils';

export type FormInputs = {
	title: string;
	description: string;
	priority: 'low' | 'mid' | 'high';
};

type SetPropsType = {
	setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

export const Form = ({ setTodos }: SetPropsType) => {
	const { handleSubmit, register, reset } = useForm<FormInputs>();

	const crearTodo: SubmitHandler<FormInputs> = (TodoformFields) => {
		setTodos((oldTodos) => [
			...oldTodos,
			{
				...TodoformFields,
				id: generateId(),
				date: new Date(),
				completed: false,
			},
		]);
		reset();
	};
	return (
		<form
			onSubmit={handleSubmit(crearTodo)}
			className='flex flex-col gap-6 border p-6 rounded-lg'
		>
			<p className='font-semibold'>Add a Todo</p>
			<div className='flex gap-6 flex-col flex-wrap'>
				<div className='flex gap-4 flex-wrap'>
					<Input
						type='text'
						placeholder='Title'
						{...register('title')}
						required
					/>
					<Input
						type='text'
						placeholder='Description'
						{...register('description')}
						required
					/>
					<Input
						type='text'
						placeholder='Priority'
						{...register('priority')}
						required
					/>
				</div>
				<Button
					size={'lg'}
					variant={'default'}
					className='w-full lg:max-w-32'
				>
					Add Task
				</Button>
			</div>
		</form>
	);
};
