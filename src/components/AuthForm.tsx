"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Container, Alert, Card } from "react-bootstrap";
import ButtonComponent from "./Button";

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => Promise<void>;
}

const AuthForm = ({ title, buttonText, onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores
    try {
      await onSubmit(email, password);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao processar requisição.";
      setError(errorMessage);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">{title}</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </Form.Group>

          <ButtonComponent text={buttonText} variant="primary" type="submit" color="white" className="w-100" />
          <ButtonComponent text="Voltar" variant="secondary" className="w-100 mt-2" onClick={() => router.push("/")} />
        </Form>
      </Card>
    </Container>
  );
};

export default AuthForm;
