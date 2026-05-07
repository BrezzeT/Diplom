"use client";
import { AdminSidebarLinks } from "@/config/site";
import { useUIStore } from "@/lib/store/general";
import Link from "next/link";
import { ChevronDown, Home } from "lucide-react";
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
            ? "fixed inset-y-0 left-0 w-72 md:relative md:w-72"
            : "fixed inset-y-0 -left-full md:relative md:left-0 md:w-20"
        }
        md:sticky md:top-0 md:h-screen md:flex md:flex-col
      `}
    >
      <div className="flex flex-col h-full w-full overflow-hidden">
        {/* LOGO AREA */}
        <div className="flex items-center h-20 px-4 md:px-5 border-b border-orange-500/10 shrink-0">
          <Link
            href="/admin"
            className="flex items-center gap-3 overflow-hidden"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white font-black text-xl transition-transform duration-300">
              E
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col leading-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2">
                <span className="text-lg font-bold tracking-tight text-slate-800">
                  Store<span className="text-orange-500">.</span>
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Admin Panel
                </span>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 md:px-3 py-6 space-y-2 no-scrollbar">
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
                    className={`flex items-center h-11 px-3 rounded-xl transition-all duration-200 group relative
                      ${
                        isActive
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                          : "text-slate-500 hover:bg-orange-500/5 hover:text-orange-500"
                      }
                      ${isSidebarOpen ? "gap-3" : "md:justify-center"}
                    `}
                  >
                    <link.icon
                      size={22}
                      strokeWidth={isActive ? 2.5 : 2}
                      className="shrink-0 transition-transform duration-200"
                    />
                    {isSidebarOpen && (
                      <span className="font-bold text-sm truncate tracking-tight">
                        {link.title}
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      if (!isSidebarOpen) toggleSidebar();
                      if (hasSubLink) toggleExpanded(link.title);
                    }}
                    className={`w-full flex items-center h-11 px-3 rounded-xl transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-orange-500/10 text-orange-600"
                          : "text-slate-500 hover:bg-orange-500/5 hover:text-orange-500"
                      }
                      ${isSidebarOpen ? "gap-3" : "md:justify-center"}
                    `}
                  >
                    <link.icon
                      size={22}
                      strokeWidth={isActive ? 2.5 : 2}
                      className="shrink-0"
                    />
                    {isSidebarOpen && (
                      <>
                        <span className="flex-1 font-bold text-sm text-left truncate tracking-tight">
                          {link.title}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 opacity-40 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>
                )}

                {isSidebarOpen && isExpanded && hasSubLink && (
                  <div className="ml-8 mt-1 space-y-1 border-l border-orange-500/20 pl-4 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {link.subLinks?.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className={`block py-1.5 text-[13px] font-semibold transition-all ${
                            isSubActive
                              ? "text-orange-600"
                              : "text-slate-400 hover:text-orange-500"
                          }`}
                        >
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

        <div className="p-3 md:p-4 border-t border-orange-500/10 shrink-0">
          <Link
            href="/"
            className={`flex items-center h-11 px-3 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-orange-500 transition-all font-bold text-sm group
                ${isSidebarOpen ? "gap-3" : "md:justify-center"}
            `}
          >
            <Home size={22} className="shrink-0" />
            {isSidebarOpen && (
              <span className="truncate tracking-tight whitespace-nowrap">
                Магазин
              </span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
