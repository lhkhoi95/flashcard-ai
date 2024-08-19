import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

export async function POST(req) {
  const { plan } = await req.json();

  const unitAmount = plan.isYearly
    ? formatAmountForStripe(plan.yearlyPrice)
    : formatAmountForStripe(plan.monthlyPrice);

  const params = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: plan.title,
          },
          unit_amount: unitAmount,
          recurring: {
            interval: plan.isYearly ? "year" : "month",
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get(
      "origin"
    )}/checkout/success/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      "origin"
    )}/checkout/failed/result?session_id={CHECKOUT_SESSION_ID}`,
  };

  try {
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
