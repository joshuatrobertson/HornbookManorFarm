'use strict';
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);

/**
 * order controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) => ({
    async create(ctx) {
        const {products} = ctx.request.body;
        const lineItems = await Promise.all(
            products.map(async (product) => {
                const item = await strapi.server("api:product.product").findOne(product.id)
                return {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: item.title,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                }
            })
        )

        try {

            const session = stripe.checkout.create({
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}?success=true`,
                cancel_url: `${process.env.CLIENT_URL}?success=false`,
                line_items: lineItems,
                payment_method: ["card", "paypal"],
            });

            await strapi.service("api::order:order").create({
                data: {
                    stripe_id: session.id,
                    products
                }
            });
            return {stripeSession: session};
        } catch (e) {
            ctx.response.status = 500;
            return e;
        }
    }
}));
