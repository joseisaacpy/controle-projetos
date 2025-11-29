import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // pega as credenciais do body
    const { email, senha } = await request.json();

    // pega as credenciais no env
    const envEmail = process.env.EMAIL_USER;
    const envSenha = process.env.HASH_PASSWORD!; // o ! indica que a variável é obrigatória e não pode ser nula ou undefined

    // valida se email e senha foram enviado
    if (!email || !senha) {
      return NextResponse.json(
        { error: "Email ou senha não informados" },
        { status: 400 }
      );
    }

    // valida o email
    if (email !== envEmail) {
      return NextResponse.json(
        { error: "Email ou senha invalidos" },
        { status: 400 }
      );
    }

    // compara a senha do body com a senha do env e retorna um booleano
    const senhaValida = await bcrypt.compare(senha, envSenha);

    // valida a senha
    if (!senhaValida) {
      return NextResponse.json(
        { success: false, message: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    // retorna uma mensagem de sucesso
    return NextResponse.json(
      { success: true, message: "Login realizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
