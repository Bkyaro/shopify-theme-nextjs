import Link from "next/link";
import { CartContext } from "@/context/shopContext";
import { useContext } from "react";

function Nav() {
	const { cart, cartOpen, setCartOpen } = useContext(CartContext);

	let cartQuantity = 0;
	cart.map((item) => {
		return (cartQuantity += item?.variantQuantity);
	});
	return (
		<div className="border-b sticky top-0 z-20 bg-white">
			<div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
				<Link legacyBehavior href="/" passHref>
					<a className="cursor-pointer">
						<span className="text-lg pt-1 font-bold">
							Shopify Theme with Next.js
						</span>
					</a>
				</Link>
				<a className="text-md font-bold cursor-pointer">
					Cart ({cartQuantity})
				</a>
			</div>
		</div>
	);
}

export default Nav;
