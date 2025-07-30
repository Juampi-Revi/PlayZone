package com.reservapp.dto;

import java.time.LocalDateTime;
import java.util.Set;

public class ClubResponseDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String direccion;
    private String telefono;
    private String email;
    private String sitioWeb;
    private String horarioAtencion;
    private String reglasGenerales;
    private String politicasCancelacion;
    private Set<String> servicios;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private boolean activo;

    // Constructor
    public ClubResponseDTO() {}

    // Constructor con Club
    public ClubResponseDTO(com.reservapp.model.Club club) {
        this.id = club.getId();
        this.nombre = club.getNombre();
        this.descripcion = club.getDescripcion();
        this.direccion = club.getDireccion();
        this.telefono = club.getTelefono();
        this.email = club.getEmail();
        this.sitioWeb = club.getSitioWeb();
        this.horarioAtencion = club.getHorarioAtencion();
        this.reglasGenerales = club.getReglasGenerales();
        this.politicasCancelacion = club.getPoliticasCancelacion();
        this.servicios = club.getServicios();
        this.fechaCreacion = club.getFechaCreacion();
        this.fechaActualizacion = club.getFechaActualizacion();
        this.activo = club.isActivo();
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSitioWeb() { return sitioWeb; }
    public void setSitioWeb(String sitioWeb) { this.sitioWeb = sitioWeb; }

    public String getHorarioAtencion() { return horarioAtencion; }
    public void setHorarioAtencion(String horarioAtencion) { this.horarioAtencion = horarioAtencion; }

    public String getReglasGenerales() { return reglasGenerales; }
    public void setReglasGenerales(String reglasGenerales) { this.reglasGenerales = reglasGenerales; }

    public String getPoliticasCancelacion() { return politicasCancelacion; }
    public void setPoliticasCancelacion(String politicasCancelacion) { this.politicasCancelacion = politicasCancelacion; }

    public Set<String> getServicios() { return servicios; }
    public void setServicios(Set<String> servicios) { this.servicios = servicios; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public LocalDateTime getFechaActualizacion() { return fechaActualizacion; }
    public void setFechaActualizacion(LocalDateTime fechaActualizacion) { this.fechaActualizacion = fechaActualizacion; }

    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }
}