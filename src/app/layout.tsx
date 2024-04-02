import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "./utils/providers";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars Heroes",
  description: "Star Wars Heroes List",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={roboto.className}>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
