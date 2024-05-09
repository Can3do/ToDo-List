import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { Cross1Icon, Pencil2Icon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { TodoType } from '@/app/page';
import { EditTaskDialog } from '../editTaskDialog';

export const TodoCard = ({
	todo,
	setTodos,
}: {
	todo: TodoType;
	setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
	const { id, title, description, date, priority } = todo;

	const deleteToDo = () => {
		setTodos((oldTodos: TodoType[]) => {
			const indexToDelete = oldTodos.findIndex((todo) => todo.id === id);
			if (indexToDelete === -1) return oldTodos; // si no se encuentra el elemento, no se hace nada
			const oldTodosCopy = [...oldTodos];
			oldTodosCopy.splice(indexToDelete, 1);
			return oldTodosCopy;
		});
	};

	const completeTodo = () => {
		setTodos((oldTodos: TodoType[]) =>
			oldTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: true } : todo
			)
		);
	};

	return (
		<div className='flex flex-col p-4 rounded-md border gap-2'>
			<p
				className={cn(
					'text-sm font-semibold',
					todo.completed === true && 'line-through'
				)}
			>
				{format(date, 'PPP')}
			</p>
			<div className='flex gap-4 items-center justify-between'>
				<div className='flex flex-col gap-2'>
					<div className='flex gap-4'>
						<div className='grid place-items-center'>
							{todo.completed === false && (
								<Checkbox
									className='rounded-full'
									onClick={completeTodo}
								/>
							)}
						</div>
						<div className='flex gap-6 items-center'>
							<div>
								<div className='flex flex-col'>
									<p
										className={cn(
											'font-semibold text-md truncate max-w-[12ch] lg:max-w-[24ch]',
											todo.completed === true &&
												'line-through'
										)}
									>
										{title}
									</p>
									<p
										className={cn(
											'font-normal text-sm truncate max-w-[12ch] lg:max-w-[24ch]',
											todo.completed === true &&
												'line-through'
										)}
									>
										{description}
									</p>
								</div>
							</div>
							{priority !== '' && (
								<Badge variant={priority}>{priority}</Badge>
							)}
						</div>
					</div>
				</div>

				<div className='flex gap-4 items-center'>
					{todo.completed === false && (
						<EditTaskDialog todo={todo} setTodos={setTodos} />
					)}

					<button>
						<Cross1Icon onClick={deleteToDo} className=' w-5 h-5' />
					</button>
				</div>
			</div>
		</div>
	);
};
