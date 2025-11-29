import React, { useState } from "react";

const PomodoroControls = ({ onSetTimer, isRunning }) => {
  const [customMinutes, setCustomMinutes] = useState("");
  const [selectedTimer, setSelectedTimer] = useState(null);

  const handleTimerSelect = (minutes, timerType) => {
    setSelectedTimer(timerType);
    onSetTimer(minutes * 60); // Convertir minutos a segundos
  };

  const handleCustomTimer = () => {
    if (customMinutes && parseInt(customMinutes) > 0) {
      handleTimerSelect(parseInt(customMinutes), "custom");
      setCustomMinutes("");
    } else {
      alert("Por favor ingresa un tiempo válido");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCustomTimer();
    }
  };

  return (
    <div className="container mb-4">
      <h5 className="text-center mb-3">Selecciona tu intervalo Pomodoro</h5>
      <div className="row justify-content-center gap-2">
        {/* Botón 25 minutos */}
        <div className="col-auto">
          <button
            className={`btn ${selectedTimer === "25min" ? "btn-success" : "btn-outline-light"} btn-lg`}
            onClick={() => handleTimerSelect(25, "25min")}
            disabled={isRunning}
          >
            <i className="fa-solid fa-stopwatch me-2"></i>
            25 minutos
          </button>
        </div>

        {/* Botón 50 minutos */}
        <div className="col-auto">
          <button
            className={`btn ${selectedTimer === "50min" ? "btn-success" : "btn-outline-light"} btn-lg`}
            onClick={() => handleTimerSelect(50, "50min")}
            disabled={isRunning}
          >
            <i className="fa-solid fa-stopwatch me-2"></i>
            50 minutos
          </button>
        </div>

        {/* Input Custom */}
        <div className="col-auto d-flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Minutos..."
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isRunning}
            min="1"
            style={{ width: "120px" }}
          />
          <button
            className={`btn ${selectedTimer === "custom" ? "btn-success" : "btn-outline-light"}`}
            onClick={handleCustomTimer}
            disabled={isRunning}
          >
            <i className="fa-solid fa-play me-2"></i>
            Iniciar
          </button>
        </div>
      </div>

      {/* Indicador visual del timer seleccionado */}
      {selectedTimer && !isRunning && (
        <div className="text-center mt-3">
          <small className="text-success">
            ✓ Timer configurado. Presiona Play para iniciar.
          </small>
        </div>
      )}
    </div>
  );
};

export default PomodoroControls;