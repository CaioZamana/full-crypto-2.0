import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

const PrivacyPolicy = () => {
    return (
        <div>
            <Header />
            <h1>Política de Privacidade</h1>

            <p>
                Esta política de privacidade descreve como tratamos as informações pessoais coletadas durante
                o uso deste site.
            </p>

            <h2>1. Coleta de Informações</h2>
            <p>
                Não coletamos nenhuma informação pessoal dos usuários. Este site é seguro e estático,
                o que significa que todas as informações permanecem no dispositivo do usuário no
                localStorage.
            </p>

            <h2>2. Uso de Informações</h2>
            <p>
                Não utilizamos as informações do usuário coletadas localmente no localStorage.
                Este site é estático e seguro, e todas as operações são executadas no próprio dispositivo
                da pessoa.
            </p>

            <h2>3. Segurança do Site</h2>
            <p>
                Este site é projetado com segurança em mente. Todas as informações são armazenadas
                localmente no dispositivo da pessoa, e não há transmissão de dados sensíveis pela rede.
            </p>

            <h2>4. Alterações na Política de Privacidade</h2>
            <p>
                Reservamo-nos o direito de fazer alterações nesta política de privacidade a qualquer momento.
                As alterações serão efetivas imediatamente após a publicação da política de privacidade atualizada
                neste site.
            </p>

            <h2>5. Contato</h2>
            <p>
                Se você tiver dúvidas sobre esta política de privacidade, entre em contato via e-mail:
                <a href="mailto:caiobzm@gmail.com">caiobzm@gmail.com</a>.
            </p>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
