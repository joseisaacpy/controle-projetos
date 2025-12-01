import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProjectRow from "@/components/ProjectRow";

export default async function Home() {
  // busca todos os projetos do banco
  const projetos = await prisma.projeto.findMany();
  return (
    <main className="p-6">
      <section className="">
        <h1 className="heading-primary">Lista de Projetos</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Identificador</TableHead>
              <TableHead className="text-center">Link do Projeto</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Mensagem Bloqueio</TableHead>
              <TableHead className="text-center">Criado em</TableHead>
              <TableHead className="text-center">Atualizado em</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* renderiza os projetos na tabela usando o componente ProjectRow */}
            {projetos.map((projeto) => (
              <ProjectRow key={projeto.id} projeto={projeto} />
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
