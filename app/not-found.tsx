import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold">
        404 - Página Não Encontrada
      </h1>
      <p className="text-gray-600 text-lg md:text-xl">
        A página que você procura não existe ou foi removida.
      </p>
      <Link href="/">
        <Button className="mt-4 px-6 py-3">Voltar para a página inicial</Button>
      </Link>
    </section>
  );
}
