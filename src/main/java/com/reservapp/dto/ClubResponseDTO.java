package com.reservapp.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.reservapp.entity.Club;

public class ClubResponseDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String direccion;
    private String telefono;
    private String email;
    private String sitioWeb;
    private String horarioAtencion;
    private List<String> servicios;
    private String politicasCancelacion;
    private String reglasGenerales;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private Long propietarioId;

    // Constructor vacío
    public ClubResponseDTO() {}

    // Constructor desde entidad Club
    public ClubResponseDTO(Club club) {
        this.id = club.getId();
        this.nombre = club.getNombre();
        this.descripcion = club.getDescripcion();
        this.direccion = club.getDireccion();
        this.telefono = club.getTelefono();
        this.email = club.getEmail();
        this.sitioWeb = club.getSitioWeb();
        this.horarioAtencion = club.getHorarioAtencion();
        this.servicios = club.getServicios();
        this.politicasCancelacion = club.getPoliticasCancelacion();
        this.reglasGenerales = club.getReglasGenerales();
        this.activo = club.getActivo();
        this.fechaCreacion = club.getFechaCreacion();
        this.fechaActualizacion = club.getFechaActualizacion();
        this.propietarioId = club.getPropietario() != null ? club.getPropietario().getId() : null;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    public Long getPropietarioId() {
        return propietarioId;
    }

    public void setPropietarioId(Long propietarioId) {
        this.propietarioId = propietarioId;
    }
}