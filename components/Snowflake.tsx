'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

type SnowflakeType = {
	id: number;
	style: React.CSSProperties;
};

type SnowflakeProps = {
	id: number;
	style: React.CSSProperties;
	onComplete: (id: number) => void;
};

const Snowflake = ({ id, style, onComplete }: SnowflakeProps) => {
	return (
		<motion.div
			style={style}
			initial={{ y: 0, x: 0, opacity: 0 }}
			animate={{
				y: window.innerHeight / 2 + Math.random() * 100,
				x: 0,
				opacity: [1, 0.5, 0],
			}}
			transition={{ duration: 4 + Math.random() * 3, ease: 'linear' }}
			onAnimationComplete={() => onComplete(id)}
		/>
	);
};

const Snowfall = ({ numberOfSnowflakes = 150 }) => {
	const [snowflakes, setSnowflakes] = useState<SnowflakeType[]>([]);

	// Функция за създаване на нова снежинка
	const createSnowflake = (id: number): SnowflakeType => ({
		id: id,
		style: {
			position: 'absolute',
			left: `${Math.random() * 100}vw`, // Промяна на изчислението на позициониране
			transform: `translateX(-50%)`, // Центриране на снежинките спрямо тяхната точка на генериране
			width: `${5 + Math.random() * 5}px`,
			height: `${5 + Math.random() * 5}px`,
			borderRadius: '50%',
			backgroundColor: 'white',
			opacity: 0.8,
		},
	});

	const handleComplete = (id: number) => {
		setSnowflakes((prevSnowflakes) =>
			prevSnowflakes.filter((flake) => flake.id !== id),
		);
	};

	useEffect(() => {
		// Създаване на началните снежинки
		const initialSnowflakes = Array.from(
			{ length: numberOfSnowflakes },
			(_, index) => createSnowflake(index),
		);
		setSnowflakes(initialSnowflakes);

		// Добавяне на нови снежинки на всеки 5 секунди
		const interval = setInterval(() => {
			// Генериране на случаен брой снежинки между 10 и 20
			const newSnowflakesCount = Math.floor(Math.random() * 11) + 10; // 10 до 20 включително
			setSnowflakes((prevSnowflakes) => [
				...prevSnowflakes,
				...Array.from({ length: newSnowflakesCount }, (_, index) =>
					createSnowflake(prevSnowflakes.length + index),
				),
			]);
		}, 5000);

		// Почистване на интервала при демонтиране на компонента
		return () => clearInterval(interval);
	}, []);

	return (
		<AnimatePresence>
			{snowflakes.map((flake) => (
				<Snowflake
					key={flake.id}
					id={flake.id}
					style={flake.style}
					onComplete={handleComplete}
				/>
			))}
		</AnimatePresence>
	);
};

export default Snowfall;
