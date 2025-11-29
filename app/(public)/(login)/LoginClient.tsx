"use client";
import { useState } from "react";
// import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginClient() {
  // estado para controlar o formulário
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  // função para logar
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // previne o comportamento padrão do formulário
    e.preventDefault();
    try {
      // valida se os campos foram preenchidos
      if (!form.email || !form.senha) {
        toast.error("Preencha todos os campos");
        return;
      }
      // faz a requisição para o backend
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      // verifica se a requisição foi bem sucedida
      if (!response.ok) {
        toast.error(data.error || "Erro ao fazer login");
        return;
      }

      // se a requisição foi bem sucedida
      toast.success("Login realizado com sucesso");

      // redireciona para o painel
      window.location.href = "/painel";
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer login");
    }
  };
  return (
    <section className="section">
      <h1 className="heading-primary">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-group">
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <Label htmlFor="senha">Senha:</Label>
          <Input
            id="senha"
            type="password"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </section>
  );
}
