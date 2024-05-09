import { useState } from 'react';
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

export const EditTaskDialog = ({ task }: { task: TaskType }) => {
	const [DialogOpen, setDialogOpen] = useState(false);

	return (
		<Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<button>
					<Pencil2Icon className='w-5 h-5' />
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='pb-4'>
					<DialogTitle>Edit task</DialogTitle>
				</DialogHeader>
				<EditTaskForm setDialogOpen={setDialogOpen} todo={task} />
			</DialogContent>
		</Dialog>
	);
};
