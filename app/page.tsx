'use client';
import { useEffect, useState } from 'react';

import { TaskType } from '@/zodSchemas/schemas';
import { AddTaskDialog } from '@/components/addTaskDialog';
import { TasksTable } from '@/components/taskTable';
import { TasksContext } from '@/components/taskContext';
import { getTasksFromLocalStorage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';

export default function Home() {
	const [todos, setTodos] = useState<TaskType[]>(getTasksFromLocalStorage());

	const uncompletedTodos = todos.filter((todo) => todo.completed === false);
	const completedTodos = todos.filter((todo) => todo.completed === true);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<>
			<main className='flex justift-center flex-col box-border w-full max-w-7xl  min-h-[100vh]'>
				<div className='fixed right-0 bottom-0 lg:hidden grid place-items-center p-6'>
					<TasksContext.Provider value={[uncompletedTodos, setTodos]}>
						<AddTaskDialog>
							<Button
								variant='default'
								className='rounded-full p-0 h-12 w-12'
								size='lg'
							>
								<PlusIcon className='w-6 h-6' />
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
						<TasksTable tableTitle='Completed' canClearAll />
					</TasksContext.Provider>
				</section>
			</main>
		</>
	);
}
