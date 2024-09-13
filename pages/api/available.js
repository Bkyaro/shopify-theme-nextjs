// http://localhost:3000/api/available?id=futurecyborg

export default async function available(req, res) {
	const {
		query: { id },
	} = req;

	// shopify域名
	const domain = process.env.SHOPIFY_STORE_DOMAIN;
	// storefront access token
	const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

	async function ShopifyData(query) {
		const URL = `https://${domain}/api/2024-07/graphql.json`;

		const options = {
			endpoint: URL,
			method: "POST",
			headers: {
				"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
				Accept: "application",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query }),
		};

		try {
			const data = await fetch(URL, options).then((response) => {
				return response.json();
			});
			return data;
		} catch (error) {
			throw new Error("Products not fetched");
		}
	}

	async function getProduct(handle) {
		const query = `
    {
      product(handle: "${handle}"){
        id
        variants(first:25){
          edges{
            node{
              availableForSale
              id
            }
          }
        }
      }
    }
        `;

		const response = await ShopifyData(query);

		const product = response.data.product ? response.data.product : [];

		return product;
	}

	const products = await getProduct(id);

	res.status(200);
	res.json(products);
}
