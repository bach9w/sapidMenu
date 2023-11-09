import Header from '@/components/Header';
import { Categories } from '@/components/Category';
import { List } from '@/components/Content';

export default function Notes() {
	return (
		<>
			<body>
				<Header />
				<Categories />
				<List />
			</body>
		</>
	);
}
