package com.reservapp.service;

import com.reservapp.entity.Reserva;
import com.reservapp.repository.ReservaRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Value("${stripe.publishable.key}")
    private String stripePublishableKey;

    /**
     * Crea un Payment Intent para procesar el pago
     */
    public PaymentIntent createPaymentIntent(Reserva reserva) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (reserva.getMontoTotal() * 100)) // Stripe usa centavos
                .setCurrency("usd")
                .setDescription("Reserva de cancha - " + reserva.getCancha().getNombre())
                .putMetadata("reserva_id", reserva.getId().toString())
                .putMetadata("usuario_id", reserva.getUsuario().getId().toString())
                .putMetadata("cancha_id", reserva.getCancha().getId().toString())
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        
        // Guardar el Payment Intent ID en la reserva
        reserva.setStripePaymentIntentId(paymentIntent.getId());
        reservaRepository.save(reserva);
        
        return paymentIntent;
    }

    /**
     * Crea una sesión de Checkout para el pago
     */
    public Session createCheckoutSession(Reserva reserva, String successUrl, String cancelUrl) throws StripeException {
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(cancelUrl)
                .addLineItem(
                    SessionCreateParams.LineItem.builder()
                        .setPriceData(
                            SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setProductData(
                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Reserva de " + reserva.getCancha().getNombre())
                                        .setDescription("Reserva para " + reserva.getFechaHoraInicio().toString())
                                        .build()
                                )
                                .setUnitAmount((long) (reserva.getMontoTotal() * 100))
                                .build()
                        )
                        .setQuantity(1L)
                        .build()
                )
                .putMetadata("reserva_id", reserva.getId().toString())
                .putMetadata("usuario_id", reserva.getUsuario().getId().toString())
                .build();

        Session session = Session.create(params);
        
        // Guardar el Session ID en la reserva
        reserva.setStripeSessionId(session.getId());
        reservaRepository.save(reserva);
        
        return session;
    }

    /**
     * Confirma el pago y actualiza el estado de la reserva
     */
    public void confirmarPago(String paymentIntentId) throws StripeException {
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        
        if ("succeeded".equals(paymentIntent.getStatus())) {
            Reserva reserva = reservaRepository.findByStripePaymentIntentId(paymentIntentId)
                    .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
            
            reserva.setEstadoPago(Reserva.EstadoPago.PAGADO);
            reserva.setEstado(Reserva.EstadoReserva.CONFIRMADA);
            reservaRepository.save(reserva);
        }
    }

    /**
     * Confirma el pago desde una sesión de checkout
     */
    public void confirmarPagoDesdeSession(String sessionId) throws StripeException {
        Session session = Session.retrieve(sessionId);
        
        if ("complete".equals(session.getStatus()) && "paid".equals(session.getPaymentStatus())) {
            Reserva reserva = reservaRepository.findByStripeSessionId(sessionId)
                    .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
            
            reserva.setEstadoPago(Reserva.EstadoPago.PAGADO);
            reserva.setEstado(Reserva.EstadoReserva.CONFIRMADA);
            reservaRepository.save(reserva);
        }
    }

    /**
     * Obtiene la clave pública de Stripe para el frontend
     */
    public String getPublishableKey() {
        return stripePublishableKey;
    }

    /**
     * Crea un mapa con la información del cliente para Stripe
     */
    public Map<String, Object> createPaymentResponse(PaymentIntent paymentIntent) {
        Map<String, Object> response = new HashMap<>();
        response.put("clientSecret", paymentIntent.getClientSecret());
        response.put("paymentIntentId", paymentIntent.getId());
        response.put("publishableKey", stripePublishableKey);
        return response;
    }
}