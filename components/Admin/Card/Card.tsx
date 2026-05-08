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
        className="flex overflow-x-auto md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6 gap-6 w-full snap-x snap-mandatory overscroll-x-none scrollbar-hide pb-4"
      >
        {cards.map((item) => (
          <div
            key={item.title}
            className="flex flex-col p-7 md:p-8 border border-slate-100 rounded-[32px] bg-white hover:border-orange-500/20 transition-all duration-500 group cursor-pointer w-full snap-center shrink-0 hover:shadow-xl hover:shadow-slate-100/50"
          >
            <div className="flex items-center justify-between mb-8">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                <item.icon size={26} strokeWidth={2.5} />
              </div>
              <div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-orange-500 transition-colors duration-500" />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                {item.title}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tighter">
                  {item.value}
                </h3>
                <span className="text-xs md:text-sm font-bold text-slate-300 uppercase">
                  {item.unit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-2 md:hidden">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              activeIndex === index ? "w-8 bg-slate-900" : "w-2 bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
