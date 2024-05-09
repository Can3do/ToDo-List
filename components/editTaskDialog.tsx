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
import { EditTaskForm } from '@/components/editTaskForm';
import { Pencil2Icon } from '@radix-ui/react-icons';

export const EditTaskDialog = ({
	todo,
	setTodos,
}: {
	todo: TodoType;
	setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
	const [DialogOpen, setDialogOpen] = useState(false);

	return (
		<Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<button>
					<Pencil2Icon className='w-5 h-5' />
				</button>
			</DialogTrigger>
			<DialogContent className='flex flex-col gap-6 '>
				<DialogHeader className=''>
					<DialogTitle>Edit task</DialogTitle>
				</DialogHeader>
				<EditTaskForm
					setTodos={setTodos}
					setDialogOpen={setDialogOpen}
					todo={todo}
				/>
			</DialogContent>
		</Dialog>
	);
};
