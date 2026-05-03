"use client";
import { useUIStore } from "@/lib/store/general";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
export default function AdminHeader() {
  const { toggleSidebar, isSidebarOpen } = useUIStore();
  return (
    <header className="sticky top-0 z-50 border-b border-orange-500/20 backdrop-blur-xl h-20 bg-white">
      <div className="flex items-center justify-between px-5 py-3 h-full">
        <div className="flex gap-12 items-center justify-center">
          <button
            aria-label="Відкрити меню"
            type="button"
            onClick={() => toggleSidebar()}
            className="p-2 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div>
          <Link
            href={"/"}
            className="p-2 flex items-center justify-center rounded-full hover:bg-orange-500/20 transition-colors"
          >
            <User size={24} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
