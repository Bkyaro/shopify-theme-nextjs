import Image from "next/image";
import Link from "next/link";
import { formatter } from "../utils/helper";

const ProductCard = ({ product }) => {
	const { handle, title } = product.node;

	const { altText, url } = product.node.images.edges[0].node;

	const price = product.node.priceRange.minVariantPrice.amount;

	return (
		<Link href={`/products/${handle}`}>
			<div className="group">
				<div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
					<div className="relative group-hover:opacity-75 h-72">
						<Image
							src={url}
							alt={altText}
							layout="fill"
							objectFit="cover"
						/>
					</div>
				</div>
				<h3 className="mt-4 text-lg font-medium text-gray-900">
					{title}
				</h3>
				<p className="mt-1 text-sm text-gray-500">
					{formatter.format(price)}
				</p>
			</div>
		</Link>
	);
};

export default ProductCard;
