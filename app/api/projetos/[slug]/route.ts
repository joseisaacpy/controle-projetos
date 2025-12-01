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
      return new NextResponse(
        JSON.stringify({ error: "Projeto não encontrado" }),
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    return new NextResponse(JSON.stringify(projeto), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Ocorreu um erro ao buscar o projeto" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
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
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Ocorreu um erro ao deletar o projeto" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
