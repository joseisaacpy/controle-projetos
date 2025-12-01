export type Projeto = {
  id: number;
  nome: string;
  slug: string;
  linkProjeto: string;
  ativo: boolean;
  mensagemBloqueio: string | null;
  criadoEm: Date;
  atualizadoEm: Date;
};
