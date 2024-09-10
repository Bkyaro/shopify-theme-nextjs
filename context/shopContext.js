import { createContext, useState, useEffect } from "react";
import { createCheckout, updateCheckout } from "../lib/shopify";

const CartContext = createContext();

export default function ShopProvider({ children }) {
	const [cart, setCart] = useState([]);
	const [cartOpen, setCartOpen] = useState(false);
	const [checkoutId, setCheckoutId] = useState("");
	const [checkoutUrl, setCheckoutUrl] = useState("");

	useEffect(() => {
		if (localStorage.getItem("checkout_id")) {
			const cartObject = JSON.parse(localStorage.getItem("checkout_id"));

			// 购物车一个及以上时，返回的是数组，只有一个时返回的是对象，所以此需要区分
			if (cartObject[0] instanceof Array) {
				setCart([...cartObject[0]]);
			} else {
				setCart([cartObject[0]]);
			}

			setCheckoutId(cartObject[1].id);
			setCheckoutUrl(cartObject[1].checkoutUrl);
		}
	}, []);

	async function addToCart(newItem) {
		setCartOpen(true);

		if (cart.length === 0) {
			setCart([newItem]);

			const checkout = await createCheckout(
				newItem.id,
				newItem.variantQuantity
			);

			setCheckoutId(checkout.id);
			setCheckoutUrl(checkout.checkoutUrl);

			localStorage.setItem(
				"checkout_id",
				JSON.stringify([newItem, checkout])
			);
		} else {
			let newCart = [...cart];
			cart.map((item) => {
				if (item.id === newItem.id) {
					item.variantQuantity++;
					newCart = [...cart];
				} else {
					newCart = [...cart, newItem];
				}
			});

			setCart(newCart);

			const newCheckout = await updateCheckout(checkoutId, newCart);

			localStorage.setItem(
				"checkout_id",
				JSON.stringify([newCart, newCheckout])
			);
		}
	}

	async function removeCartItem(itemToRemove) {
		const updatedCart = cart.filter((item) => item.id !== itemToRemove);

		setCart(updatedCart);

		const newCheckout = await updateCheckout(checkoutId, updatedCart);

		localStorage.setItem(
			"checkout_id",
			JSON.stringify([updatedCart, newCheckout])
		);

		if (cart.length === 1) {
			setCartOpen(false);
		}
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				cartOpen,
				setCartOpen,
				addToCart,
				checkoutId,
				checkoutUrl,
				removeCartItem,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext };
