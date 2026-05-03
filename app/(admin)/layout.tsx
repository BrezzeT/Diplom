import "../globals.css";
import Sidebar from "@/components/Admin/Sidebar/Sidebar";
import AdminHeader from "@/components/Header/AdminHeader";
export default function Admin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col min-h-screen w-full bg-zinc-50 text-zinc-900 transition-all duration-300 ease-in-out">
        <AdminHeader />
        <div className="flex-1 px-2 md:px-12 mt-2 md:mt-6 container mx-auto mb-2 md:mb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
