import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { auth } from "./_lib/auth";
import { ToastContainer } from "react-toastify";
import { MessageProvider } from "./_contexts/MessageContext";

import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real, estate",
  description: "Find the perfect rental property",
};

const MainLayout = async ({ children }) => {
  const session = await auth();

  return (
    <html>
      <body>
        <MessageProvider>
          <Navbar session={session} />
          <main>{children}</main>
          <Footer />
          <ToastContainer autoClose={2000} />
        </MessageProvider>
      </body>
    </html>
  );
};

export default MainLayout;
