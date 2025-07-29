package com.reservapp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "canchas")
public class Cancha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre de la cancha es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Column(nullable = false)
    private String nombre;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @NotBlank(message = "El deporte es obligatorio")
    @Size(min = 2, max = 50, message = "El deporte debe tener entre 2 y 50 caracteres")
    @Column(nullable = false)
    private String deporte;

    @NotBlank(message = "La ubicación es obligatoria")
    @Size(min = 5, max = 200, message = "La ubicación debe tener entre 5 y 200 caracteres")
    @Column(nullable = false)
    private String ubicacion;

    @NotNull(message = "El precio por hora es obligatorio")
    @Min(value = 0, message = "El precio no puede ser negativo")
    @Column(nullable = false)
    private Double precioPorHora;

    @Size(max = 100, message = "El horario no puede exceder 100 caracteres")
    @Column
    private String horario;

    @ElementCollection
    @CollectionTable(name = "cancha_imagenes", joinColumns = @JoinColumn(name = "cancha_id"))
    @Column(name = "image_url")
    private List<String> imagenes;

    @Column
    private Boolean disponible = true;

    // Propietario de la cancha (debe ser un usuario de tipo CLUB)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propietario_id")
    @JsonIgnore
    private Usuario propietario;

    // Configuración de horarios personalizada
    @OneToOne(mappedBy = "cancha", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private ConfiguracionHorario configuracionHorario;

    // Constructors
    public Cancha() {}

    public Cancha(Long id, String nombre, String descripcion, String deporte, String ubicacion, Double precioPorHora, String horario, List<String> imagenes, Boolean disponible, Usuario propietario) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.deporte = deporte;
        this.ubicacion = ubicacion;
        this.precioPorHora = precioPorHora;
        this.horario = horario;
        this.imagenes = imagenes;
        this.disponible = disponible;
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

    public List<String> getImagenes() {
        return imagenes;
    }

    public void setImagenes(List<String> imagenes) {
        this.imagenes = imagenes;
    }

    public Boolean getDisponible() {
        return disponible;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }

    public Usuario getPropietario() {
        return propietario;
    }

    public void setPropietario(Usuario propietario) {
        this.propietario = propietario;
    }

    public ConfiguracionHorario getConfiguracionHorario() {
        return configuracionHorario;
    }

    public void setConfiguracionHorario(ConfiguracionHorario configuracionHorario) {
        this.configuracionHorario = configuracionHorario;
    }
}