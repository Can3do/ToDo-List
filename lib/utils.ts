import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateId() {
	return Date.now().toString(13);
}

type TodoTypeOnLocalStorage = {
	id: string;
	title: string;
	description: string;
	date?: string;
	priority: 'high' | 'medium' | 'low' | '';
	completed: string;
};

export function getTasksFromLocalStorage() {
	if (
		typeof localStorage !== 'undefined' &&
		localStorage.getItem('todos') !== null
	) {
		const parsedLocalStorage = JSON.parse(
			window.localStorage.getItem('todos') as string
		);
		const dateParsedLocalStorage = parsedLocalStorage.map(
			(todo: TodoTypeOnLocalStorage) => {
				const TransitionObject: any = { ...todo };
				if (todo.date !== undefined) {
					TransitionObject.date = new Date(todo.date);
				}
				return TransitionObject;
			}
		);
		return dateParsedLocalStorage;
	}
	return [];
}
