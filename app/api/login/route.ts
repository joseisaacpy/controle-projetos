import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    // pega as credenciais do body
    const { email, senha } = await request.json();

    // pega as credenciais no env
    const envEmail = process.env.EMAIL_USER || "teste@gmail.com";
    const emailsValidos = [envEmail, "teste@gmail.com"];
    const envSenha = process.env.HASH_PASSWORD!; // o ! indica que a variável é obrigatória e não pode ser nula ou undefined
    const jwtSecret = process.env.JWT_SECRET!;

    // pega o cookie
    const cookieStore = cookies();

    // valida se email e senha foram enviado
    if (!email || !senha) {
      return NextResponse.json(
        { error: "Email ou senha não informados" },
        { status: 400 }
      );
    }

    // valida o email
    if (!emailsValidos.includes(email)) {
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

    // Gera token JWT
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "2d" });

    // Salva cookie
    (await cookieStore).set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 dias
    });

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
