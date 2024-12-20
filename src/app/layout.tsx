'use client';
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";



const Layout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en" className="text-black">
      <body>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider>
          {/* Optional: Show a loading indicator while Clerk is loading */}
          <ClerkLoading>
            <div>Loading...</div>
          </ClerkLoading>

          {/* Optional: Show content when Clerk is fully loaded */}
          <ClerkLoaded>
            {children}
          </ClerkLoaded>
        </ClerkProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
};

export default Layout;