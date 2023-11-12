import Header from '@/components/Header';
import { Categories } from '@/components/Category';
import { List } from '@/components/Content';
import App from '@/app/modal/page';

export default function Notes() {
	return (
		<>
			<body>
				<div className="bg-indigo-500 min-h-[100vh]">
					<Header />

					<Categories />
					<App />
				</div>
			</body>
		</>
	);
}
