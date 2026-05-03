import "../globals.css";
import StoreHeader, { SubHeader } from "@/components/Header/StoreHeader";
import CartDrawer from "@/components/Admin/Cart/CartDrawer";

export default function Store({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-zinc-50 tracking-tight">
      <StoreHeader />
      <main className="flex flex-col flex-1">
        <SubHeader />
        <div className="relative flex-1 flex flex-col">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 premium-glow opacity-60" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/50 to-slate-950" />
            <div className="absolute inset-0 noise-overlay" />
          </div>
          <div className="relative z-10 flex-1 container mx-auto px-2 md:px-4 mt-2 md:mt-6">
            {children}
          </div>
        </div>
      </main>
      <CartDrawer />
    </div>
  );
}
