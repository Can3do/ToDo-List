import { format } from 'date-fns';
import { Cross1Icon } from '@radix-ui/react-icons';

import { UseTasksContext } from './TaskContext';
import { TaskType } from '@/zodSchemas/schemas';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export const TaskCard = ({ task }: { task: TaskType }) => {
	const [, setTodos] = UseTasksContext();
	const { id, title, description, date, priority } = task;

	const deleteToDo = () => {
		setTodos((oldTodos: TaskType[]) => {
			const indexToDelete = oldTodos.findIndex((todo) => todo.id === id);
			if (indexToDelete === -1) return oldTodos; // si no se encuentra el elemento, no se hace nada
			const oldTodosCopy = [...oldTodos];
			oldTodosCopy.splice(indexToDelete, 1);
			return oldTodosCopy;
		});
	};

	const completeTodo = () => {
		setTodos((oldTodos) =>
			oldTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: true } : todo
			)
		);
	};

	return (
		<div
			className={cn(
				'flex flex-col p-4 rounded-md  hover:bg-accent cursor-pointer border',
				task.completed === true && 'text-muted-foreground'
			)}
		>
			{date && (
				<p
					className={cn(
						'text-sm font-semibold pb-2',
						task.completed === true && 'line-through'
					)}
				>
					{format(date, 'PPP')}
				</p>
			)}

			<div className='flex items-center justify-between'>
				<div className='flex flex-col gap-2'>
					<div className='flex '>
						<div className='grid place-items-center'>
							{task.completed === false && (
								<Checkbox
									className='rounded-full w-5 h-5 mr-4'
									onClick={(e) => {
										e.stopPropagation();
										completeTodo();
									}}
								/>
							)}
						</div>
						<div className='flex gap-6 items-center'>
							<div>
								<div className='flex flex-col'>
									<p
										className={cn(
											'font-semibold text-lg truncate max-w-[12ch] lg:max-w-[24ch]',
											task.completed === true &&
												'line-through'
										)}
									>
										{title}
									</p>
									<p
										className={cn(
											'font-normal text-sm truncate max-w-[12ch] lg:max-w-[24ch]',
											task.completed === true &&
												'line-through'
										)}
									>
										{description}
									</p>
								</div>
							</div>
							{priority !== '' && (
								<Badge variant={priority}>{priority}</Badge>
							)}
						</div>
					</div>
				</div>

				<div className='flex gap-4 items-center'>
					<button
						onClick={(e) => {
							e.stopPropagation();
							deleteToDo();
						}}
					>
						<Cross1Icon className=' w-5 h-5' />
					</button>
				</div>
			</div>
		</div>
	);
};
