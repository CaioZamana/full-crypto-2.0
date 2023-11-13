import React from 'react';

// Componente News sem API
const News = () => {
  // Dados simulados de notícias
  const newsData = [
    {
      id: 1,
      title: 'React 18 lançado com novos recursos emocionantes',
      content: 'O React 18 foi lançado recentemente, introduzindo várias melhorias...',
    },
    {
      id: 2,
      title: 'Novo framework JavaScript ganhando popularidade',
      content: 'Um novo framework JavaScript está ganhando destaque na comunidade de desenvolvedores...',
    },
    {
      id: 3,
      title: 'Dicas para otimizar o desempenho do React',
      content: 'A otimização do desempenho é crucial ao desenvolver aplicativos React. Aqui estão algumas dicas...',
    },
  ];

  // Renderiza cada notícia
  const renderNews = () => {
    return newsData.map((newsItem) => (
      <div key={newsItem.id} className="news-item">
        <h3>{newsItem.title}</h3>
        <p>{newsItem.content}</p>
      </div>
    ));
  };

  return (
    <div>
      <h2>Últimas Notícias</h2>
      {renderNews()}
    </div>
  );
};

export default News;
