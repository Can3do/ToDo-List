import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { EditTaskForm } from '@/components/editTaskForm';

import { TaskType } from '@/zodSchemas/schemas';
import { TaskCard } from './taskCard';

export const EditTaskDialog = ({ task }: { task: TaskType }) => {
	const [DialogOpen, setDialogOpen] = useState(false);

	return (
		<Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<div className='max-w-[40rem]'>
					<TaskCard task={task} />
				</div>
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
