"use client";

import { useRouter } from "next/navigation";
import authService from "@/src/services/authService";
import AuthForm from "@/src/components/AuthForm";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    console.log("login", response.data);
    router.push("/tasks");
  };

  return <AuthForm title="Login" buttonText="Entrar" onSubmit={handleLogin} />;
};

export default Login;
