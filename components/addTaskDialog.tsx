import { Dispatch, SetStateAction, useState } from 'react';
import { type TodoType } from '@/app/page';
import { Button } from '@/components/ui/button';
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
					className='rounded-full w-[40px] h-[40px]'
				>
					+
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
