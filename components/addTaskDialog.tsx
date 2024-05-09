import { Dispatch, SetStateAction, useState } from 'react';
import { type TodoType } from '@/app/page';
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
	setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
	const [DialogOpen, setDialogOpen] = useState(false);
	return (
		<Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='rounded-full aspect-square flex p-0'
				>
					<PlusIcon className='w-5 h-5' />
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