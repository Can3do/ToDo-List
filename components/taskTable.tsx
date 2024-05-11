import { Button } from '@/components/ui/button';
import { UseTasksContext } from './taskContext';
import { EditTaskDialog } from './editTaskDialog';

export const TasksTable = ({
	tableTitle,
	canClearAll,
}: {
	tableTitle: string;
	canClearAll?: boolean;
}) => {
	const [tableTasks, setTasks] = UseTasksContext();

	const deleteAllTableTasks = () => {
		setTasks((oldTasks) =>
			oldTasks.filter((task) => tableTasks.includes(task) === false)
		);
	};

	return (
		<div className='flex flex-col gap-6 min-h-64'>
			<div className='flex items-center justify-between'>
				<p>{`${tableTitle} (${tableTasks.length})`}</p>
				{canClearAll && (
					<Button variant='outline' onClick={deleteAllTableTasks}>
						Clear all
					</Button>
				)}
			</div>

			<ul className='flex flex-col gap-4'>
				{tableTasks.length > 0 &&
					tableTasks.map((task) => (
						<li key={task.id}>
							<EditTaskDialog task={task} />
						</li>
					))}
			</ul>
		</div>
	);
};
