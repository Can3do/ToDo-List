import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { Cross1Icon, Pencil2Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { TodoType, TablesType } from '@/app/page';

export const TodoCard = ({
	todo,
	setTodos,
	table,
}: {
	todo: TodoType;
	setTodos: Dispatch<SetStateAction<TodoType[]>>;
	table: TablesType;
}) => {
	const { id, title, description, date, priority } = todo;
	const [isEditting, setIsEditting] = useState(false);
	const [currentEdittingValue, setCurrentEdittingValue] = useState(todo);

	const deleteToDo = () => {
		setTodos((oldTodos: TodoType[]) => {
			const indexToDelete = oldTodos.findIndex((todo) => todo.id === id);
			if (indexToDelete === -1) return oldTodos; // si no se encuentra el elemento, no se hace nada
			const oldTodosCopy = [...oldTodos];
			oldTodosCopy.splice(indexToDelete, 1);
			return oldTodosCopy;
		});
	};

	const modifyTodosList = (oldTodos: TodoType[]) => {
		let oldTodosCopy = [...oldTodos];
		const index = oldTodosCopy.findIndex((todo) => todo.id === id);
		if (index === -1) return oldTodos;
		const newTodosArray = oldTodosCopy.map((todo) => {
			if (todo.id !== id) return todo;
			return {
				...todo,
				title: currentEdittingValue.title,
				description: currentEdittingValue.description,
			};
		});
		return newTodosArray;
	};

	const saveEdit = () => {
		setTodos((oldTodos: TodoType[]) => {
			return modifyTodosList(oldTodos);
		});
		setIsEditting(false);
	};

	const cancelEdit = () => {
		setCurrentEdittingValue(todo);
		setIsEditting(false);
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
			<p className='text-sm font-semibold'>{format(date, 'PPP')}</p>
			<div className='flex gap-4 items-center justify-between'>
				<div className='flex flex-col gap-2'>
					<div className='flex gap-4'>
						<div className='grid place-items-center'>
							<Checkbox
								className='rounded-full'
								onClick={completeTodo}
							/>
						</div>
						<div className='flex gap-6 items-center'>
							<div>
								{isEditting ? (
									<>
										<Input
											value={currentEdittingValue.title}
											onChange={(e) =>
												setCurrentEdittingValue({
													...currentEdittingValue,
													title: e.target.value,
												})
											}
										></Input>
										<Input
											value={
												currentEdittingValue.description
											}
											onChange={(e) =>
												setCurrentEdittingValue({
													...currentEdittingValue,
													description: e.target.value,
												})
											}
										></Input>
									</>
								) : (
									<div className='flex flex-col'>
										<p
											className={`font-semibold text-lg ${
												table === 'completedTodos' &&
												'line-through'
											}`}
										>
											{title}
										</p>
										<p
											className={`font-normal text-sm ${
												table === 'completedTodos' &&
												'line-through'
											}`}
										>
											{description}
										</p>
									</div>
								)}
							</div>
							<Badge variant={priority}>{priority}</Badge>
						</div>
					</div>
				</div>

				<div className='flex gap-4 items-center'>
					{isEditting ? (
						<>
							<Button onClick={saveEdit} variant='green'>
								Save
							</Button>
							<Button onClick={cancelEdit} variant='secondary'>
								Cancel
							</Button>
						</>
					) : (
						<>
							{table === 'todos' && (
								<Pencil2Icon
									onClick={() => {
										setIsEditting(true);
									}}
									className=' w-5 h-5 cursor-pointer'
								/>
							)}

							<Cross1Icon
								onClick={deleteToDo}
								className=' w-5 h-5 cursor-pointer'
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
