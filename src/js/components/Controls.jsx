import React from "react";

const Controls = ({ isRunning, onPlay, onPause, onReset, hasTimer }) => {
  return (
    <div className="container text-center mb-4">
      <div className="btn-group btn-group-lg" role="group">
        {/* Play/Pause Button */}
        {!isRunning ? (
          <button
            className="btn btn-success"
            onClick={onPlay}
            disabled={!hasTimer}
          >
            <i className="fa-solid fa-play me-2"></i>
            Play
          </button>
        ) : (
          <button className="btn btn-warning" onClick={onPause}>
            <i className="fa-solid fa-pause me-2"></i>
            Pause
          </button>
        )}

        {/* Reset Button */}
        <button className="btn btn-danger" onClick={onReset}>
          <i className="fa-solid fa-rotate-right me-2"></i>
          Reset
        </button>
      </div>

      {/* Mensaje de ayuda */}
      {!hasTimer && !isRunning && (
        <div className="mt-3">
          <small className="text-muted">
            ⬆️ Selecciona un intervalo arriba para comenzar
          </small>
        </div>
      )}
    </div>
  );
};

export default Controls;