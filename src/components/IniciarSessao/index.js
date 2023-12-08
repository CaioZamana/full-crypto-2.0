import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './IniciarSessao.css';

const IniciarSessao = () => {
  const [mostrarCard, setMostrarCard] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const toggleCard = () => {
    setMostrarCard(!mostrarCard);
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginOrCadastro = () => {
    if (isLogin) {
      console.log('Autenticando usuário:', username, password);
    } else {
      if (password === confirmPassword) {
        console.log('Cadastrando usuário:', username, password, email);
      } else {
        console.error('As senhas não coincidem.');
      }
    }
  };

  if (mostrarCard) {
    return ReactDOM.createPortal(
      <div className="iniciar-sessao-card">
        <div className="iniciar-sessao-content">
          <span className="iniciar-sessao-close-btn" onClick={toggleCard}>
            &times;
          </span>
          <div className="iniciar-sessao-form-container">
            <h2>{isLogin ? 'Login' : 'Cadastre-se'}</h2>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <>
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}
            <button onClick={handleLoginOrCadastro}>
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
            <p onClick={handleToggleForm}>
              {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
            </p>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  return (
    <div>
      <button onClick={toggleCard}>Iniciar Sessão</button>
    </div>
  );
};

export default IniciarSessao;
