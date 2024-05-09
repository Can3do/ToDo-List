'use client';
import { useEffect, useState } from 'react';

import { TaskType } from '@/zodSchemas/schemas';
import { AddTaskDialog } from '@/components/addTaskDialog';
import { TasksTable } from '@/components/TasksTable';
import { TasksContext } from '@/components/TaskContext';
import { getTasksFromLocalStorage } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
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
		<main className='flex justift-center flex-col  w-xl box-border  w-full max-w-7xl px-6 py-8 md:px-16 md:py-12 min-h-[100vh]'>
			<TasksContext.Provider value={[uncompletedTodos, setTodos]}>
				<div>
					<AddTaskDialog />
				</div>

				<TasksTable tableTitle='Your tasks' />
			</TasksContext.Provider>

			<TasksContext.Provider value={[completedTodos, setTodos]}>
				<TasksTable tableTitle='Completed' />
			</TasksContext.Provider>
		</main>
	);
}
