"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import formatDate from "@/utils/formatDate";
import type { Projeto } from "@prisma/client";

export default function ProjectRow({ projeto }: { projeto: Projeto }) {
  return (
    <>
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
            <Badge variant="destructive">{projeto.mensagemBloqueio}</Badge>
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
          <Button>
            <Edit />
          </Button>
          {/* botão de deletar */}
          <Button variant="destructive">
            <Trash />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
