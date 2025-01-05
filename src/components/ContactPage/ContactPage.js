import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './ContactPage.module.css'; // CSS Modules

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.contactSection}>
          <h1 className={styles.title}>Entre em Contato</h1>
          <p className={styles.description}>
            Estamos disponíveis para parcerias, anúncios ou esclarecer dúvidas. Entre em contato conosco pelo e-mail:
          </p>
          <p className={styles.email}>
            <a href="mailto:caiobzm@gmail.com" className={styles.emailLink}>
              caiobzm@gmail.com
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
