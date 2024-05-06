import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { TodoType } from '@/app/page';

export const TodoCard = ({
	todo: { title, id },
	setTodos,
}: {
	todo: TodoType;
	setTodos: Function;
}) => {
	const [isEditting, setIsEditting] = useState(false);
	const [currentTitleValue, setCurrentTitleValue] = useState(title);

	const deleteToDo = () => {
		setTodos((oldTodos: TodoType[]) =>
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
			return { ...todo, title: currentTitleValue };
		});
		return newTodosArray;
	};

	const saveEdit = () => {
		setTodos((oldTodos: TodoType[]) => {
			return modifyTodosList(oldTodos);
		});
	};

	const cancelEdit = () => {
		setCurrentTitleValue(title);
		toggleIsEditting();
	};

	return (
		<div className='p-4 bg-slate-900 rounded-md flex gap-4 items-center justify-between'>
			<div className='flex gap-x-4 overflow-hidden'>
				{isEditting ? (
					<>
						<Input
							value={currentTitleValue}
							onChange={(e) =>
								setCurrentTitleValue(e.target.value)
							}
						></Input>
					</>
				) : (
					<>
						<p className='font-medium'>{title}</p>
					</>
				)}
			</div>

			<div className='flex gap-4'>
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
						<Button onClick={toggleIsEditting} variant='secondary'>
							Edit
						</Button>
						<Button onClick={deleteToDo} variant='destructive'>
							Delete
						</Button>
					</>
				)}
			</div>
		</div>
	);
};
