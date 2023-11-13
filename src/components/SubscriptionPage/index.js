import React, { useState } from 'react';

const SubscriptionPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('basic');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    // Aqui você poderia enviar os dados do usuário para o seu servidor
    // para processar a assinatura. Este é apenas um exemplo simulado.
    // Normalmente, você usaria uma solicitação HTTP (por exemplo, axios).

    // Simulação de uma requisição assíncrona (substitua por sua lógica real)
    setTimeout(() => {
      setIsSubscribed(true);
    }, 2000);
  };

  return (
    <div>
      <h2>Subscription Page</h2>

      {isSubscribed ? (
        <div>
          <h3>Thank you for subscribing, {name}!</h3>
          <p>You will receive a confirmation email at {email} shortly.</p>
        </div>
      ) : (
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <br />

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <br />

          <label>
            Subscription Plan:
            <select
              value={subscriptionPlan}
              onChange={(e) => setSubscriptionPlan(e.target.value)}
            >
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </label>

          <br />

          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
