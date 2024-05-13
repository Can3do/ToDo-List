import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { TaskType } from '@/zodSchemas/schemas';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { AddTaskForm } from './addTaskForm';
import { UseTasksContext } from './taskContext';

export const AddTaskDialog = ({ children }: { children: JSX.Element }) => {
	const [DialogOpen, setDialogOpen] = useState(false);
	const [, setTasks] = UseTasksContext();

	const createTodo: SubmitHandler<TaskType> = (todoFormFields) => {
		setTasks((oldTodos) => [
			...oldTodos,
			{
				...todoFormFields,
			},
		]);
	};

	return (
		<Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader className='pb-4'>
					<DialogTitle>Add new task</DialogTitle>
				</DialogHeader>
				<AddTaskForm
					setDialogOpen={setDialogOpen}
					onSubmit={createTodo}
				/>
			</DialogContent>
		</Dialog>
	);
};
