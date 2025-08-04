package com.reservapp.controller;

import com.reservapp.entity.Reserva;
import com.reservapp.repository.ReservaRepository;
import com.reservapp.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private ReservaRepository reservaRepository;

    /**
     * Crea un Payment Intent para una reserva
     */
    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> request) {
        try {
            Long reservaId = Long.valueOf(request.get("reservaId").toString());
            
            Reserva reserva = reservaRepository.findById(reservaId)
                    .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

            PaymentIntent paymentIntent = stripeService.createPaymentIntent(reserva);
            
            return ResponseEntity.ok(stripeService.createPaymentResponse(paymentIntent));
            
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al crear el pago: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Crea una sesión de Checkout
     */
    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody Map<String, Object> request) {
        try {
            Long reservaId = Long.valueOf(request.get("reservaId").toString());
            String successUrl = request.get("successUrl").toString();
            String cancelUrl = request.get("cancelUrl").toString();
            
            Reserva reserva = reservaRepository.findById(reservaId)
                    .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

            Session session = stripeService.createCheckoutSession(reserva, successUrl, cancelUrl);
            
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", session.getId());
            response.put("url", session.getUrl());
            response.put("publishableKey", stripeService.getPublishableKey());
            
            return ResponseEntity.ok(response);
            
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al crear la sesión de pago: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Confirma el pago después de completar el Payment Intent
     */
    @PostMapping("/confirm-payment")
    public ResponseEntity<?> confirmPayment(@RequestBody Map<String, String> request) {
        try {
            String paymentIntentId = request.get("paymentIntentId");
            
            stripeService.confirmarPago(paymentIntentId);
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Pago confirmado exitosamente");
            
            return ResponseEntity.ok(response);
            
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al confirmar el pago: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Confirma el pago desde una sesión de checkout
     */
    @PostMapping("/confirm-checkout")
    public ResponseEntity<?> confirmCheckout(@RequestBody Map<String, String> request) {
        try {
            String sessionId = request.get("sessionId");
            
            stripeService.confirmarPagoDesdeSession(sessionId);
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Pago confirmado exitosamente");
            
            return ResponseEntity.ok(response);
            
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al confirmar el pago: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Obtiene la clave pública de Stripe
     */
    @GetMapping("/config")
    public ResponseEntity<?> getStripeConfig() {
        Map<String, String> config = new HashMap<>();
        config.put("publishableKey", stripeService.getPublishableKey());
        return ResponseEntity.ok(config);
    }

    /**
     * Webhook para recibir eventos de Stripe
     */
    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, 
                                                     @RequestHeader("Stripe-Signature") String sigHeader) {
        // TODO: Implementar verificación de webhook y manejo de eventos
        // Por ahora retornamos 200 para evitar que Stripe reintente
        return ResponseEntity.ok("Webhook received");
    }
}