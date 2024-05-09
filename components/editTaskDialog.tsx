import { Dispatch, SetStateAction, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { EditTaskForm } from '@/components/editTaskForm';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { TaskType } from '@/zodSchemas/schemas';

export const EditTaskDialog = ({
	todo,
	setTodos,
}: {
	todo: TaskType;
	setTodos: Dispatch<SetStateAction<TaskType[]>>;
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
