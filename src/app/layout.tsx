import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";
import PremiumDialog from "@/components/PremiumDialog";

const font = Roboto({
  weight: ["500", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SyncSpace",
    absolute: "SyncSpace",
  },
  description: "Collaborate with others and work together in real time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#3371FF",
            fontSize: "16px",
          },
        }}
      >
        <body className={`${font.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Provider>
              {children}
              <PremiumDialog /> <Toaster />{" "}
            </Provider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
