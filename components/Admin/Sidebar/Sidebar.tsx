"use client";
import { AdminSidebarLinks } from "@/config/site";
import { useUIStore } from "@/lib/store/general";
import Link from "next/link";
import { ChevronDown, Home, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar() {
  const { isSidebarOpen, expanded, toggleExpanded, toggleSidebar } =
    useUIStore();
  const pathname = usePathname();

  useEffect(() => {
    const store = useUIStore.getState();
    if (
      store.isSidebarOpen &&
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      store.toggleSidebar();
    }
  }, [pathname]);

  return (
    <aside
      className={`border-r border-orange-500/10 bg-white transition-all duration-300 ease-in-out z-50
        ${
          isSidebarOpen
            ? "fixed inset-y-0 top-0 w-full md:relative md:w-100"
            : "fixed inset-y-0 -left-full md:relative md:left-0 md:w-20"
        }
        md:sticky md:top-0 md:h-screen md:flex md:flex-col
      `}
    >
      <div className="flex flex-col h-full w-full overflow-hidden">
        <div className="flex items-center justify-between h-20 px-6 border-b border-orange-500/5 shrink-0 bg-white/50 backdrop-blur-sm">
          <Link href="/admin" className="flex items-center gap-3.5 group">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-orange-500 text-white font-black text-xl shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-all duration-500 group-hover:rotate-3">
              E
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col leading-none animate-in fade-in slide-in-from-left-3 duration-500">
                <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                  Super<span className="text-orange-500">.</span>
                </span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                  Management
                </span>
              </div>
            )}
          </Link>

          {/* Кнопка закрытия для мобилок */}
          {isSidebarOpen && (
            <button
              onClick={() => toggleSidebar()}
              className="md:hidden p-2 rounded-xl bg-slate-900 text-white shadow-lg active:scale-90 transition-all"
              aria-label="Закрити меню"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-8 space-y-1.5 no-scrollbar custom-scrollbar">
          {AdminSidebarLinks.map((link) => {
            const isExpanded = expanded?.includes(link.title);
            const hasSubLink = link.subLinks && link.subLinks.length > 0;
            const isActive =
              pathname === link.href ||
              link.subLinks?.some((sub) => sub.href === pathname);

            return (
              <div key={link.title} className="w-full">
                {link.href && !hasSubLink ? (
                  <Link
                    href={link.href}
                    className={`flex items-center h-12 px-4 rounded-2xl transition-all duration-300 group relative
                      ${
                        isActive
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10"
                          : "text-slate-500 hover:bg-orange-500/5 hover:text-orange-600"
                      }
                      ${isSidebarOpen ? "gap-4" : "md:justify-center"}
                    `}
                  >
                    <link.icon
                      size={20}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`shrink-0 transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                    />
                    {isSidebarOpen && (
                      <span className="font-bold text-[14px] tracking-tight">
                        {link.title}
                      </span>
                    )}
                    {isActive && isSidebarOpen && (
                      <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      if (!isSidebarOpen) toggleSidebar();
                      if (hasSubLink) toggleExpanded(link.title);
                    }}
                    className={`w-full flex items-center h-12 px-4 rounded-2xl transition-all duration-300 group
                      ${
                        isActive
                          ? "bg-orange-500/5 text-orange-600"
                          : "text-slate-500 hover:bg-orange-500/5 hover:text-orange-600"
                      }
                      ${isSidebarOpen ? "gap-4" : "md:justify-center"}
                    `}
                  >
                    <link.icon
                      size={20}
                      strokeWidth={isActive ? 2.5 : 2}
                      className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    {isSidebarOpen && (
                      <>
                        <span className="flex-1 font-bold text-[14px] text-left tracking-tight">
                          {link.title}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`transition-all duration-500 opacity-40 ${
                            isExpanded
                              ? "rotate-180 text-orange-500 opacity-100"
                              : ""
                          }`}
                        />
                      </>
                    )}
                  </button>
                )}

                {isSidebarOpen && isExpanded && hasSubLink && (
                  <div className="ml-6 mt-2 space-y-1 py-1 animate-in fade-in slide-in-from-top-2 duration-300">
                    {link.subLinks?.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className={`group/sub flex items-center gap-3 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
                            isSubActive
                              ? "text-orange-600 bg-orange-500/5"
                              : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                              isSubActive
                                ? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] scale-125"
                                : "bg-slate-200 group-hover/sub:bg-slate-400 group-hover/sub:scale-110"
                            }`}
                          />
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-orange-500/5 bg-slate-50/30">
          <Link
            href="/"
            className={`flex items-center h-12 px-4 rounded-2xl text-slate-500 hover:bg-white hover:text-orange-600 hover:shadow-sm transition-all font-bold text-[14px] group border border-transparent hover:border-slate-100
                ${isSidebarOpen ? "gap-4" : "md:justify-center"}
            `}
          >
            <Home
              size={20}
              className="shrink-0 transition-transform group-hover:scale-110"
            />
            {isSidebarOpen && (
              <span className="truncate tracking-tight whitespace-nowrap">
                На головну
              </span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
