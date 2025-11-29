import { AlertTriangle } from "lucide-react";

type PageBlockProps = {
  mensagem: string | null;
};

export default function PageBlock({ mensagem }: PageBlockProps) {
  return (
    <section
      className="
      fixed inset-0 z-9999
      flex flex-col items-center justify-center
      bg-black/70 backdrop-blur-md
    "
    >
      <div className="p-8 rounded-xl bg-white/10 border border-white/20 shadow-xl backdrop-blur-xl max-w-lg mx-4 text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-300 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,255,0,1)]" />

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
          Acesso Bloqueado
        </h1>

        <p className="text-white text-lg leading-relaxed">
          {mensagem || "Este projeto está temporariamente indisponível."}
        </p>
      </div>
    </section>
  );
}
