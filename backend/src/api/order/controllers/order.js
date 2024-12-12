const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;

    const lineItems = await Promise.all(
      products.map(async (product) => {
        const foundProduct = await strapi.entityService.findOne(
          "api::course.course",
          product.id,
          { populate: ["pricing_tiers"] },
        );

        if (!foundProduct) {
          throw new Error(`Product with ID ${product.id} not found`);
        }

        // Find the selected pricing tier, i.e. 1 class, 5 classes etc
        // Then return that pricing tier
        const selectedTier = foundProduct.pricing_tiers.find(
          (tier) => tier.number_of_classes === product.selectedClasses,
        );

        // Fetch the price for that tier
        const price = selectedTier
          ? selectedTier.price
          : foundProduct.pricing_tiers[0].price;
        const description = product.selectedDate
          ? `Date: ${product.selectedDate}`
          : undefined;
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${foundProduct.name}${
                selectedTier && selectedTier.number_of_classes > 1
                  ? ` (Pack of ${selectedTier.number_of_classes} courses)`
                  : ""
              }`,
              ...(description && { description }), // Include only if description is not undefined
            },
            unit_amount: price * 100,
          },
          quantity: product.quantity,
        };
      }),
    );

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        payment_method_types: ["card", "paypal"],
      });

      await strapi.service("api::order.order").create({
        data: {
          products,
          stripe_id: session.id,
        },
      });

      return { stripeSession: session };
    } catch (e) {
      ctx.response.status = 500;
      return e;
    }
  },
}));
