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

export async function getProductsInCollection() {
	const query = `
{
  collection(handle: "HomePage") {
    title
    products(first: 25) {
      edges {
        node {
          id
          title
          handle
          priceRange{
            minVariantPrice{
              amount
            }
         }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
    `;

	const response = await ShopifyData(query);

	const allProducts = response.data.collection.products.edges
		? response.data.collection.products.edges
		: [];

	return allProducts;
}
