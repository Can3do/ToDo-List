'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';

import { type TodoType } from '@/app/page';
import { generateId } from '@/lib/utils';

export type FormInputs = {
	title: string;
};

type SetPropsType = {
	setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

export const Form = ({ setTodos }: SetPropsType) => {
	const { handleSubmit, register } = useForm<FormInputs>();

	const crearTodo: SubmitHandler<FormInputs> = ({ title }) => {
		setTodos((oldTodos) => [...oldTodos, { title, id: generateId() }]);
	};
	return (
		<form
			onSubmit={handleSubmit(crearTodo)}
			className='flex flex-col md:flex-row gap-6'
		>
			<div className='flex gap-4'>
				<Input
					type='text'
					placeholder='To do'
					{...register('title')}
					required
				/>
			</div>
			<Button size={'lg'} variant={'green'}>
				Agregar tarea
			</Button>
		</form>
	);
};
