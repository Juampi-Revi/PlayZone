package com.reservapp.dto;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateClubRequest {
    
    @NotBlank(message = "El nombre del club es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String nombre;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    private String descripcion;

    @NotBlank(message = "La dirección es obligatoria")
    @Size(min = 5, max = 200, message = "La dirección debe tener entre 5 y 200 caracteres")
    private String direccion;

    @Size(max = 20, message = "El teléfono no puede exceder 20 caracteres")
    private String telefono;

    @Email(message = "El email debe tener un formato válido")
    @Size(max = 100, message = "El email no puede exceder 100 caracteres")
    private String email;

    @Size(max = 200, message = "El sitio web no puede exceder 200 caracteres")
    private String sitioWeb;

    @Size(max = 100, message = "El horario de atención no puede exceder 100 caracteres")
    private String horarioAtencion;

    private List<String> servicios;

    @Size(max = 1000, message = "Las políticas de cancelación no pueden exceder 1000 caracteres")
    private String politicasCancelacion;

    @Size(max = 1000, message = "Las reglas generales no pueden exceder 1000 caracteres")
    private String reglasGenerales;

    // Constructors
    public UpdateClubRequest() {}

    public UpdateClubRequest(String nombre, String descripcion, String direccion, String telefono, 
                           String email, String sitioWeb, String horarioAtencion, List<String> servicios,
                           String politicasCancelacion, String reglasGenerales) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.sitioWeb = sitioWeb;
        this.horarioAtencion = horarioAtencion;
        this.servicios = servicios;
        this.politicasCancelacion = politicasCancelacion;
        this.reglasGenerales = reglasGenerales;
    }

    // Getters and Setters
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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSitioWeb() {
        return sitioWeb;
    }

    public void setSitioWeb(String sitioWeb) {
        this.sitioWeb = sitioWeb;
    }

    public String getHorarioAtencion() {
        return horarioAtencion;
    }

    public void setHorarioAtencion(String horarioAtencion) {
        this.horarioAtencion = horarioAtencion;
    }

    public List<String> getServicios() {
        return servicios;
    }

    public void setServicios(List<String> servicios) {
        this.servicios = servicios;
    }

    public String getPoliticasCancelacion() {
        return politicasCancelacion;
    }

    public void setPoliticasCancelacion(String politicasCancelacion) {
        this.politicasCancelacion = politicasCancelacion;
    }

    public String getReglasGenerales() {
        return reglasGenerales;
    }

    public void setReglasGenerales(String reglasGenerales) {
        this.reglasGenerales = reglasGenerales;
    }
}