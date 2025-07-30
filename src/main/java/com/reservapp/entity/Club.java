package com.reservapp.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "clubes")
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del club es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Column(nullable = false)
    private String nombre;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @NotBlank(message = "La dirección es obligatoria")
    @Size(min = 5, max = 200, message = "La dirección debe tener entre 5 y 200 caracteres")
    @Column(nullable = false)
    private String direccion;

    @Size(max = 20, message = "El teléfono no puede exceder 20 caracteres")
    @Column
    private String telefono;

    @Email(message = "El email debe tener un formato válido")
    @Size(max = 100, message = "El email no puede exceder 100 caracteres")
    @Column
    private String email;

    @Size(max = 200, message = "El sitio web no puede exceder 200 caracteres")
    @Column
    private String sitioWeb;

    @Size(max = 100, message = "El horario de atención no puede exceder 100 caracteres")
    @Column
    private String horarioAtencion;

    // Servicios disponibles en el club
    @ElementCollection
    @CollectionTable(name = "club_servicios", joinColumns = @JoinColumn(name = "club_id"))
    @Column(name = "servicio")
    private List<String> servicios;

    @Size(max = 1000, message = "Las políticas de cancelación no pueden exceder 1000 caracteres")
    @Column(columnDefinition = "TEXT")
    private String politicasCancelacion;

    @Size(max = 1000, message = "Las reglas generales no pueden exceder 1000 caracteres")
    @Column(columnDefinition = "TEXT")
    private String reglasGenerales;

    // Propietario/Administrador del club
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propietario_id", nullable = false)
    @JsonIgnore
    private Usuario propietario;

    // Canchas del club
    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Cancha> canchas;

    @Column
    private Boolean activo = true;

    @Column
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column
    private LocalDateTime fechaActualizacion = LocalDateTime.now();

    // Constructors
    public Club() {}

    public Club(String nombre, String descripcion, String direccion, String telefono, 
                String email, String sitioWeb, String horarioAtencion, Usuario propietario) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.sitioWeb = sitioWeb;
        this.horarioAtencion = horarioAtencion;
        this.propietario = propietario;
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
        this.fechaActualizacion = LocalDateTime.now();
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public String getSitioWeb() {
        return sitioWeb;
    }

    public void setSitioWeb(String sitioWeb) {
        this.sitioWeb = sitioWeb;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public String getHorarioAtencion() {
        return horarioAtencion;
    }

    public void setHorarioAtencion(String horarioAtencion) {
        this.horarioAtencion = horarioAtencion;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public List<String> getServicios() {
        return servicios;
    }

    public void setServicios(List<String> servicios) {
        this.servicios = servicios;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public String getPoliticasCancelacion() {
        return politicasCancelacion;
    }

    public void setPoliticasCancelacion(String politicasCancelacion) {
        this.politicasCancelacion = politicasCancelacion;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public String getReglasGenerales() {
        return reglasGenerales;
    }

    public void setReglasGenerales(String reglasGenerales) {
        this.reglasGenerales = reglasGenerales;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Usuario getPropietario() {
        return propietario;
    }

    public void setPropietario(Usuario propietario) {
        this.propietario = propietario;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public List<Cancha> getCanchas() {
        return canchas;
    }

    public void setCanchas(List<Cancha> canchas) {
        this.canchas = canchas;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
        this.fechaActualizacion = LocalDateTime.now();
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
}