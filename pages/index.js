import { getProductsInCollection } from "../lib/shopify";
import ProductList from "../components/ProductList";
import Hero from "../components/Hero";
import Head from "next/head";

// 用 ogp.me 做SEO
// https://moz.com/blog/the-ultimate-guide-to-seo-meta-tags
// https://developers.facebook.com/tools/debug
export default function Home({ products }) {
	return (
		<div className="">
			<Head>
				<title>Modern eCommerce Theme</title>
				<meta
					http-equiv="Content-Type"
					content="text/html; charset=utf-8"
				/>
				<meta
					http-equiv="Content-Type"
					content="text/html; charset=ISO-8859-1"
				/>
				<meta name="description" content="Modern eCommerce Theme" />
				<meta property="og:title" content="Modern eCommerce Theme" />
				<meta property="og:image" content="" />
				<meta property="og:url" content="" />
				<meta property="og:type" content="" />
				<meta property="og:description" content="" />
				<meta property="og:locale" content="" />
				<meta property="og:site_name" content="" />
			</Head>
			<Hero />
			<ProductList products={products} />
		</div>
	);
}

export async function getStaticProps() {
	const products = await getProductsInCollection();

	return {
		props: {
			products,
		},
	};
}
