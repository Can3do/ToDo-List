import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { TodoType } from '@/app/page';
import { Checkbox } from '../ui/checkbox';

import { Cross1Icon, Pencil2Icon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction } from 'react';
import { Badge } from '@/components/ui/badge';

export const TodoCard = ({
	todo: { id, title, description, date, priority },
	setTodos,
	setCompletedTodos,
	table,
}: {
	todo: TodoType;
	setTodos: Dispatch<SetStateAction<TodoType[]>>;
	setCompletedTodos: Dispatch<SetStateAction<TodoType[]>>;
	table: 'todos' | 'completedTodos';
}) => {
	const [isEditting, setIsEditting] = useState(false);
	const [currentTitleValue, setCurrentTitleValue] = useState(title);
	const [currentDescValue, setcurrentDescValue] = useState(description);

	const deleteToDo = () => {
		const setFunctionToDeleteFunction =
			table === 'todos' ? setTodos : setCompletedTodos;
		setFunctionToDeleteFunction((oldTodos: TodoType[]) =>
			oldTodos.filter((todo) => todo.id !== id)
		);
	};

	const toggleIsEditting = () => {
		setIsEditting(!isEditting);
	};

	const modifyTodosList = (oldTodos: TodoType[]) => {
		let oldTodosCopy = [...oldTodos];
		const index = oldTodosCopy.findIndex((todo) => todo.id === id);
		if (index === -1) return oldTodos;
		const newTodosArray = oldTodosCopy.map((todo) => {
			if (todo.id !== id) return todo;
			return {
				...todo,
				title: currentTitleValue,
				description: currentDescValue,
			};
		});
		return newTodosArray;
	};

	const saveEdit = () => {
		setTodos((oldTodos: TodoType[]) => {
			return modifyTodosList(oldTodos);
		});
		toggleIsEditting();
	};

	const cancelEdit = () => {
		setCurrentTitleValue(title);
		setcurrentDescValue(description);
		toggleIsEditting();
	};

	const completeTodo = () => {
		setCompletedTodos((oldCompletedTodos: TodoType[]) => [
			...oldCompletedTodos,
			{ title, description, id: id, date: date, priority },
		]);
		deleteToDo();
	};

	return (
		<div className='p-4 rounded-md border flex gap-4 items-center justify-between'>
			<div className='flex gap-x-4 overflow-hidden items-center'>
				<Checkbox className='rounded-full' onClick={completeTodo} />
				{isEditting ? (
					<>
						<Input
							value={currentTitleValue}
							onChange={(e) =>
								setCurrentTitleValue(e.target.value)
							}
						></Input>
						<Input
							value={currentDescValue}
							onChange={(e) =>
								setcurrentDescValue(e.target.value)
							}
						></Input>
					</>
				) : (
					<div className='flex flex-col'>
						<p
							className={`font-semibold text-lg ${
								table === 'completedTodos' && 'line-through'
							}`}
						>
							{title}
						</p>
						<p
							className={`font-normal text-sm ${
								table === 'completedTodos' && 'line-through'
							}`}
						>
							{description}
						</p>
					</div>
				)}
				<Badge variant={priority}>{priority}</Badge>
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
								onClick={toggleIsEditting}
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
	);
};