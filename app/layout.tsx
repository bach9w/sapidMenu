import styles from './styles.module.css';

export const metadata = {
	title: 'Next.js',
	description: 'Generated by Next.js',
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
