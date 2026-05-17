import type { Metadata } from "next";
import { AnamaPage } from "@/components/anama/AnamaPage";

export const metadata: Metadata = {
  title: "Os Quatro de Anamá",
  description:
    "Cordel interativo para ouvir, gravar declamações e registrar observações sobre cada uma das 40 estrofes.",
};

export default function Page() {
  return <AnamaPage />;
}
