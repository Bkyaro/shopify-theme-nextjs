import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
	console.log("product", products);
	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-extrabold text-gray-900 mb-6">
					Products
				</h2>
				<div className=" text-gray-900 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 lg:gap-x-8">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
