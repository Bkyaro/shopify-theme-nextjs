"use client";

import { useContext } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { CartContext } from "../context/shopContext";
import { formatter } from "../utils/helper";
import Link from "next/link";

export default function MiniCart({ cart }) {
	const { cartOpen, setCartOpen, checkoutUrl, removeCartItem } =
		useContext(CartContext);

	let cartTotal = 0;
	cart.map((item) => {
		cartTotal += item?.variantPrice * item?.variantQuantity;
	});

	return (
		<Dialog
			open={cartOpen}
			onClose={() => {
				setCartOpen(!cartOpen);
			}}
			className="relative z-50"
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
			/>

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
						<DialogPanel
							transition
							className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
						>
							<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
								<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
									<div className="flex items-start justify-between">
										<DialogTitle className="text-lg font-medium text-gray-900">
											Shopping cart
										</DialogTitle>
										<div className="ml-3 flex h-7 items-center">
											<button
												type="button"
												onClick={() =>
													setCartOpen(false)
												}
												className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
											>
												<span className="absolute -inset-0.5" />
												<span className="sr-only">
													Close panel
												</span>
												<XMarkIcon
													aria-hidden="true"
													className="h-6 w-6"
												/>
											</button>
										</div>
									</div>

									<div className="mt-8">
										<div className="flow-root">
											<ul
												role="list"
												className="-my-6 divide-y divide-gray-200"
											>
												{cart.map((product) => (
													<li
														key={product.id}
														className="flex py-6"
													>
														<Link
															legacyBehavior
															href={`/products/${product.handle}`}
														>
															<div
																onClick={() => {
																	setCartOpen(
																		false
																	);
																}}
																className="cursor-pointer relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
															>
																<Image
																	alt={
																		product.title
																	}
																	src={
																		product.image
																	}
																	layout="fill"
																	objectFit="cover"
																/>
															</div>
														</Link>

														<div className="ml-4 flex flex-1 flex-col">
															<div>
																<div className="flex justify-between text-base font-medium text-gray-900">
																	<h3>
																		<Link
																			legacyBehavior
																			passHref
																			href={`/products/${product.handle}`}
																		>
																			<a
																				onClick={() => {
																					setCartOpen(
																						false
																					);
																				}}
																			>
																				{
																					product.title
																				}
																			</a>
																		</Link>
																	</h3>
																	<p className="ml-4">
																		{formatter.format(
																			product.variantPrice
																		)}
																	</p>
																</div>
																<p className="mt-1 text-sm text-gray-500">
																	{
																		product.variantTitle
																	}
																</p>
															</div>
															<div className="flex flex-1 items-end justify-between text-sm">
																<p className="text-gray-500">
																	Qty{" "}
																	{
																		product.variantQuantity
																	}
																</p>

																<div className="flex">
																	<button
																		type="button"
																		onClick={() =>
																			removeCartItem(
																				product.id
																			)
																		}
																		className="font-medium text-gray-500 hover:text-gray-800"
																	>
																		Remove
																	</button>
																</div>
															</div>
														</div>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
								{cart.length > 0 ? (
									<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
										<div className="flex justify-between text-base font-medium text-gray-900">
											<p>Subtotal</p>
											<p>{formatter.format(cartTotal)}</p>
										</div>
										<p className="mt-0.5 text-sm text-gray-500">
											Shipping and taxes calculated at
											checkout.
										</p>
										<div className="mt-6">
											<a
												href={checkoutUrl}
												className="cursor-pointer flex items-center justify-center rounded-md border border-transparent  px-6 py-3 text-base font-medium text-white shadow-sm bg-black hover:bg-gray-800"
											>
												Checkout
											</a>
										</div>
										<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
											<p>
												or{" "}
												<button
													type="button"
													onClick={() =>
														setCartOpen(false)
													}
													className="font-medium hover:text-gray-800"
												>
													Continue Shopping
													<span aria-hidden="true">
														&rarr;
													</span>
												</button>
											</p>
										</div>
									</div>
								) : (
									<div className="flex justify-center items-center h-full">
										<p className="text-gray-500">
											Your cart is empty
										</p>
									</div>
								)}
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
