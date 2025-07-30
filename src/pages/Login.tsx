import { useState} from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css';

interface LoginProps {
  onLogin: (senha: string) => boolean;
  loggedIn: boolean;
}

export default function Login({ onLogin, loggedIn }: LoginProps) {
  const [senha, setSenha] = useState<string>("");
  const [erro, setErro] = useState<boolean>(false);
  const navigate = useNavigate();

  if (loggedIn) {
    return <Navigate to="/admin" />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onLogin(senha)) {
      navigate("/admin");
    } else {
      setErro(true);
    }
  };

  return (
    <div className="login">
      <h2>Login da Noiva</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {erro && <p style={{ color: "red" }}>Senha incorreta, tente novamente.</p>}
    </div>
  );
}
