import { ModeToggle } from './toggleTheme';

export const Header = () => {
	return (
		<header className='flex h-16 w-full border-b px-6 justify-center'>
			<div className='flex items-center justify-between w-full max-w-7xl md:px-16 '>
				<p className='font-semibold'>Tasks App</p>

				<ModeToggle />
			</div>
		</header>
	);
};
