import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';

// Cargar Stripe con la clave pública real
const stripePromise = loadStripe('pk_test_51RpdlPKAYgCa9QQzRaTyEtFRPI3WHssSF3UVhIC27kn4pjh9fQe2LXwLk8k29Gu2oB0fSJihxzT7RT34jWshklxh00h3l9LumZ');

const CheckoutForm = ({ reservaId, montoTotal, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Crear PaymentIntent cuando se monta el componente
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post('/api/pagos/create-payment-intent', {
          reservaId: reservaId,
          amount: Math.round(montoTotal * 100) // Convertir a centavos
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creando PaymentIntent:', error);
        onError('Error al inicializar el pago');
      }
    };

    if (reservaId && montoTotal) {
      createPaymentIntent();
    }
  }, [reservaId, montoTotal, onError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      }
    });

    if (error) {
      console.error('Error en el pago:', error);
      onError(error.message);
    } else {
      console.log('Pago exitoso:', paymentIntent);
      onSuccess(paymentIntent);
    }

    setIsLoading(false);
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Información de Pago</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tarjeta de Crédito o Débito
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardElement options={cardStyle} />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total a pagar:</span>
          <span className="text-xl font-bold text-blue-600">
            ${montoTotal?.toLocaleString('es-AR')}
          </span>
        </div>

        <button
          type="submit"
          disabled={!stripe || isLoading}
          className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-colors ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Procesando...' : `Pagar $${montoTotal?.toLocaleString('es-AR')}`}
        </button>
      </div>

      <div className="text-xs text-gray-500 text-center">
        <p>🔒 Tu información de pago está protegida con encriptación SSL</p>
        <p>Powered by Stripe</p>
      </div>
    </form>
  );
};

const StripeCheckout = ({ reservaId, montoTotal, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        reservaId={reservaId}
        montoTotal={montoTotal}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};

export default StripeCheckout;