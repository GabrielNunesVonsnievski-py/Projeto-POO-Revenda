import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios";
import "./App.css";


function App() {
  const [user, setUser] = useState({
    nome: "",
    login: "",
    senha: "",
  });
  function inserirUsuario() {
    axios.post("http:localhost:3000/usuarios", {
      body: {
        nome: user.nome,
        login: user.login,
        senha: user.senha,
      },
      header: {
        "Content-Type": "Application/Json",
      },
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          id="nome"
          value={user.nome}
          placeholder="Nome"
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
        />
        <br></br>
        <input
          type="text"
          id="login"
          value={user.login}
          placeholder="Login"
          onChange={(e) => setUser({ ...user, login: e.target.value })}
        />
        <br></br>
        <input
          type="text"
          id="senha"
          value={user.senha}
          placeholder="Senha"
          onChange={(e) =>
            setUser({ ...user, senha: parseInt(e.target.value) })
          }
        />
        <br></br>
        <button style={{backgroundColor: '#E1C7C1'}} onClick={() => inserirUsuario()}>
          Inserir Cliente
        </button>
      </div>

    </>
  )
}

export default App;