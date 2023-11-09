'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabaseClient';

import { Separator } from '@/components/ui/separator';

interface Content {
	id: number;
	title: string;
	description: string;
	category_id: number;
	price: number;
}

export const List = () => {
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

	return (
		<>
			<article className=" sm:flex items-start sm:space-x-4 p-3">
				{content.length > 0 ? (
					content.map((content) => (
						<div
							className="min-w-0  bg-slate-50 shadow-md rounded-md hover:bg-slate-200 hover:text-white"
							key={content.id}
						>
							<div className="mt-3 items-center text-center space-y-1">
								<h4 className="font-semibold text-orange-900 truncate pr-20">
									{content.title}
								</h4>
								<p className="text-sm text-muted-foreground">
									{content.description}
								</p>
							</div>
							<div className="w-1/2 absolute lg:relative right-0 sm:relative sm:w-20 items-center  bg-slate-500 text-white rounded-lg text-center space-x-5 text-lg">
								{content.price}
								ЛВ
							</div>

							<Separator className="my-4" />
						</div>
					))
				) : (
					<p>Няма намерени артикули.</p>
				)}
			</article>
		</>
	);
};
