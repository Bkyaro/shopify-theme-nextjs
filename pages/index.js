import { getProductsInCollection } from "../lib/shopify";

export default function Home({ products }) {
	console.log("products", products);
	return <div className="text-2xl">zup</div>;
}

export async function getStaticProps() {
	const products = await getProductsInCollection();

	return {
		props: {
			products,
		},
	};
}
