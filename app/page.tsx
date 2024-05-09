'use client';
import { useEffect, useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';

import { TaskType } from '@/zodSchemas/schemas';
import { TodoCard } from '@/components/todoCard/TodoCard';
import { Button } from '@/components/ui/button';
import { AddTaskDialog } from '@/components/addTaskDialog';

type TodoTypeOnLocalStorage = {
	id: string;
	title: string;
	description: string;
	date?: string;
	priority: 'high' | 'medium' | 'low' | '';
	completed: string;
};

export default function Home() {
	const getTasksFromLocalStorage = () => {
		if (
			typeof localStorage !== 'undefined' &&
			localStorage.getItem('todos') !== null
		) {
			const parsedLocalStorage = JSON.parse(
				window.localStorage.getItem('todos') as string
			);
			const dateParsedLocalStorage = parsedLocalStorage.map(
				(todo: TodoTypeOnLocalStorage) => {
					const TransitionObject: any = { ...todo };
					if (todo.date !== undefined) {
						TransitionObject.date = new Date(todo.date);
					}
					return TransitionObject;
				}
			);
			return dateParsedLocalStorage;
		}
		return [];
	};

	const [todos, setTodos] = useState<TaskType[]>(getTasksFromLocalStorage());

	const uncompletedTodos = todos.filter((todo) => todo.completed === false);
	const completedTodos = todos.filter((todo) => todo.completed === true);

	const deleteAllCompletedTodos = () => {
		setTodos((oldTodos) =>
			oldTodos.filter((todo) => todo.completed === false)
		);
	};

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<main className='flex justift-center min-h-20 flex-col  w-xl box-border  w-full max-w-7xl px-6 py-8 md:px-16 md:py-12'>
			<div>
				<AddTaskDialog setTodos={setTodos} />
			</div>

			<div className='flex flex-col gap-6 py-12'>
				<p>{`Your tasks (${uncompletedTodos.length})`}</p>
				{uncompletedTodos.length > 0 ? (
					<motion.ul className='flex flex-col gap-4'>
						<LayoutGroup>
							<AnimatePresence>
								{uncompletedTodos.map((todo) => (
									<motion.li
										key={todo.id}
										layout
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{
											duration: 0.2,
											ease: 'easeOut',
										}}
									>
										<TodoCard
											todo={todo}
											setTodos={setTodos}
										/>
									</motion.li>
								))}
							</AnimatePresence>
						</LayoutGroup>
					</motion.ul>
				) : (
					<p className='text-muted-foreground'>You have no tasks</p>
				)}
			</div>

			<div className='flex flex-col gap-6 py-12'>
				<div className='flex items-center gap-4 justify-between'>
					<p>{`Completed (${completedTodos.length})`}</p>
					<Button
						onClick={deleteAllCompletedTodos}
						variant={'outline'}
					>
						Clear all
					</Button>
				</div>

				{
					<motion.ul className='flex flex-col gap-4'>
						<LayoutGroup>
							<AnimatePresence>
								{completedTodos.map((todo) => (
									<motion.li
										key={todo.id}
										layout
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{
											duration: 0.2,
											ease: 'easeOut',
										}}
									>
										<TodoCard
											todo={todo}
											setTodos={setTodos}
										/>
									</motion.li>
								))}
							</AnimatePresence>
						</LayoutGroup>
					</motion.ul>
				}
			</div>
		</main>
	);
}
