"use client";
import { useState } from "react";
import { Form } from "@/components/ui/form";
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
    e.preventDefault();
    try {
      console.log(form);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <Label>Senha:</Label>
          <Input
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
