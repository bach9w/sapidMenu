'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabaseClient';

interface Content {
	id: number;
	title: string;
	description: string;
	category_id: number;
	price: number;
}

const cards = [
	{
		id: 1,
		title: 'Item 1',
		subtitle: 'Subtitle 1',
		description: 'Description 1',
	},
	{
		id: 2,
		title: 'Item 2',
		subtitle: 'Subtitle 2',
		description: 'Description 2',
	},
	{
		id: 3,
		title: 'Item 3',
		subtitle: 'Subtitle 3',
		description: 'Description 3',
	},
	{
		id: 4,
		title: 'Item 4',
		subtitle: 'Subtitle 4',
		description: 'Description 4',
	},
	{
		id: 5,
		title: 'Item 5',
		subtitle: 'Subtitle 5',
		description: 'Description 5',
	},
	{
		id: 6,
		title: 'Item 6',
		subtitle: 'Subtitle 5',
		description: 'Description 5',
	},
	{
		id: 7,
		title: 'Item 7',
		subtitle: 'Subtitle 5',
		description: 'Description 5',
	},
	{
		id: 8,
		title: 'Item 8',
		subtitle: 'Subtitle 5',
		description: 'Description 5',
	},
	{
		id: 9,
		title: 'Item 9',
		subtitle: 'Subtitle 5',
		description: 'Description 5',
	},
];

export default function App() {
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const [content, setContent] = useState<Content[]>([]);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const categoryId = searchParams.get('categoryId');
		fetchContent(categoryId);
	}, [searchParams]);

	const fetchContent = async (categoryId: string | null) => {
		let query = supabase.from('content').select('*');
		if (categoryId) {
			query = query.eq('category_id', categoryId);
		}
		const { data, error } = await query;

		if (error) {
			console.error(error);
		} else {
			setContent(data);
		}
	};
	const selectedCard = content.find((content) => content.id === selectedId);

	useEffect(() => {
		if (selectedId) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [selectedId]);

	const handleCardClick = (id: number) => {
		if (selectedId !== null) {
			return;
		}
		setSelectedId(id);
	};

	return (
		<AnimatePresence>
			<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center gap-2 p-2 sm:p-6">
				{content.map((card) => (
					<motion.div
						key={card.id}
						layoutId={`card-container-${card.id}`}
						initial={{ opacity: 0, y: 40 }}
						animate={{
							opacity: 1,
							y: 10,
						}}
						exit={{ opacity: 1, y: -20 }}
						transition={{
							duration: 0.8,
						}}
						whileHover={{ scale: 1.05 }}
						onClick={() => handleCardClick(card.id)}
						className="grid relative place-items-center text-center cursor-pointer bg-white w-full sm:w-[200px] rounded-xl rounded-br-xl h-[150px] sm:h-[200px] hover:bg-slate-200 "
					>
						<div>
							<h4 className="font-semibold text-orange-900 truncate pr-10">
								{card.title}
							</h4>
							<div className="w-1/2 absolute right-0  sm:w-20 bottom-0 items-center  bg-slate-500 text-white rounded-lg text-center space-x-5 text-lg">
								{card.price}
								ЛВ
							</div>
						</div>
					</motion.div>
				))}
			</div>
			{selectedId && selectedCard && (
				<motion.div
					layoutId={`card-container-${selectedId}`}
					className="fixed inset-0 m-auto flex flex-col justify-center w-[90%] max-w-[500px] h-[300px] bg-white place-items-center shadow-lg rounded-md rounded-br-xl"
					initial={{ y: 50, opacity: 1 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -50, opacity: 0 }}
					transition={{ duration: 0.8 }}
					onClick={() => setSelectedId(null)}
				>
					<div className="text-center">
						<h4 className="font-semibold text-2xl text-orange-900 truncate pr-20">
							{selectedCard.title}
						</h4>
						<div className="w-1/2 absolute right-0  sm:w-20 bottom-0 items-center  bg-slate-500 text-white rounded-lg text-center space-x-5 text-lg">
							{selectedCard.price}
							ЛВ
						</div>
						<p>{selectedCard.description}</p>
						<button onClick={() => setSelectedId(null)}></button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
