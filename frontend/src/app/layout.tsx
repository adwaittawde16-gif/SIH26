import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/shared/Sidebar";
import { TacticalCommandBar } from "@/components/shared/TacticalCommandBar";
import { AICopilotDrawer } from "@/components/shared/AICopilotDrawer";
import { NavProvider } from "@/components/shared/NavContext";

export const metadata: Metadata = {
  title: "Mumbai Police Intelligence Platform — NETSENTINEL v2.4",
  description: "Tactical Police Intelligence & Multi-Modal Crime Network Forensics Platform for Brihanmumbai Police Department.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark-theme">
      <body className="bg-slate-950 text-slate-100 flex min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <NavProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
            <TacticalCommandBar />
            <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 max-w-[1700px] w-full mx-auto space-y-6">
              {children}
            </main>
          </div>
          <AICopilotDrawer />
        </NavProvider>
      </body>
    </html>
  );
}

