import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET - pega um projeto pelo seu slug/identificador
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params; // no next, os parâmetros devem usar await
    const projeto = await prisma.projeto.findUnique({
      where: {
        slug: slug,
      },
    });
    if (!projeto) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(projeto, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao buscar o projeto" },
      { status: 500 }
    );
  }
}
