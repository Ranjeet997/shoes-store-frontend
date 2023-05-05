import React, { useMemo, useState } from "react";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/Api";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function cart() {
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItems]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("/api/orders", {
        products: cartItems,
      });
      await stripe.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full md:py-20">
        <Wrapper>
          {cartItems.length > 0 && (
            <>
              {/* Heading And Paragraph Starrt */}
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
              {/* Heading And Paragraph Starrt */}

              {/* CART CONTENT START */}
              <div className="flex flex-col lg:flex-row gap-12 py-10">
                {/* CART ITEMS STRAT */}
                <div className="flex-[2]">
                  <div className="flex-lg font-bold">Cart Items</div>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </div>
                {/* CART ITEMS END */}

                {/* SUMMARY START */}
                <div className="flex-[1]">
                  <div className="flex-lg font-bold">Summary</div>

                  <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                    <div className="flex justify-between">
                      <div className="text-md uppercase md:text-lg font-medium text-black">
                        Subtotal
                      </div>
                      <div className="text-md md:text-lg font-medium text-black">
                        MRP : ₹ {subTotal}
                      </div>
                    </div>
                    <div className="text-sm md:text-md py-5 border-t mt-5">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vel est molestias iure inventore, nobis esse quod officia
                      quo quae mollitia aspernatur incidunt commodi ipsam eum?
                      Maiores quam nisi ea asperiores?
                    </div>
                    {/* Button Start */}
                    <button
                      className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3"
                      onClick={handlePayment}
                    >
                      Checkout
                      {loading && (<img src="/images/spinner.svg"/>)}
                    </button>
                    {/* Button End */}
                  </div>
                </div>
                {/* SUMMARY END */}
              </div>
              {/* CART CONTENT END */}
            </>
          )}

          {/* this is empty screen */}
          {cartItems.length < 1 && (
            <>
              <div className="flex flex flex-col items-center pb-50px md:mt-10 lg:mt-0">
                <Image
                  src="/images/empty-cart.jpg"
                  width={300}
                  height={300}
                  className="w-[300px] md:w-[400px]"
                />
                <span className="text-xl font-bold">Your cart is empty</span>
                <span className="text-center mt-4">
                  Look like you have not added anything in your cart <br />
                  Go ahead and explore top categories.
                </span>
                <Link
                  href="/"
                  className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 mt-8"
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </Wrapper>
      </div>
    </>
  );
}
