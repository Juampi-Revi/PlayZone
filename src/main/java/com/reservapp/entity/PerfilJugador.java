package com.reservapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "perfil_jugador")
public class PerfilJugador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación 1:1 con Usuario
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    @JsonIgnore
    private Usuario usuario;

    // Información Personal
    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "altura")
    @Min(value = 100, message = "La altura mínima es 100 cm")
    @Max(value = 250, message = "La altura máxima es 250 cm")
    private Integer altura; // en cm

    @Column(name = "peso")
    @Min(value = 30, message = "El peso mínimo es 30 kg")
    @Max(value = 200, message = "El peso máximo es 200 kg")
    private Integer peso; // en kg

    // Sistema de Deportes (múltiples deportes con puntuaciones)
    @ElementCollection
    @CollectionTable(name = "jugador_deportes", joinColumns = @JoinColumn(name = "perfil_id"))
    @AttributeOverrides({
        @AttributeOverride(name = "deporte", column = @Column(name = "deporte")),
        @AttributeOverride(name = "puntuacion", column = @Column(name = "puntuacion")),
        @AttributeOverride(name = "posicion", column = @Column(name = "posicion")),
        @AttributeOverride(name = "anosExperiencia", column = @Column(name = "anos_experiencia")),
        @AttributeOverride(name = "nivel", column = @Column(name = "nivel"))
    })
    private List<DeporteJugador> deportes;

    // Sistema de Adjetivos/Tags
    @ElementCollection
    @CollectionTable(name = "jugador_adjetivos", joinColumns = @JoinColumn(name = "perfil_id"))
    @Column(name = "adjetivo")
    private List<String> adjetivos;

    // Estadísticas Generales
    @Column(name = "rating_promedio")
    @DecimalMin(value = "0.0", message = "El rating no puede ser negativo")
    @DecimalMax(value = "5.0", message = "El rating máximo es 5.0")
    private Double ratingPromedio = 0.0;

    @Column(name = "partidos_jugados")
    @Min(value = 0, message = "Los partidos jugados no pueden ser negativos")
    private Integer partidosJugados = 0;

    @Column(name = "partidos_ganados")
    @Min(value = 0, message = "Los partidos ganados no pueden ser negativos")
    private Integer partidosGanados = 0;

    @Column(name = "partidos_empatados")
    @Min(value = 0, message = "Los partidos empatados no pueden ser negativos")
    private Integer partidosEmpatados = 0;

    @Column(name = "partidos_perdidos")
    @Min(value = 0, message = "Los partidos perdidos no pueden ser negativos")
    private Integer partidosPerdidos = 0;

    // Metadatos
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion = LocalDateTime.now();

    // Constructors
    public PerfilJugador() {}

    public PerfilJugador(Usuario usuario) {
        this.usuario = usuario;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Integer getAltura() {
        return altura;
    }

    public void setAltura(Integer altura) {
        this.altura = altura;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Integer getPeso() {
        return peso;
    }

    public void setPeso(Integer peso) {
        this.peso = peso;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public List<DeporteJugador> getDeportes() {
        return deportes;
    }

    public void setDeportes(List<DeporteJugador> deportes) {
        this.deportes = deportes;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public List<String> getAdjetivos() {
        return adjetivos;
    }

    public void setAdjetivos(List<String> adjetivos) {
        this.adjetivos = adjetivos;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Double getRatingPromedio() {
        return ratingPromedio;
    }

    public void setRatingPromedio(Double ratingPromedio) {
        this.ratingPromedio = ratingPromedio;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Integer getPartidosJugados() {
        return partidosJugados;
    }

    public void setPartidosJugados(Integer partidosJugados) {
        this.partidosJugados = partidosJugados;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Integer getPartidosGanados() {
        return partidosGanados;
    }

    public void setPartidosGanados(Integer partidosGanados) {
        this.partidosGanados = partidosGanados;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Integer getPartidosEmpatados() {
        return partidosEmpatados;
    }

    public void setPartidosEmpatados(Integer partidosEmpatados) {
        this.partidosEmpatados = partidosEmpatados;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public Integer getPartidosPerdidos() {
        return partidosPerdidos;
    }

    public void setPartidosPerdidos(Integer partidosPerdidos) {
        this.partidosPerdidos = partidosPerdidos;
        this.fechaActualizacion = LocalDateTime.now();
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    // Métodos de utilidad
    public int getEdad() {
        if (fechaNacimiento == null) {
            return 0;
        }
        return LocalDate.now().getYear() - fechaNacimiento.getYear();
    }

    public double getPorcentajeVictoria() {
        if (partidosJugados == 0) {
            return 0.0;
        }
        return (double) partidosGanados / partidosJugados * 100;
    }

    public DeporteJugador getDeporteFavorito() {
        if (deportes == null || deportes.isEmpty()) {
            return null;
        }
        return deportes.stream()
                .max((d1, d2) -> Double.compare(d1.getPuntuacion(), d2.getPuntuacion()))
                .orElse(null);
    }

    // Método para agregar un deporte
    public void agregarDeporte(String deporte, Double puntuacion, String posicion, Integer anosExperiencia, String nivel) {
        DeporteJugador nuevoDeporte = new DeporteJugador(deporte, puntuacion, posicion, anosExperiencia, nivel);
        if (deportes == null) {
            deportes = new java.util.ArrayList<>();
        }
        deportes.add(nuevoDeporte);
        this.fechaActualizacion = LocalDateTime.now();
    }

    // Método para agregar un adjetivo
    public void agregarAdjetivo(String adjetivo) {
        if (adjetivos == null) {
            adjetivos = new java.util.ArrayList<>();
        }
        if (!adjetivos.contains(adjetivo)) {
            adjetivos.add(adjetivo);
            this.fechaActualizacion = LocalDateTime.now();
        }
    }

    // Método para remover un adjetivo
    public void removerAdjetivo(String adjetivo) {
        if (adjetivos != null) {
            adjetivos.remove(adjetivo);
            this.fechaActualizacion = LocalDateTime.now();
        }
    }
} 