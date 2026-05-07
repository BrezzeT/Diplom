import "../globals.css";
import Sidebar from "@/components/Admin/Sidebar/Sidebar";
import AdminHeader from "@/components/Header/AdminHeader";
export default function Admin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-white">
      <Sidebar />
      <div className="flex flex-col min-h-screen w-full bg-slate-50/50 transition-all duration-300 ease-in-out">
        <AdminHeader />
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-10 py-6 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
