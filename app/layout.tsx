import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Os Quatro de Anamá",
  description:
    "Cordel interativo para ouvir, gravar declamações e registrar observações sobre cada uma das 40 estrofes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
