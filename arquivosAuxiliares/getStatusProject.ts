type StatusProjectProps = {
  ativo: boolean;
  mensagemBloqueio: string | null;
};

export default async function getStatusProject(): Promise<StatusProjectProps> {
  try {
    // slug do projeto
    const slug = "nome-do-slug-do-projeto";
    // faz a requisição
    const res = await fetch(
      `https://controle-projetos-ten.vercel.app/api/projetos/${slug}`,
      { cache: "no-store" }
    );
    // caso a requisição falhe
    if (!res.ok) throw new Error("Erro ao buscar status do projeto");
    // pega a resposta da requisição em json
    const data = await res.json();
    return { ativo: data.ativo, mensagemBloqueio: data.mensagemBloqueio };
  } catch (error) {
    console.error(error);
    return { ativo: false, mensagemBloqueio: null };
  }
}
