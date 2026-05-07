"use client";
import { useState, useRef } from "react";
import { getCardHome } from "./genaralInfo";

export default function Card({
  productsCount = 0,
  outOfStock = 0,
  productCash,
  OrderCount = 0,
}: {
  productsCount?: number;
  outOfStock?: number;
  productCash?: number;
  OrderCount?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const cards = getCardHome(
    productsCount,
    outOfStock,
    productCash ?? 0,
    OrderCount,
  );

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const cardWidth = scrollRef.current.children[0]?.clientWidth || 1;
    const index = Math.round(scrollRef.current.scrollLeft / cardWidth);

    setActiveIndex(index);
  };
  return (
    <div className="w-full">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 gap-4 w-full snap-x snap-mandatory overscroll-x-none scrollbar-hide"
      >
        {cards.map((item) => (
          <div
            key={item.title}
            className="flex flex-col p-5 border border-slate-200 rounded-2xl bg-white hover:border-blue-500/30 transition-all group cursor-pointer w-full md:w-full snap-center shrink-0"
          >
            <div className="flex items-start justify-between mb-4 cursor-pointer">
              <div
                className={`p-3 rounded-xl ${item.bg} ${item.color} transition-transform group-hover:scale-110`}
              >
                <item.icon size={24} strokeWidth={2} />
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-sm font-medium text-slate-400 mb-1">
                {item.title}
              </p>
              <h3 className={`text-3xl font-bold text-zinc-900`}>
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-6 bg-blue-600" : "w-2 bg-zinc-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
