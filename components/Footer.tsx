export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 text-center">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-around text-sm">
        <p>
          © {new Date().getFullYear()} José Isaac. Todos os direitos reservados.
        </p>
        <p className="mt-2 md:mt-0">
          Desenvolvido por{" "}
          <span className="text-white font-medium">
            <a href="https://github.com/joseisaacpy">José Isaac</a>
          </span>
        </p>
      </div>
    </footer>
  );
}
