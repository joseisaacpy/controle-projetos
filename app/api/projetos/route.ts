import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - pega todos os projetos
export default async function GET() {
  try {
    const projetos = await prisma.projeto.findMany();
    // se não houver projetos, retorna array vazio
    if (projetos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json(projetos, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao buscar os projetos" },
      { status: 500 }
    );
  }
}
