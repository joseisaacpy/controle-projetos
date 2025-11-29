import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/utils/formatDate";

export default async function Home() {
  const projetos = await prisma.projeto.findMany();
  return (
    <main className="p-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Lista de Projetos</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Identificador</TableHead>
              <TableHead className="text-right">Link do Projeto</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Mensagem Bloqueio</TableHead>
              <TableHead className="text-right">Criado em</TableHead>
              <TableHead className="text-right">Atualizado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projetos.map((projeto) => (
              <TableRow key={projeto.id}>
                <TableCell className="font-medium">{projeto.id}</TableCell>
                <TableCell>{projeto.nome}</TableCell>
                <TableCell>{projeto.identificador}</TableCell>
                <TableCell className="text-right">
                  <a href={projeto.linkProjeto} target="_blank">
                    {projeto.linkProjeto}
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  <Badge>{projeto.ativo ? "Ativo" : "Inativo"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge>{projeto.mensagemBloqueio || "Sem mensagem"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatDate(projeto.criadoEm)}
                </TableCell>
                <TableCell className="text-right">
                  {formatDate(projeto.atualizadoEm)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
