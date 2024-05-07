'use client';
import { useEffect, useState } from 'react';
import { Form } from '@/components/form';
import { TodoCard } from '@/components/todoCard/TodoCard';
import { Button } from '@/components/ui/button';

export type TodoType = {
	id: string;
	title: string;
	description: string;
	date: Date;
	priority: 'high' | 'mid' | 'low';
};

export type TablesType = 'todos' | 'completedTodos'

export default function Home() {
	const [todos, setTodos] = useState<TodoType[]>(
		(function () {
			if (typeof localStorage !== 'undefined')
				return JSON.parse(
					window.localStorage.getItem('todos') as string
				);
		})() || []
	);

	const [completedTodos, setcompletedTodos] = useState<TodoType[]>(
		(function () {
			if (typeof localStorage !== 'undefined')
				return JSON.parse(
					window.localStorage.getItem('completedTodos') as string
				);
		})() || []
	);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	useEffect(() => {
		localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
	}, [completedTodos]);

	return (
		<main className='flex justift-center min-h-20 flex-col  w-xl box-border  w-full max-w-7xl px-6 py-8 md:px-16 md:py-12'>
			<h1 className=' text-3xl font-semibold my-12'>
				Just another todo app
			</h1>

			<Form setTodos={setTodos} />

			<div className='flex flex-col gap-6 py-12'>
				<p>{`Your tasks (${todos.length})`}</p>
				{todos.length > 0 ? (
					<ul className='flex flex-col gap-5'>
						{todos.map((todo) => (
							<li key={todo.id}>
								<TodoCard
									todo={todo}
									setTodos={setTodos}
									setCompletedTodos={setcompletedTodos}
									table='todos'
								/>
							</li>
						))}
					</ul>
				) : (
					<p className='text-muted'>You have no tasks</p>
				)}
			</div>

			<div className='flex flex-col gap-6 py-12'>
				<div className='flex items-center gap-4 justify-between'>
					<p>{`Completed (${completedTodos.length})`}</p>
					<Button
						onClick={() => {
							setcompletedTodos([]);
						}}
						variant={'outline'}
					>
						Clear all
					</Button>
				</div>

				{
					<ul className='flex flex-col gap-4'>
						{completedTodos.map((completedTodo) => (
							<li key={completedTodo.id}>
								<TodoCard
									todo={completedTodo}
									setTodos={setTodos}
									setCompletedTodos={setcompletedTodos}
									table='completedTodos'
								/>
							</li>
						))}
					</ul>
				}
			</div>
		</main>
	);
}
