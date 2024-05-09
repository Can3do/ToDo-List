import { Dispatch, SetStateAction, useState } from 'react';
import { z } from 'zod';

import { TaskSchema, TaskType } from '@/zodSchemas/schemas';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { AddTaskForm } from '@/components/addTaskForm';

export const AddTaskDialog = ({
	setTodos,
}: {
	setTodos: Dispatch<SetStateAction<TaskType[]>>;
}) => {
	const [DialogOpen, setDialogOpen] = useState(false);
	return (
		<Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button variant='icon' className='aspect-square p-0 w-14 h-14'>
					<PlusIcon className='w-6 h-6' />
				</Button>
			</DialogTrigger>
			<DialogContent className='flex flex-col gap-6 '>
				<DialogHeader className=''>
					<DialogTitle>Add new task</DialogTitle>
				</DialogHeader>
				<AddTaskForm
					setTodos={setTodos}
					setDialogOpen={setDialogOpen}
				/>
			</DialogContent>
		</Dialog>
	);
};
