import Layout from "./layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h1 className="display-4 fw-bold text-primary">
          <i className="bi bi-check-circle-fill"></i> Gerenciador de Tarefas
        </h1>
        <p className="lead text-muted">
          Organize suas tarefas de forma simples e eficiente.
        </p>

        <div className="mt-4">
          <Link href="/login">
            <button className="btn btn-primary btn-lg me-3">
              Entrar
            </button>
          </Link>

          <Link href="/register">
            <button className="btn btn-outline-primary btn-lg">
              Cadastrar
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
