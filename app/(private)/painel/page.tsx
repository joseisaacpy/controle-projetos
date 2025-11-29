import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import formatDate from "@/utils/formatDate";
import { Edit, Trash } from "lucide-react";

export default async function Home() {
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
            {projetos.map((projeto) => (
              <TableRow key={projeto.id}>
                <TableCell>{projeto.nome}</TableCell>
                <TableCell>{projeto.slug}</TableCell>
                <TableCell className="text-center">
                  <a
                    href={projeto.linkProjeto}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {projeto.linkProjeto}
                  </a>
                </TableCell>
                <TableCell className="text-center">
                  {/* se estiver ativo, mostrar badge verde, se estiver inativo, mostrar badge vermelho */}
                  {projeto.ativo ? (
                    <Badge className="bg-green-600">Ativo</Badge>
                  ) : (
                    <Badge variant="destructive">Inativo</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {/* se tem mensagem, mostrar badge vermelho, se não, mostrar badge
                  sem mensagem */}
                  {projeto.mensagemBloqueio ? (
                    <Badge variant="destructive">
                      {projeto.mensagemBloqueio}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Sem mensagem</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(projeto.criadoEm)}
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(projeto.atualizadoEm)}
                </TableCell>
                {/* célula de ações */}
                <TableCell className="text-center flex justify-center gap-1">
                  {/* botão de editar */}
                  <Tooltip>
                    <TooltipTrigger>
                      <Button>
                        <Edit />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar</p>
                    </TooltipContent>
                  </Tooltip>
                  {/* botão de deletar */}
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="destructive">
                        <Trash />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Deletar</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
