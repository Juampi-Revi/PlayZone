package com.reservapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import java.time.LocalTime;

@Entity
@Table(name = "configuracion_horarios")
public class ConfiguracionHorario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cancha_id", nullable = false)
    @JsonBackReference
    private Cancha cancha;

    // Horario de apertura
    @NotNull
    @Column(nullable = false)
    private LocalTime horaApertura;

    // Horario de cierre
    @NotNull
    @Column(nullable = false)
    private LocalTime horaCierre;

    // Duración de cada turno en minutos (60, 90, 120, etc.)
    @NotNull
    @Min(value = 30, message = "La duración mínima del turno es 30 minutos")
    @Max(value = 240, message = "La duración máxima del turno es 240 minutos")
    @Column(nullable = false)
    private Integer duracionTurnoMinutos;

    // Días de la semana disponibles (formato: "1,2,3,4,5,6,7" donde 1=Lunes, 7=Domingo)
    @Column(length = 20)
    private String diasDisponibles = "1,2,3,4,5,6,7"; // Por defecto todos los días

    // Tiempo de anticipación mínima para reservar (en horas)
    @Min(value = 0, message = "La anticipación mínima no puede ser negativa")
    @Column
    private Integer anticipacionMinimaHoras = 1;

    // Tiempo máximo de anticipación para reservar (en días)
    @Min(value = 1, message = "La anticipación máxima debe ser al menos 1 día")
    @Max(value = 365, message = "La anticipación máxima no puede exceder 365 días")
    @Column
    private Integer anticipacionMaximaDias = 30;

    // Constructors
    public ConfiguracionHorario() {}

    public ConfiguracionHorario(Cancha cancha, LocalTime horaApertura, LocalTime horaCierre, 
                               Integer duracionTurnoMinutos) {
        this.cancha = cancha;
        this.horaApertura = horaApertura;
        this.horaCierre = horaCierre;
        this.duracionTurnoMinutos = duracionTurnoMinutos;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cancha getCancha() {
        return cancha;
    }

    public void setCancha(Cancha cancha) {
        this.cancha = cancha;
    }

    public LocalTime getHoraApertura() {
        return horaApertura;
    }

    public void setHoraApertura(LocalTime horaApertura) {
        this.horaApertura = horaApertura;
    }

    public LocalTime getHoraCierre() {
        return horaCierre;
    }

    public void setHoraCierre(LocalTime horaCierre) {
        this.horaCierre = horaCierre;
    }

    public Integer getDuracionTurnoMinutos() {
        return duracionTurnoMinutos;
    }

    public void setDuracionTurnoMinutos(Integer duracionTurnoMinutos) {
        this.duracionTurnoMinutos = duracionTurnoMinutos;
    }

    public String getDiasDisponibles() {
        return diasDisponibles;
    }

    public void setDiasDisponibles(String diasDisponibles) {
        this.diasDisponibles = diasDisponibles;
    }

    public Integer getAnticipacionMinimaHoras() {
        return anticipacionMinimaHoras;
    }

    public void setAnticipacionMinimaHoras(Integer anticipacionMinimaHoras) {
        this.anticipacionMinimaHoras = anticipacionMinimaHoras;
    }

    public Integer getAnticipacionMaximaDias() {
        return anticipacionMaximaDias;
    }

    public void setAnticipacionMaximaDias(Integer anticipacionMaximaDias) {
        this.anticipacionMaximaDias = anticipacionMaximaDias;
    }

    // Métodos de utilidad
    public boolean esDiaDisponible(int diaSemana) {
        return diasDisponibles != null && diasDisponibles.contains(String.valueOf(diaSemana));
    }

    public String[] getDiasDisponiblesArray() {
        return diasDisponibles != null ? diasDisponibles.split(",") : new String[0];
    }
}