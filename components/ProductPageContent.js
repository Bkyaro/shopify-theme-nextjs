import Image from "next/image";
import ProductForm from "./ProductForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

export default function ProductPageContent({ product }) {
	console.log("product", product);
	const images = [];
	product.images.edges.map((image, i) => {
		images.push(
			<SwiperSlide key={i}>
				<Image
					src={image.node.url}
					alt={image.node.altText}
					layout="fill"
					objectFit="cover"
				/>
			</SwiperSlide>
		);
	});

	return (
		<div className="w-full flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl  max-auto">
			<div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
				<div className="relative h-96 w-full">
					<Swiper
						style={{
							"--swiper-navigation-color": "#000",
							"--swiper-pagination-color": "#000",
						}}
						navigation={true}
						pagination={true}
						scrollbar={true}
						className="h-96 rounded-2xl"
						loop={true}
						modules={[Navigation, Pagination, Scrollbar]}
					>
						{images}
					</Swiper>
				</div>
			</div>
			<ProductForm product={product} />
		</div>
	);
}
