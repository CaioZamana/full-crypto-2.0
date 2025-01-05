import React from 'react';
import styles from './About.module.css'; // CSS Modules
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const About = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.intro}>
          <h1 className={styles.title}>Sobre Nós</h1>
          <p className={styles.subtitle}>
            Sua fonte confiável de informações sobre o mundo das criptomoedas.
          </p>
        </section>

        <section className={styles.content}>
          <h2 className={styles.sectionTitle}>Bem-vindo ao Nosso Universo</h2>
          <p>
            Estamos comprometidos em fornecer informações detalhadas, atualizadas e acessíveis sobre o mercado de criptomoedas. Nossa missão é educar, informar e inspirar, permitindo que nossos visitantes tomem decisões informadas no mundo das finanças digitais.
          </p>

          <h2 className={styles.sectionTitle}>Nossa Missão</h2>
          <p>
            Promover o conhecimento e a compreensão das criptomoedas e tecnologias emergentes, tornando o mundo financeiro mais acessível a todos. Valorizamos a confiança e nos esforçamos para ser um guia confiável neste ecossistema dinâmico.
          </p>

          <h2 className={styles.sectionTitle}>Nossa Equipe</h2>
          <p>
            Nossa equipe é formada por profissionais apaixonados por tecnologia, economia e inovação. Trabalhamos juntos para oferecer uma experiência de alta qualidade e manter nossos conteúdos relevantes, confiáveis e alinhados às suas necessidades.
          </p>

          <h2 className={styles.sectionTitle}>Entre em Contato</h2>
          <p>
            Gostaríamos de ouvir você! Caso tenha dúvidas, sugestões ou apenas queira dizer "olá", envie um e-mail para:
          </p>
          <p>
            <a href="mailto:caiobzm@gmail.com" className={styles.email}>
              caiobzm@gmail.com
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
