import React from "react";

export const metadata = {
  title: "Book Search App",
  description: "A simple book search app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
