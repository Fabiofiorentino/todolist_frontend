"use client";

import { useRouter } from "next/navigation";
import authService from "@/src/services/authService";
import AuthForm from "@/src/components/AuthForm";

const Register = () => {
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    const response = await authService.register(email, password);
    console.log('register', response);
    router.push("/login");
  };

  return <AuthForm title="Criar Conta" buttonText="Registrar" onSubmit={handleRegister} />;
};

export default Register;
