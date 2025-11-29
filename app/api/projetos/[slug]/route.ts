import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// tipa o params da rota
type RouteParams = {
  params: {
    slug: string;
  };
};

// GET - pega um projeto pelo seu slug/identificador
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params; // no next, os parâmetros devem usar await
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
