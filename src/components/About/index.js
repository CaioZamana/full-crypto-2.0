// About.js

import React from 'react';
import './About.css';
import Header from '../Header';
import Footer from '../Footer';

const About = () => {
    return (
        <div><Header />

            <div className="about">
                <div className="about-header">
                    <h1>Sobre Nós</h1>
                </div>

                <div className="about-content">
                    <p>
                        Bem-vindo ao nosso site! Somos uma equipe dedicada a fornecer informações valiosas sobre o mercado de Criptomoedas.
                    </p>

                    <p>
                        Nosso objetivo é oferecer conteúdo de qualidade para ajudar nossos visitantes a se manterem informados e atualizados.
                    </p>

                    <h2>Nossa Missão</h2>
                    <p>
                        Buscamos ser uma fonte confiável de informações, promovendo a educação e a compreensão em diversas áreas, desde tecnologia até finanças.
                    </p>

                    <h2>Nossa Equipe</h2>
                    <p>
                        Contamos com uma equipe apaixonada e experiente, comprometida em fornecer conteúdo relevante e útil.
                    </p>

                    <h2>Contato</h2>
                    <p>
                        Se você tiver alguma dúvida, sugestão ou quiser entrar em contato conosco, não hesite em nos enviar um e-mail para <a href="mailto:caiobzm@gmail.com">caiobzm@gmail.com</a>.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default About;
