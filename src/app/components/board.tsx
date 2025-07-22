"use client";
import { useState } from "react";
import { useConnect4 } from "../hooks/useConnect4";
import type { Cell, Player } from "../services/connect4";

const PLAYER_COLORS: Record<Player, string> = {
  A: "bg-red-500",
  B: "bg-yellow-400",
};
const PLAYER_TEXT_COLORS: Record<Player, string> = {
  A: "text-red-600",
  B: "text-yellow-600",
};

export default function Board() {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const {
    board,
    player,
    winner,
    winnerCoords,
    numCols,
    play,
    reset,
    isDraw,
    message,
  } = useConnect4();

  return (
    <div className="relative font-sans items-center justify-items-center flex-1 p-4 gap-16 sm:p-20 bg-gray-200">
      {/* Current player label */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg font-semibold text-black">Current turn:</span>
        <span className={`font-bold ${PLAYER_TEXT_COLORS[player]}`}>
          Player {player}
        </span>
        <span
          className={`inline-block w-4 h-4 rounded-full ml-1 ${PLAYER_COLORS[player]}`}
        ></span>
      </div>
      {/* Message display */}
      {message && !winner && !isDraw && (
        <div className="mb-2 text-center text-blue-700 font-medium">
          {message}
        </div>
      )}
      {/* Arrow row */}
      <div
        className="grid grid-cols-7 gap-3 h-10 px-6"
        style={{ width: "612px" }}
      >
        {Array.from({ length: numCols }).map((_, colIdx) => (
          <div key={colIdx} className="flex items-center justify-center">
            {hoveredCol === colIdx ? (
              <span className="text-2xl text-blue-500">↓</span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center bg-blue-500 px-6 py-4 rounded-xl">
        <div
          className={`grid grid-cols-7 gap-2 transition-all duration-200 ${
            winner || isDraw ? "opacity-50 pointer-events-none" : ""
          }`}
          style={{ width: "564px" }}
        >
          {board.flatMap((row: Cell[], rowIdx: number) =>
            row.map((cell: Cell, colIdx: number) => {
              const idx = rowIdx * numCols + colIdx;
              let cellColor = "bg-gray-200";
              if (cell === "A") cellColor = PLAYER_COLORS.A;
              if (cell === "B") cellColor = PLAYER_COLORS.B;
              const highlight =
                hoveredCol === colIdx ? "ring-4 ring-blue-300" : "";
              const isNotWinner =
                winner && !winnerCoords.includes(`${rowIdx},${colIdx}`);

              if (isNotWinner) {
                cellColor += " opacity-40";
              }

              return (
                <div
                  key={idx}
                  className={`w-15 h-15 border border-gray-400 rounded-full transition-all duration-150 ${cellColor} ${highlight} cursor-pointer`}
                  onMouseEnter={() => setHoveredCol(colIdx)}
                  onMouseLeave={() => setHoveredCol(null)}
                  onClick={() => play(colIdx)}
                ></div>
              );
            })
          )}
        </div>
      </div>
      {/* Winner/Draw Modal */}
      {(winner || isDraw) && (
        <div className="fixed inset-0 flex items-start justify-center bg-black/30 z-10 pt-15">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <span className="text-2xl font-bold mb-2 text-black">
              {winner ? (
                <>
                  Player{" "}
                  <span className={PLAYER_TEXT_COLORS[winner]}> {winner} </span>{" "}
                  wins!
                </>
              ) : (
                <>Nobody won!</>
              )}
            </span>
            {winner && (
              <span
                className={`inline-block w-8 h-8 rounded-full mb-4 ${PLAYER_COLORS[winner]}`}
              ></span>
            )}
            {message && (
              <span className="mb-4 text-blue-700 font-medium">{message}</span>
            )}
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold cursor-pointer"
              onClick={reset}
            >
              RESET
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
