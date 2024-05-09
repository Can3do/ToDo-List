import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/Header';

const font = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Tasks App',
	description: 'Just another tasks app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='dark'>
			<body
				className={`${font.className} flex flex-col items-center min-h-[110vh]`}
			>
				<Header />
				{children}
			</body>
		</html>
	);
}
