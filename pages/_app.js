import "@/styles/globals.css";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import Layout from "../components/Layout";
import ShopProvider from "@/context/shopContext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
	const router = useRouter();
	return (
		<ShopProvider>
			<Layout>
				<Component {...pageProps} key={router.asPath} />
			</Layout>
		</ShopProvider>
	);
}
