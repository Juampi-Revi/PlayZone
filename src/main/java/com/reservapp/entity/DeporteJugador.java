package com.reservapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Embeddable
public class DeporteJugador {
    
    @Column(name = "deporte")
    @NotBlank(message = "El deporte es obligatorio")
    @Size(max = 50, message = "El deporte no puede exceder 50 caracteres")
    private String deporte;

    @Column(name = "puntuacion")
    @DecimalMin(value = "0.0", message = "La puntuación no puede ser negativa")
    @DecimalMax(value = "5.0", message = "La puntuación máxima es 5.0")
    private Double puntuacion = 0.0;

    @Column(name = "posicion")
    @Size(max = 50, message = "La posición no puede exceder 50 caracteres")
    private String posicion;

    @Column(name = "anos_experiencia")
    @Min(value = 0, message = "Los años de experiencia no pueden ser negativos")
    @Max(value = 50, message = "Los años de experiencia no pueden exceder 50")
    private Integer anosExperiencia = 0;

    @Column(name = "nivel")
    @Size(max = 20, message = "El nivel no puede exceder 20 caracteres")
    private String nivel; // PRINCIPIANTE, INTERMEDIO, AVANZADO, PROFESIONAL

    // Constructors
    public DeporteJugador() {}

    public DeporteJugador(String deporte, Double puntuacion, String posicion, Integer anosExperiencia, String nivel) {
        this.deporte = deporte;
        this.puntuacion = puntuacion;
        this.posicion = posicion;
        this.anosExperiencia = anosExperiencia;
        this.nivel = nivel;
    }

    // Getters and Setters
    public String getDeporte() {
        return deporte;
    }

    public void setDeporte(String deporte) {
        this.deporte = deporte;
    }

    public Double getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(Double puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getPosicion() {
        return posicion;
    }

    public void setPosicion(String posicion) {
        this.posicion = posicion;
    }

    public Integer getAnosExperiencia() {
        return anosExperiencia;
    }

    public void setAnosExperiencia(Integer anosExperiencia) {
        this.anosExperiencia = anosExperiencia;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    // Métodos de utilidad
    public String getNivelDisplay() {
        if (nivel == null) {
            return "No especificado";
        }
        switch (nivel.toUpperCase()) {
            case "PRINCIPIANTE":
                return "Principiante";
            case "INTERMEDIO":
                return "Intermedio";
            case "AVANZADO":
                return "Avanzado";
            case "PROFESIONAL":
                return "Profesional";
            default:
                return nivel;
        }
    }

    public String getPuntuacionDisplay() {
        if (puntuacion == null) {
            return "0.0";
        }
        return String.format("%.1f", puntuacion);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DeporteJugador that = (DeporteJugador) o;
        return deporte != null ? deporte.equals(that.deporte) : that.deporte == null;
    }

    @Override
    public int hashCode() {
        return deporte != null ? deporte.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "DeporteJugador{" +
                "deporte='" + deporte + '\'' +
                ", puntuacion=" + puntuacion +
                ", posicion='" + posicion + '\'' +
                ", anosExperiencia=" + anosExperiencia +
                ", nivel='" + nivel + '\'' +
                '}';
    }
} 