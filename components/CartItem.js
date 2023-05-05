import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "next/image";
import { removeItemFromCart, updateCart } from "@/store/cartSclice";
import { useDispatch } from "react-redux";

export default function CartItem({ data }) {
  const dispatch = useDispatch();

  const p = data?.attributes;
  console.log("this is data of cartItems", p);

  const updateCartItems = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };
  return (
    <>
      <div className="flex py-5 gap-3 md:gap-5 border-b">
        {/* IMAGE START */}
        <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
          <Image
            width={120}
            height={120}
            src={p?.thumbnail?.data[0]?.attributes?.url}
            alt={p?.thumbnail?.data[0]?.attributes?.name}
          />
        </div>
        {/* IMAGE END */}

        <div className="w-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between">
            {/* PRODUCT TITLE */}
            <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
              {p?.name}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
              {p.subtitle}
            </div>

            {/* PRODUCT PRICE */}
            <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
              MRP : ₹ {p.price}
            </div>
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {p.subtitle}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2 md:gap10 text-black/[0.5] text-sm md:text-md">
              <div className="flex items-center gap-1">
                <div className="font-semibold">Size</div>
                <select
                  className="hover:text-black"
                  onChange={(e) => updateCartItems(e, "selectedSize")}
                >
                  {p.size.data.map((item, i) => (
                    <option
                      key={i}
                      disabled={!item.enabled ? true : false}
                      value={item.size}
                      selected={data.selectedSize === item.size}
                    >
                      {item.size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1">
                <div className="font-semibold">Quality</div>
                <select
                  className="hover:text-black"
                  onChange={(e) => updateCartItems(e, "quantity")}
                >
                  {Array.from({ length: 10 }, (q, i) => i + 1).map((q, i) => (
                    <option key={i} value={i} selected={data.quantity === q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <RiDeleteBin5Line
              onClick={() => dispatch(removeItemFromCart({ id: data.id }))}
              className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
