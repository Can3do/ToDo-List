import { format } from 'date-fns';
import { Cross1Icon } from '@radix-ui/react-icons';

import { UseTasksContext } from './taskContext';
import { TaskType } from '@/zodSchemas/schemas';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export const TaskCard = ({ task }: { task: TaskType }) => {
	const [, setTodos] = UseTasksContext();
	const { id, title, description, date, priority, completed } = task;

	const deleteToDo = () => {
		setTodos((oldTodos: TaskType[]) => {
			const indexToDelete = oldTodos.findIndex((todo) => todo.id === id);
			if (indexToDelete === -1) return oldTodos; // si no se encuentra el elemento, no se hace nada
			const oldTodosCopy = [...oldTodos];
			oldTodosCopy.splice(indexToDelete, 1);
			return oldTodosCopy;
		});
	};

	const toggleCompleted = () => {
		setTodos((oldTodos) =>
			oldTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	return (
		<div
			className={cn(
				'flex flex-col rounded-md  hover:bg-accent cursor-pointer border gap-4 py-4',
				task.completed === true && 'text-muted-foreground line-through'
			)}
		>
			{date && (
				<p className='text-sm font-semibold px-4'>
					{format(date, 'PPP')}
				</p>
			)}

			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<div
						className='grid place-items-center p-4 group '
						onClick={(e) => {
							e.stopPropagation();
							toggleCompleted();
						}}
					>
						<Checkbox
							checked={completed}
							className='rounded-full w-5 h-5 data-[state=checked]:opacity-50 transition group-hover:bg-primary'
						/>
					</div>
					<div className='flex gap-8 items-center'>
						<div className='flex flex-col'>
							<p
								className={cn(
									'font-semibold text-lg truncate max-w-[12ch] lg:max-w-[24ch]',
									task.completed === true && 'line-through'
								)}
							>
								{title}
							</p>
							<p
								className={cn(
									'font-normal text-sm truncate max-w-[12ch] lg:max-w-[24ch]',
									task.completed === true && 'line-through'
								)}
							>
								{description}
							</p>
						</div>
						<div className=' flex gap-4'>
							{priority && (
								<Badge variant={priority}>{priority}</Badge>
							)}
						</div>
					</div>
				</div>

				<button
					className='grid place-items-center p-4 group'
					onClick={(e) => {
						e.stopPropagation();
						deleteToDo();
					}}
				>
					<Cross1Icon className=' w-5 h-5 group-hover:text-destructive transition' />
				</button>
			</div>
		</div>
	);
};
