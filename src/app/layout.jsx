import Navbar from "@/components/Navbar";
import "./globals.css";
import Provider from "../context/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import { GlobalProvider } from "@/context/GlobalContext";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real state",
  description: "Find the perfect rental property",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider>
          <GlobalProvider>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </GlobalProvider>
        </Provider>
      </body>
    </html>
  );
}
