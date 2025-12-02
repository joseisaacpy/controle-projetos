"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formatDate from "@/utils/formatDate";
import { Edit, Trash } from "lucide-react";
import type { Projeto } from "@/types/projeto";
import { toast } from "sonner";

export default function ProjectRow({ projeto }: { projeto: Projeto }) {
  // use router
  const router = useRouter();

  // url da api
  const API_URL = "/api/projetos";

  // estado para controlar o formulário
  const [form, setForm] = useState({
    nome: projeto.nome,
    slug: projeto.slug,
    linkProjeto: projeto.linkProjeto,
    ativo: projeto.ativo,
    mensagemBloqueio: projeto.mensagemBloqueio ?? "",
  });
  // função para deletar um projeto
  async function handleDelete() {
    try {
      const response = await fetch(`${API_URL}/${projeto.slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar projeto");
      }
      toast.success("Projeto deletado com sucesso");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar projeto");
    }
  }
  // função para editar um projeto
  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${projeto.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar projeto");
      }
      toast.success("Projeto editado com sucesso");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao editar projeto");
    }
  }
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
          {/* se tem mensagem, mostrar badge vermelho, se não, mostrar badge sem mensagem */}
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
          {/* modal de edição */}
          <Dialog>
            {/* trigger */}
            <DialogTrigger asChild>
              {/* botão que abre o modal */}
              <Button>
                <Edit />
              </Button>
            </DialogTrigger>
            {/* conteúdo do modal */}
            <DialogContent>
              <form onSubmit={handleEdit} className="space-y-5">
                {/* header */}
                <DialogHeader>
                  <DialogTitle>Editar Projeto</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="form-group">
                    <Label>Nome</Label>
                    <Input
                      value={form.nome}
                      onChange={(e) =>
                        setForm({ ...form, nome: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <Label>Slug</Label>
                    <Input
                      value={form.slug}
                      onChange={(e) =>
                        setForm({ ...form, slug: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <Label>Link</Label>
                    <Input
                      value={form.linkProjeto}
                      onChange={(e) =>
                        setForm({ ...form, linkProjeto: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <Label>Status</Label>
                    <Select
                      value={form.ativo ? "ativo" : "inativo"}
                      onValueChange={(value) =>
                        setForm({ ...form, ativo: value === "ativo" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Label>Mensagem de bloqueio</Label>
                    <Input
                      value={form.mensagemBloqueio}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          mensagemBloqueio: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {/* botão de deletar */}
          <Button variant="destructive" onClick={handleDelete}>
            <Trash />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
