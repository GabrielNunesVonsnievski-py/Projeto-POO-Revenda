import React, { useState } from 'react'; 
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState({
    codigo: '',
    nome: '',   
    login: '',
    senha: '',
  });

  const [loginUser, setLoginUser] = useState({
    login: '',
    senha: ''
  });

  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null); // Estado para armazenar o usuário logado

  function inserirUsuario(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/usuario', {
      codigo: user.codigo,
      nome: user.nome,
      login: user.login,
      senha: user.senha
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setMessage('Usuário cadastrado com sucesso!');
    }).catch(error => {
      setMessage('Erro ao cadastrar usuário.');
    });
  }

  function loginUsuario(e) {
    e.preventDefault();
    axios.get(`http://localhost:3000/usuario?login=${loginUser.login}&senha=${loginUser.senha}`)
      .then(response => {
        if (response.data.length > 0) {
          const foundUser = response.data[0];
          setLoggedInUser(foundUser); // Atualiza o estado com as informações do usuário logado
          setMessage(`Olá ${foundUser.nome}`);
        } else {
          setMessage('Login ou senha incorretos.');
        }
      })
      .catch(error => {
        setMessage('Erro ao realizar login.');
      });
  }

  function excluirUsuario(e) {
    e.preventDefault();
    axios.delete(`http://localhost:3000/usuario/${user.codigo}`)
      .then(response => {
        setMessage('Usuário excluído com sucesso!');
      })
      .catch(error => {
        setMessage('Erro ao excluir usuário.');
      });
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={inserirUsuario}>
        <h2><center>CADASTRO</center></h2>
        <input
          placeholder='Código: '
          type="text"
          value={user.codigo}
          onChange={(e) => setUser({...user, codigo: e.target.value})}
        />
        <br />
        <input
          placeholder='Nome: '
          type="text"
          value={user.nome}
          onChange={(e) => setUser({...user, nome: e.target.value})}
        />
        <br />
        <input
          placeholder='Login: '
          type="text"
          value={user.login}
          onChange={(e) => setUser({...user, login: e.target.value})}
        />
        <br />
        <input
          placeholder='Senha: '
          type="text"
          value={user.senha}
          onChange={(e) => setUser({...user, senha: e.target.value})}
        />
        <br /><br />
        <button type="submit">Inserir Cadastro</button>
      </form>
      <br /><br />
      <form className="login-form" onSubmit={loginUsuario}>
        <h2><center>LOGIN</center></h2>
        <input
          placeholder='Login: '
          type="text"
          value={loginUser.login}
          onChange={(e) => setLoginUser({...loginUser, login: e.target.value})}
        />
        <br />
        <input
          placeholder='Senha: '
          type="text"
          value={loginUser.senha}
          onChange={(e) => setLoginUser({...loginUser, senha: e.target.value})}
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      {loggedInUser && (
        <div>
          <h2>Informações do Usuário Logado</h2>
          <p>Código: {loggedInUser.codigo}</p>
          <p>Nome: {loggedInUser.nome}</p>
          <p>Login: {loggedInUser.login}</p>
        </div>
      )}
      <br></br>
      <form className="login-form" onSubmit={excluirUsuario}>
        <h2><center>EXCLUIR USUÁRIO</center></h2>
        <input
          placeholder='Código: '
          type="text"
          value={user.codigo}
          onChange={(e) => setUser({...user, codigo: e.target.value})}
        />
        <br /><br />
        <button type="submit">Excluir Usuário</button>
      </form>
    </div>
  );
};

export default Login;