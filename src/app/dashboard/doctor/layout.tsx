import Doctor_Sidebar from "@/components/doctor/Doctor_Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Doctor_Sidebar */}
      <Doctor_Sidebar />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 py-8 px-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
