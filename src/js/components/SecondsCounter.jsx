import React from "react";
import Digit from "./Digit";

const SecondsCounter = (props) => {
  // Convertir segundos totales a formato MM:SS
  const totalMinutes = Math.floor(props.seconds / 60);
  const remainingSeconds = props.seconds % 60;

  // Extraer dígitos de los MINUTOS (2 dígitos)
  const minuteDigit1 = Math.floor(totalMinutes / 10); // Decenas de minutos
  const minuteDigit2 = totalMinutes % 10; // Unidades de minutos

  // Extraer dígitos de los SEGUNDOS (2 dígitos)
  const secondDigit1 = Math.floor(remainingSeconds / 10); // Decenas de segundos
  const secondDigit2 = remainingSeconds % 10; // Unidades de segundos

  // Determinar si el contador está activo (corriendo)
  const isActive = props.isRunning;

  return (
    <div className="d-flex row text-center justify-content-center">
      {/* Icono de reloj */}
      <div className="card fs-1 col-auto m-2">
        <i className="fa-solid fa-clock mx-auto my-auto"></i>
      </div>

      {/* MINUTOS (2 dígitos) */}
      <Digit number={minuteDigit1} active={isActive && props.seconds > 0} />
      <Digit number={minuteDigit2} active={isActive && props.seconds > 0} />

      {/* Separador : (dos puntos) */}
      <div className="card fs-1 col-auto m-2 bg-transparent border-0">
        <span>:</span>
      </div>

      {/* SEGUNDOS (2 dígitos) */}
      <Digit number={secondDigit1} active={isActive && props.seconds > 0} />
      <Digit number={secondDigit2} active={isActive && props.seconds > 0} />
    </div>
  );
};

export default SecondsCounter;
