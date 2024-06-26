export const metadata = {
  title: "Book Search App",
  description: "A simple book search app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
