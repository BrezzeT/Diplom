import Link from "next/link";
export default function Home() {
  return (
    <div className="text-zinc-50 overflow-hidden">
      <section className="relative pt-20 pb-32">
        <div className="px-4 relative z-10">
          <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tighter mb-6 leading-tight">
            Обирай твій магазин <br />
            <span className="bg-linear-to-r from-indigo-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              майбутнього
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 max-w-xl leading-relaxed font-medium">
            Тут ти знайдеш потрібний тобі смартфон за декілька кліків.{" "}
            <br className="hidden md:block" />
            Ми гарантуємо якість та швидку доставку.
          </p>
          <div className="mt-14 flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="px-8 py-4 bg-white hover:bg-slate-200 text-slate-950 rounded-xl shadow-lg font-bold transition-all shadow-white/10 hover:shadow-white/20 hover:scale-[1.01] active:scale-95"
            >
              Переглянути каталог
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all backdrop-blur-md hover:scale-[1.01] active:scale-95"
            >
              Дізнатися більше
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
