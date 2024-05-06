'use client';
import { useEffect, useState } from 'react';
import { Form } from '@/components/form';
import { TodoCard } from '@/components/todoCard';

export type TodoType = {
	title: string;
	id: string;
};

export default function Home() {
	const [todos, setTodos] = useState<TodoType[]>(
		(function () {
			if (typeof localStorage !== 'undefined')
				return JSON.parse(
					window.localStorage.getItem('todos') as string
				);
		})() || []
	);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<main className='flex justift-center min-h-20 flex-col  w-xl box-border  w-full max-w-7xl px-6 py-8 md:px-16 md:py-12'>
			<h1 className='text-center text-3xl font-semibold my-12'>
				ToDo List
			</h1>

			<Form setTodos={setTodos} />

			<div className='flex flex-col gap-6 py-12'>
				{todos.map((todo) => (
					<TodoCard
						todo={todo}
						key={Math.random()}
						setTodos={setTodos}
					/>
				))}
			</div>
		</main>
	);
}
