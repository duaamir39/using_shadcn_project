// app/layout.tsx
import "./globals.css";
import { ReduxProvider } from "@/store/store";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <ReduxProvider>
          <Navbar />
          <main className="p-0">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
