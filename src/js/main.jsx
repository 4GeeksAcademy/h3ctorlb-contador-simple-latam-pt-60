import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Estilos
import "../styles/index.css";

// Componentes
import SecondsCounter from "./components/SecondsCounter";
import Clock from "./components/Clock";
import PomodoroControls from "./components/PomodoroControls";
import Controls from "./components/Controls";

const App = () => {
  // Estados principales
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [hasTimer, setHasTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  // Efecto para el contador/timer
  useEffect(() => {
    let interval;
    
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            // Timer terminado
            setIsRunning(false);
            setTimerFinished(true);
            playFinishSound();
            showFinishNotification();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  // Configurar timer desde PomodoroControls
  const handleSetTimer = (totalSeconds) => {
    setSeconds(totalSeconds);
    setInitialSeconds(totalSeconds);
    setHasTimer(true);
    setTimerFinished(false);
  };

  // Play
  const handlePlay = () => {
    if (hasTimer && seconds > 0) {
      setIsRunning(true);
      setTimerFinished(false);
    }
  };

  // Pause
  const handlePause = () => {
    setIsRunning(false);
  };

  // Reset
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
    setTimerFinished(false);
  };

  // Notificación al terminar
  const showFinishNotification = () => {
    alert("🎉 ¡Tiempo completado! Toma un descanso.");
  };

  // Sonido al terminar (opcional)
  const playFinishSound = () => {
    // Puedes agregar un audio aquí si quieres
    // const audio = new Audio('/path/to/sound.mp3');
    // audio.play();
    console.log("🔔 Timer finalizado!");
  };

  // Formatear tiempo para mostrar
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container-fluid bg-custom min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 mb-2">
            <i className="fa-solid fa-stopwatch me-3"></i>
            Pomodoro Timer
          </h1>
          <p className="text-muted">
            Administra tu tiempo con la técnica Pomodoro
          </p>
        </div>

        {/* Reloj en tiempo real */}
        <Clock />

        {/* Controles de Pomodoro */}
        <PomodoroControls
          onSetTimer={handleSetTimer}
          isRunning={isRunning}
        />

        {/* Display del Timer */}
        <div className="mb-4">
          <SecondsCounter
            seconds={seconds}
            isRunning={isRunning}
          />
        </div>

        {/* Información del timer */}
        {hasTimer && (
          <div className="text-center mb-3">
            <h4>
              {isRunning ? "⏱️ En progreso" : timerFinished ? "✅ Completado" : "⏸️ Pausado"}
            </h4>
            <p className="text-muted fs-5">
              Tiempo: {formatTime(seconds)}
            </p>
          </div>
        )}

        {/* Alerta visual cuando termina */}
        {timerFinished && (
          <div className="alert alert-success text-center" role="alert">
            <h4 className="alert-heading">🎉 ¡Excelente trabajo!</h4>
            <p>Has completado tu sesión de Pomodoro. ¡Toma un descanso!</p>
            <hr />
            <p className="mb-0">Selecciona un nuevo intervalo para continuar.</p>
          </div>
        )}

        {/* Controles Play/Pause/Reset */}
        <Controls
          isRunning={isRunning}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          hasTimer={hasTimer}
        />

        {/* Footer con instrucciones */}
        <div className="text-center mt-5">
          <div className="card bg-secondary">
            <div className="card-body">
              <h5 className="card-title">📚 ¿Cómo usar?</h5>
              <ol className="text-start">
                <li>Selecciona un intervalo (25 min, 50 min o personalizado)</li>
                <li>Presiona Play para iniciar el timer</li>
                <li>Trabaja enfocado hasta que el timer termine</li>
                <li>¡Toma un descanso cuando aparezca la alerta!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Renderizar la aplicación
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);