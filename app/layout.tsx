import styles from './globals.css';

export const metadata = {
	title: 'SAPID',
	description: 'SAPID COCKTAILS & FOOD',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={styles}>{children}</body>
		</html>
	);
}
