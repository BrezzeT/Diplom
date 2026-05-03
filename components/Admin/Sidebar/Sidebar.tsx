"use client";
import { AdminSidebarLinks } from "@/config/site";
import { useUIStore } from "@/lib/store/general";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar() {
  const { isSidebarOpen, expanded, toggleExpanded, toggleSidebar } =
    useUIStore();
  const pathname = usePathname();

  useEffect(() => {
    const store = useUIStore.getState();
    if (store.isSidebarOpen && window.innerWidth) {
      store.toggleSidebar();
    }
  }, [pathname]);

  return (
    <aside
      className={`border-r border-orange-500/20 bg-white transition-all duration-100 ease-in-out backdrop-blur-xl
        ${isSidebarOpen ? "fixed top-20 left-0 w-full h-[calc(100vh-5rem)] z-50 block" : "hidden"}
        md:block md:sticky md:top-0 md:h-screen md:z-auto
        ${isSidebarOpen ? "md:w-96 w-full" : "md:w-20 w-0"}`}
    >
      <div className="flex flex-col h-full">
        <div className="items-center h-20 px-5 border-b border-orange-500/20 hidden md:flex">
          <Link
            href="/admin"
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-orange-600 to-orange-500 text-zinc-50 font-black text-xl shadow-lg shadow-orange-500/20">
              E
            </div>
            <div
              className={`ml-3 overflow-hidden transition-all duration-300 ${
                isSidebarOpen ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-orange-500 whitespace-nowrap">
                -commerce
              </span>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {AdminSidebarLinks.map((link) => {
            const isExpanded = expanded?.includes(link.title);
            const hasSubLink = link.subLinks?.length;
            const isActive =
              pathname === link.href ||
              link.subLinks?.some((sub) => sub.href === pathname);
            return (
              <div
                key={link.title}
                className="flex flex-col relative group/item"
              >
                {link.href && !hasSubLink ? (
                  <Link
                    href={link.href}
                    className={`flex items-center px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
                      ${isActive ? "bg-orange-500/10 text-orange-500" : "text-blue-600 hover:bg-blue-500/10 hover:text-blue-600"}
                      ${isSidebarOpen ? "gap-3" : "justify-center"}
                    `}
                  >
                    <link.icon
                      size={28}
                      strokeWidth={1.5}
                      className="shrink-0"
                    />
                    {isSidebarOpen && (
                      <span className="flex-1 text-base font-medium">
                        {link.title}
                      </span>
                    )}
                  </Link>
                ) : (
                  <div
                    onClick={() => {
                      if (!isSidebarOpen) toggleSidebar();
                      if (hasSubLink) toggleExpanded(link.title);
                    }}
                    className={`flex items-center px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
                      ${isActive ? "bg-blue-500/20 text-blue-600" : "text-blue-600 hover:bg-blue-500/10 hover:text-blue-600"}
                      ${isSidebarOpen ? "gap-3" : "justify-center"}
                    `}
                  >
                    <link.icon
                      size={28}
                      strokeWidth={1.5}
                      className="shrink-0"
                    />
                    {isSidebarOpen && (
                      <>
                        <span className="flex-1 text-base font-medium">
                          {link.title}
                        </span>
                        {hasSubLink && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </>
                    )}
                  </div>
                )}

                {isSidebarOpen && isExpanded && hasSubLink && (
                  <div className="ml-5 mt-1 mb-2 flex flex-col gap-1 pl-4 border-l-2 border-blue-500/20">
                    {link.subLinks?.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className={`py-2 text-sm transition-colors ${
                            isSubActive
                              ? "text-blue-600"
                              : "text-slate-400 hover:text-blue-600"
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
        </div>

        {/* ФУТЕР */}
        <div className="p-4 border-t border-orange-500/20 text-zinc-600">
          <Link
            href={"/"}
            className="hover:text-orange-500 hover:bg-orange-500/10 px-2 py-2 transition-colors rounded-lg"
          >
            Home
          </Link>
        </div>
      </div>
    </aside>
  );
}
