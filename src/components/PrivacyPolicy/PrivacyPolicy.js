import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './PrivacyPolicy.module.css'; // CSS para estilização

const PrivacyPolicy = () => {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <section className={styles.content}>
                    <h1 className={styles.title}>Política de Privacidade</h1>

                    <p className={styles.intro}>
                        Bem-vindo à nossa Política de Privacidade. Sua privacidade é muito importante para nós.
                        Este documento explica como coletamos, usamos e protegemos suas informações pessoais ao usar
                        nosso site. Leia atentamente para entender nossas práticas.
                    </p>

                    <h2 className={styles.sectionTitle}>1. Coleta de Informações</h2>
                    <p className={styles.text}>
                        Nosso site não coleta informações pessoais dos usuários. Todas as informações geradas durante
                        a utilização do site são armazenadas localmente no dispositivo do usuário, utilizando o
                        <strong> localStorage</strong>. Isso significa que nenhuma informação é transmitida para nossos
                        servidores ou terceiros.
                    </p>

                    <h2 className={styles.sectionTitle}>2. Uso de Informações</h2>
                    <p className={styles.text}>
                        As informações armazenadas localmente no <strong>localStorage</strong> são utilizadas
                        exclusivamente para melhorar sua experiência no site, permitindo que suas preferências sejam
                        preservadas. Essas informações não são compartilhadas, processadas ou analisadas por
                        terceiros.
                    </p>

                    <h2 className={styles.sectionTitle}>3. Segurança do Site</h2>
                    <p className={styles.text}>
                        Prezamos pela segurança dos dados dos usuários. Nosso site é desenvolvido para ser
                        estático e seguro. Isso significa que todas as informações são armazenadas localmente
                        e nunca transitam pela rede, minimizando o risco de vazamentos ou acessos não autorizados.
                    </p>

                    <h2 className={styles.sectionTitle}>4. Cookies e Tecnologias Similares</h2>
                    <p className={styles.text}>
                        Este site não utiliza cookies ou outras tecnologias de rastreamento. Toda a funcionalidade
                        é baseada em armazenamento local (localStorage) e executada no dispositivo do usuário.
                    </p>

                    <h2 className={styles.sectionTitle}>5. Alterações na Política de Privacidade</h2>
                    <p className={styles.text}>
                        Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em
                        nossas práticas ou na legislação aplicável. Recomendamos que os usuários revisem esta
                        política regularmente para se manterem informados sobre como protegemos suas informações.
                        A data da última atualização será indicada no final deste documento.
                    </p>

                    <h2 className={styles.sectionTitle}>6. Seus Direitos</h2>
                    <p className={styles.text}>
                        Embora nosso site não colete informações pessoais, incentivamos nossos usuários a exercerem
                        seus direitos de privacidade em outros serviços e plataformas. Isso inclui o direito de
                        acessar, corrigir e excluir informações pessoais quando aplicável.
                    </p>

                    <h2 className={styles.sectionTitle}>7. Contato</h2>
                    <p className={styles.text}>
                        Se você tiver dúvidas, sugestões ou preocupações relacionadas à nossa Política de Privacidade,
                        entre em contato conosco através do seguinte e-mail: <strong>caiobzm@gmail.com</strong>.
                        Estamos à disposição para esclarecer quaisquer questões.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
