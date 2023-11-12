import Snowflake from './Snowflake';
import React from 'react';
import styles from './styles/Header.module.css';

export default function Header() {
	return (
		<>
			<div className={`${styles.header} top-0 bg-red-700 rounded-b-2xl`}>
				<h1 className={styles.headerTitle}>SAPID</h1>
			</div>
			<Snowflake />
		</>
	);
}
