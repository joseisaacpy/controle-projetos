"use client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";

export default function LoginClient() {
  // estado para controlar o formulário
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });
  // estado para controlar visualização da senha
  const [showPassword, setShowPassword] = useState(false);

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
      window.location.href = "/projetos";
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer login");
    }
  };
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 w-full"
        >
          <div className="flex flex-row items-center justify-baseline gap-4">
            <Image
              src="/assets/images/dev-jose.webp"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <h1 className="heading-primary-not-m">Login</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais para acessar o painel.
          </p>
          <div className="form-group">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              placeholder="Digite seu email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <Label htmlFor="senha">Senha:</Label>
            <div className="relative">
              <Input
                className="relative"
                id="senha"
                type={showPassword ? "text" : "password"}
                value={form.senha}
                placeholder="Digite sua senha"
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
              />
              <Button
                className="absolute right-0"
                type="button"
                variant="link"
                onClick={() => {
                  console.log(showPassword);
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </Button>
            </div>
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
      {/* section da imagem */}
      <section className="relative hidden md:flex items-center justify-center">
        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-transparent"></div>
        {/* texto */}
        <div className="absolute flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Bem-vindo de volta!
          </h1>
        </div>
        {/* imagem */}
        <Image
          src="/assets/images/login.png"
          alt="Login"
          width={500}
          height={500}
          className="w-full h-[calc(100vh-50px)] object-cover"
        />
      </section>
    </section>
  );
}
