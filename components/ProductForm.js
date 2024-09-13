import { useState, useContext, useEffect } from "react";
import { formatter } from "../utils/helper";
import ProductOptions from "./ProductOptions";
import { CartContext } from "@/context/shopContext";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url, id) => {
	return axios.get(url).then((res) => {
		console.log("res.data", res.data);
		return res.data;
	});
};

export default function ProductForm({ product }) {
	const { data: productInventory } = useSWR(
		`/api/available?id=${product.handle}`,
		(url) => fetcher(url),
		{ errorRetryCount: 3 }
	);

	const [available, setAvailable] = useState(true);

	const { addToCart } = useContext(CartContext);

	const allVariantsOptions = product.variants.edges?.map((variant) => {
		const allOptions = {};

		variant.node.selectedOptions.forEach((item) => {
			allOptions[item.name] = item.value;
		});

		return {
			id: variant.node.id,
			title: product.title,
			handle: product.handle,
			image: variant.node.image?.url,
			options: allOptions,
			variantTitle: variant.node.title,
			variantPrice: variant.node.price.amount,
			variantQuantity: 1,
		};
	});

	const defaultValues = {};
	product.options.map((item) => {
		defaultValues[item.name] = item.optionValues[0].name;
	});

	const [selectedVariant, setSelectedVariant] = useState(
		allVariantsOptions[0]
	);
	const [selectedOptions, setSelectedOptions] = useState(defaultValues);

	function setOptions(name, value) {
		setSelectedOptions((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});

		const selection = {
			...selectedOptions,
			[name]: value,
		};

		allVariantsOptions.map((item) => {
			if (JSON.stringify(item.options) === JSON.stringify(selection)) {
				setSelectedVariant(item);
			}
		});
	}

	// 检查库存
	useEffect(() => {
		if (productInventory) {
			const checkAvailable = productInventory?.variants.edges.filter(
				(item) => item.node.id === selectedVariant.id
			);

			if (checkAvailable[0].node.availableForSale) {
				setAvailable(true);
			} else {
				setAvailable(false);
			}
		}
	}, [productInventory, selectedVariant]);

	return (
		<div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
			<h2 className="text-2xl font-bold ">{product.title}</h2>
			<span className="pb-3">
				{formatter.format(product.variants.edges[0].node.price.amount)}
			</span>
			{product.options.map(({ name, optionValues }) => (
				<ProductOptions
					key={`key-${name}`}
					name={name}
					values={optionValues}
					selectedOptions={selectedOptions}
					setOptions={setOptions}
				/>
			))}
			{available ? (
				<button
					onClick={() => addToCart(selectedVariant)}
					className="mt-4 bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800"
				>
					Add To Cart
				</button>
			) : (
				<button className="rounded-lg text-white px-2 py-3 mt-4 bg-gray-500 cursor-not-allowed">
					Sold Out
				</button>
			)}
		</div>
	);
}
