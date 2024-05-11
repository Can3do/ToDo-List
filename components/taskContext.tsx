import { createContext, useContext, Dispatch, SetStateAction } from 'react';

import { TaskType } from '@/zodSchemas/schemas';

export const TasksContext = createContext<
	[TaskType[], Dispatch<SetStateAction<TaskType[]>>] | undefined
>(undefined);

export function UseTasksContext() {
	const tasksContext = useContext(TasksContext);
	if (tasksContext === undefined) {
		throw new Error(
			'Error at UseTasksContext (tasksContext === undefined)'
		);
	}
	return tasksContext;
}
