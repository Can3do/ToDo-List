import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateId() {
	return Date.now().toString(13);
}

type TaskOnLocalStorageType = {
	id: string;
	title: string;
	description: string;
	date?: string;
	priority: 'high' | 'medium' | 'low' | '';
	completed: string;
};

function parseDate(task: TaskOnLocalStorageType) {
	const TransitionObject: any = { ...task };
	if (task.date) {
		TransitionObject.date = new Date(task.date);
	}
	return TransitionObject;
}

export function getTasksFromLocalStorage() {
	try {
		const dataFromLocalStorage = localStorage.getItem('todos');

		if (dataFromLocalStorage) {
			const parsedTasks = JSON.parse(dataFromLocalStorage);
			const parsedTasksWithDates = parsedTasks.map(parseDate);
			return parsedTasksWithDates;
		}
		return [];
	} catch (error) {
		console.log(
			`Error al traer las tasks del localStorage. error: ${error}`
		);
		return [];
	}
}
