// shopify域名
const domain = process.env.SHOPIFY_STORE_DOMAIN;
// storefront access token
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
// shopify文档
// https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/migrate-to-cart-api/migrate-your-app

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

export async function getALlProducts() {
	const query = `
    {
    products(first:25){
        edges{
        node{
            handle
            id
        }
        }
    }
    }
    `;

	const response = await ShopifyData(query);

	const slugs = response.data.products.edges
		? response.data.products.edges
		: [];

	return slugs;
}

export async function getProduct(handle) {
	const query = `
{
  product(handle: "${handle}"){
    collections(first:1){
      edges{
        node{
          products(first:5){
            edges{
              node{
                priceRange{
                  minVariantPrice{
                    amount
                  }
                }
                handle
                title
                id
                images(first:5){
                  edges{
                    node{
                      altText
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    id
    title
    handle
    description
    images(first:5){
      edges{
        node{
          url,
          altText
        }
      }
    }
    options{
      name
			optionValues{
        name
      }
      id
    }
    variants(first:25){
      edges{
        node{
          selectedOptions{
            name
						value
          }
          image{
            url,
            altText
          }
          title,
          id
          price{
            amount
          }
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

export async function createCheckout(id, quantity) {
	const query = `
mutation {
  cartCreate(input: {lines: [{quantity: ${quantity}, merchandiseId: "${id}"}] }){
    cart {
      id
      checkoutUrl
    }
  }
}
    `;

	const response = await ShopifyData(query);

	const checkout = response.data.cartCreate.cart
		? response.data.cartCreate.cart
		: "";

	return checkout;
}

export async function updateCheckout(id, lineItems) {
	const lineItemsObject = lineItems.map((item) => {
		return `{
      merchandiseId: "${item.id}",
      quantity: ${item.variantQuantity}
    }`;
	});

	const query = `
  mutation {
    cartLinesAdd(cartId:"${id}", lines:[${lineItemsObject}]){
      cart {
        id
        checkoutUrl
        lines(first: 25) {
        edges {
          node {
            merchandise {
              ... on ProductVariant {
                id
                title
                product{
                  title
                }
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

	const checkout = response.data.cartLinesAdd
		? response.data.cartLinesAdd.cart
		: [];

	return checkout;
}
