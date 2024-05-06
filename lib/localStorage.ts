import { type TodoType } from '@/app/page';

export const saveTodosLocalStorage = (todos: TodoType[]) => {
	localStorage.setItem('todos', JSON.stringify(todos));
};

export const getTodosLocalStorage = () => {
	return JSON.parse(`${localStorage.getItem('todos')}`);
};
