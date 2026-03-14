import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Algo deu errado.</h2>
            <p>Por favor, recarregue a página e tente novamente.</p>
            <button onClick={() => window.location.reload()}>Recarregar</button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
