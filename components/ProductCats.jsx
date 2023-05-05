import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getDiscountedPricePercentage } from "@/utils/helper";

export default function ProductCats({ data }) {
  const p = data?.attributes;
  return (
    <>
      <Link
        href={`/product/${p?.slug}`}
        className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
      >
        <Image
          width={592}
          height={500}
          src={p?.thumbnail?.data[0]?.attributes?.url}
          alt={p?.thumbnail?.data[0]?.attributes?.name}
        />
        <div className="p-4 text-back/0.9">
          <h2 className="text-lg font-medium">{p?.name}</h2>
          <div className="flex items-center text-blaxk/[0.5]">
            <p className="mr-2 text-lg font-semibold">₹{p?.price}</p>
            {p?.originalPrice && (
              <>
                <p className="text-base font-medium line-through">₹{p?.originalPrice}</p>
                <p className="ml-auto text-base font-medium text-green-500">
                  {getDiscountedPricePercentage(p?.originalPrice, p?.price)}
                  % off
                </p>
              </>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
