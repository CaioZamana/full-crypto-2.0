import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './IniciarSessao.module.css';

const IniciarSessao = () => {
  const [mostrarCard, setMostrarCard] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleCard = () => {
    setMostrarCard(!mostrarCard);
    setErrorMessage('');
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  const handleLoginOrCadastro = () => {
    if (isLogin) {
      if (!username || !password) {
        setErrorMessage('Preencha todos os campos.');
        return;
      }
      console.log('Autenticando usuário:', username, password);
    } else {
      if (!username || !password || !confirmPassword || !email) {
        setErrorMessage('Preencha todos os campos.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('As senhas não coincidem.');
        return;
      }
      console.log('Cadastrando usuário:', username, password, email);
    }
  };

  return (
    <div className={styles.container}>
      {/* O botão "Iniciar Sessão" sempre visível */}
      <button className={styles.openButton} onClick={toggleCard}>
        Iniciar Sessão
      </button>

      {/* Modal é exibido sobreposto */}
      {mostrarCard &&
        ReactDOM.createPortal(
          <div
            className={styles.iniciarSessaoCard}
            aria-modal="true"
            role="dialog"
          >
            <div className={styles.iniciarSessaoContent}>
              <button
                className={styles.iniciarSessaoCloseBtn}
                onClick={toggleCard}
                aria-label="Fechar"
              >
                Fechar
              </button>
              <div className={styles.iniciarSessaoFormContainer}>
                <h2>{isLogin ? 'Login' : 'Cadastre-se'}</h2>
                {errorMessage && (
                  <p className={styles.errorMessage}>{errorMessage}</p>
                )}
                <input
                  type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  aria-label="Usuário"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Senha"
                />
                {!isLogin && (
                  <>
                    <input
                      type="password"
                      placeholder="Confirmar Senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      aria-label="Confirmar Senha"
                    />
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="E-mail"
                    />
                  </>
                )}
                <button onClick={handleLoginOrCadastro}>
                  {isLogin ? 'Entrar' : 'Cadastrar'}
                </button>
                <p onClick={handleToggleForm}>
                  {isLogin
                    ? 'Não tem uma conta? Cadastre-se'
                    : 'Já tem uma conta? Faça login'}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default IniciarSessao;
