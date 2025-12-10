import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// rota para redicionar quando o usuario não estiver logado
const REDIRECIONAR_QUANDO_NAO_LOGADO = "/";

const rotasPublicas = [
  {
    caminho: "/",
    quandoAutenticado: "redirect",
  },
  {
    caminho: "/register",
    quandoAutenticado: "redirect",
  },
] as const;

export function proxy(request: NextRequest) {
  // pega o caminho
  const path = request.nextUrl.pathname;
  // rotas publicas
  const rotaPublica = rotasPublicas.find((rota) => rota.caminho === path);

  // pega o token
  const token = request.cookies.get("token")?.value;

  // se o token não existir e for uma rota publica
  if (!token && rotaPublica) {
    // next
    return NextResponse.next();
  }

  // se o token não existir e não for uma rota publica
  if (!token && !rotaPublica) {
    // redireciona para a rota de login
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = REDIRECIONAR_QUANDO_NAO_LOGADO;
    return NextResponse.redirect(redirectURL);
  }
  // se o token existir e for uma rota publica
  if (token && rotaPublica?.quandoAutenticado === "redirect") {
    // redireciona para a rota de dashboard
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = "/projetos";
    return NextResponse.redirect(redirectURL);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(png|jpg|jpeg|gif|svg|webp)$).*)",
  ],
};
