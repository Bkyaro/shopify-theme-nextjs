module.exports = {
	env: {
		SHOPIFY_STOREFRONT_ACCESS_TOKEN:
			process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
		SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
	},
	images: {
		domains: ["cdn.shopify.com"],
	},
};
