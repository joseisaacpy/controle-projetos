import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// define os cabeçalhos padrões do cors
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
// OPTIONS - resposta automática para CORS pré-flight
export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// GET - pega um projeto pelo seu slug/identificador
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params; // no next, os parâmetros devem usar await
    // pega o projeto
    const projeto = await prisma.projeto.findUnique({
      where: {
        slug: slug,
      },
    });
    // valida se o projeto foi encontrado
    if (!projeto) {
      return new NextResponse(
        JSON.stringify({ error: "Projeto não encontrado" }),
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    return new NextResponse(JSON.stringify(projeto), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Ocorreu um erro ao buscar o projeto" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// DELETE - deleta um projeto
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    // pega o projeto
    const projeto = await prisma.projeto.findUnique({
      where: {
        slug: slug,
      },
    });

    // valida se o projeto existe
    if (!projeto) {
      return new NextResponse(
        JSON.stringify({ error: "Projeto não encontrado" }),
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    // deleta o projeto
    await prisma.projeto.delete({
      where: {
        slug: slug,
      },
    });
    // retorna uma mensagem
    return NextResponse.json(
      {
        message: "Projeto deletado com sucesso",
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Ocorreu um erro ao deletar o projeto" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
