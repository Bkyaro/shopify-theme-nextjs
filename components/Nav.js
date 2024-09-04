import Link from "next/link";

function Nav() {
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
				<a className="text-md font-bold cursor-pointer">Cart</a>
			</div>
		</div>
	);
}

export default Nav;
