package com.reservapp.dto;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class UpdateCanchaRequest {
    
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;
    
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descripcion;
    
    @Size(max = 50, message = "El deporte no puede exceder 50 caracteres")
    private String deporte;
    
    @Size(max = 200, message = "La ubicación no puede exceder 200 caracteres")
    private String ubicacion;
    
    @Positive(message = "El precio por hora debe ser positivo")
    private Double precioPorHora;
    
    @Size(max = 200, message = "El horario no puede exceder 200 caracteres")
    private String horario;
    
    @Size(max = 1000, message = "Las imágenes no pueden exceder 1000 caracteres")
    private String imagenes;
    
    private Boolean disponible;
    
    // Constructores
    public UpdateCanchaRequest() {}
    
    public UpdateCanchaRequest(String nombre, String descripcion, String deporte, String ubicacion, 
                              Double precioPorHora, String horario, String imagenes, Boolean disponible) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.deporte = deporte;
        this.ubicacion = ubicacion;
        this.precioPorHora = precioPorHora;
        this.horario = horario;
        this.imagenes = imagenes;
        this.disponible = disponible;
    }
    
    // Getters y Setters
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public String getDeporte() {
        return deporte;
    }
    
    public void setDeporte(String deporte) {
        this.deporte = deporte;
    }
    
    public String getUbicacion() {
        return ubicacion;
    }
    
    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
    
    public Double getPrecioPorHora() {
        return precioPorHora;
    }
    
    public void setPrecioPorHora(Double precioPorHora) {
        this.precioPorHora = precioPorHora;
    }
    
    public String getHorario() {
        return horario;
    }
    
    public void setHorario(String horario) {
        this.horario = horario;
    }
    
    public String getImagenes() {
        return imagenes;
    }
    
    public void setImagenes(String imagenes) {
        this.imagenes = imagenes;
    }
    
    public Boolean getDisponible() {
        return disponible;
    }
    
    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }
}