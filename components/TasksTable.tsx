import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';

import { UseTasksContext } from './TaskContext';
import { EditTaskDialog } from './editTaskDialog';

export const TasksTable = ({ tableTitle }: { tableTitle: string }) => {
	const [tasks] = UseTasksContext();
	return (
		<div className='flex flex-col gap-6 min-h-64'>
			<p>{`${tableTitle} (${tasks.length})`}</p>
			<motion.ul className='flex flex-col gap-4'>
				<LayoutGroup>
					<AnimatePresence>
						{tasks.length > 0 &&
							tasks.map((task) => (
								<motion.li
									key={task.id}
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										duration: 0.2,
										ease: 'easeOut',
									}}
								>
									<EditTaskDialog task={task} />
								</motion.li>
							))}
					</AnimatePresence>
				</LayoutGroup>
			</motion.ul>
		</div>
	);
};
