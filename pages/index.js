import { getProductsInCollection } from "../lib/shopify";
import ProductList from "../components/ProductList";

export default function Home({ products }) {
	console.log("products", products);
	return <ProductList products={products} />;
}

export async function getStaticProps() {
	const products = await getProductsInCollection();

	return {
		props: {
			products,
		},
	};
}
