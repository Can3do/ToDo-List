'use client';
import { useEffect, useState } from 'react';

import { TaskType } from '@/zodSchemas/schemas';
import { AddTaskDialog } from '@/components/addTaskDialog';
import { TasksTable } from '@/components/TasksTable';
import { TasksContext } from '@/components/TaskContext';
import { getTasksFromLocalStorage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';

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
		<>
			<main className='flex justift-center flex-col box-border w-full max-w-7xl  min-h-[100vh]'>
				<div className='fixed w-full bg-background bottom-0 lg:hidden grid place-items-center border-t  p-6'>
					<TasksContext.Provider value={[uncompletedTodos, setTodos]}>
						<AddTaskDialog>
							<Button
								variant='default'
								className='text-lg flex gap-4 p-8 w-full'
								size='lg'
							>
								<PlusIcon className='w-6 h-6' />
								<p>Add new task</p>
							</Button>
						</AddTaskDialog>
					</TasksContext.Provider>
				</div>
				<section className='px-6 py-8 md:px-16 md:py-12 flex flex-col gap-12'>
					<TasksContext.Provider value={[uncompletedTodos, setTodos]}>
						<div className='max-lg:hidden'>
							<AddTaskDialog>
								<Button
									variant='default'
									className='aspect-square p-0 w-14 h-14 rounded-full'
								>
									<PlusIcon className='w-6 h-6' />
								</Button>
							</AddTaskDialog>
						</div>
					</TasksContext.Provider>

					<TasksContext.Provider value={[uncompletedTodos, setTodos]}>
						<TasksTable tableTitle='Your tasks' />
					</TasksContext.Provider>

					<TasksContext.Provider value={[completedTodos, setTodos]}>
						<TasksTable tableTitle='Completed' />
					</TasksContext.Provider>
				</section>
			</main>
		</>
	);
}
