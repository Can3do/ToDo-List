'use client';
import { useEffect, useState } from 'react';

import { TodoCard } from '@/components/todoCard/TodoCard';
import { Button } from '@/components/ui/button';
import { AddTaskDialog } from '@/components/addTaskDialog';

export type TodoType = {
	id: string;
	title: string;
	description: string;
	date: Date;
	priority: 'high' | 'medium' | 'low' | '';
	completed: boolean;
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

	const uncompletedTodos = todos.filter((todo) => todo.completed === false);
	const completedTodos = todos.filter((todo) => todo.completed === true);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<main className='flex justift-center min-h-20 flex-col  w-xl box-border  w-full max-w-7xl px-6 py-8 md:px-16 md:py-12'>
			<h1 className=' text-3xl font-semibold my-12'>
				Just another todo app
			</h1>

			{/* <AddTaskForm setTodos={setTodos} /> */}
			<div>
				<AddTaskDialog setTodos={setTodos} />
			</div>

			<div className='flex flex-col gap-6 py-12'>
				<p>{`Your tasks (${uncompletedTodos.length})`}</p>
				{uncompletedTodos.length > 0 ? (
					<ul className='flex flex-col gap-5'>
						{uncompletedTodos.map((todo) => (
							<li key={todo.id}>
								<TodoCard todo={todo} setTodos={setTodos} />
							</li>
						))}
					</ul>
				) : (
					<p className='text-muted-foreground'>You have no tasks</p>
				)}
			</div>

			<div className='flex flex-col gap-6 py-12'>
				<div className='flex items-center gap-4 justify-between'>
					<p>{`Completed (${completedTodos.length})`}</p>
					<Button
						onClick={() => {
							setTodos((oldTodos) =>
								oldTodos.filter(
									(todo) => todo.completed === false
								)
							);
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
								/>
							</li>
						))}
					</ul>
				}
			</div>
		</main>
	);
}
