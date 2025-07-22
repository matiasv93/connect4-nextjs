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
    <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 flex-1">
      {/* Current player label */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xl font-semibold text-gray-800">
          Current turn:
        </span>
        <span
          className={`font-bold text-xl px-4 py-1 rounded-full ${PLAYER_TEXT_COLORS[player]} bg-white`}
        >
          Player {player}
        </span>
        <span
          className={`inline-block w-6 h-6 rounded-full border-2 border-white shadow-lg ${PLAYER_COLORS[player]} animate-pulse`}
        ></span>
      </div>

      {/* Arrow row */}
      <div
        className="grid grid-cols-7 gap-3 h-12 px-6"
        style={{ width: "612px" }}
      >
        {Array.from({ length: numCols }).map((_, colIdx) => (
          <div key={colIdx} className="flex items-center justify-center">
            {hoveredCol === colIdx ? (
              <span className="text-3xl text-blue-500 animate-bounce">⬇️</span>
            ) : null}
          </div>
        ))}
      </div>

      {/* Board */}
      <div className="flex flex-col items-center justify-center">
        <div
          className={`relative grid grid-cols-7 gap-2 p-4 rounded-3xl shadow-2xl bg-blue-500 border-4 border-blue-800 transition-all duration-200 ${
            winner || isDraw ? "opacity-50 pointer-events-none" : ""
          }`}
          style={{ width: "564px" }}
        >
          {board.flatMap((row: Cell[], rowIdx: number) =>
            row.map((cell: Cell, colIdx: number) => {
              const idx = rowIdx * numCols + colIdx;
              let cellColor = "bg-gray-100";
              if (cell === "A") cellColor = PLAYER_COLORS.A;
              if (cell === "B") cellColor = PLAYER_COLORS.B;
              const highlight =
                hoveredCol === colIdx ? "ring-4 ring-blue-300" : "";
              const isNotWinner =
                winner && !winnerCoords.includes(`${rowIdx},${colIdx}`);

              return (
                <div
                  key={idx}
                  className={`w-16 h-16 border-2 border-blue-900 rounded-full shadow-inner flex items-center justify-center transition-all duration-150 ${cellColor} ${highlight} cursor-pointer ${
                    isNotWinner ? "opacity-40" : ""
                  }`}
                  style={{
                    boxShadow:
                      cell !== ""
                        ? "0 2px 8px 0 rgba(0,0,0,0.15) inset"
                        : "0 1px 4px 0 rgba(0,0,0,0.08) inset",
                  }}
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
        <div className="fixed inset-0 flex items-start justify-center bg-black/40 z-20 pt-6">
          <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center border-4 border-blue-300">
            <span className="text-4xl font-extrabold mb-4 text-gray-800 flex items-center gap-2">
              {winner ? (
                <>
                  🏆 Player
                  <span className={PLAYER_TEXT_COLORS[winner]}> {winner} </span>
                  wins!
                </>
              ) : (
                <>🤝 It&apos;s a draw! Nobody won!</>
              )}
            </span>
            {winner && (
              <span
                className={`inline-block w-12 h-12 rounded-full mb-6 border-4 border-blue-200 ${PLAYER_COLORS[winner]}`}
              ></span>
            )}
            <button
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-bold text-lg shadow transition cursor-pointer"
              onClick={reset}
            >
              RESET
            </button>
          </div>
        </div>
      )}
      {/* Floating Toast for message */}
      {message && !winner && !isDraw && (
        <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-orange-100 text-orange-500 px-6 py-3 rounded-full shadow-lg text-lg font-semibold animate-fade-in">
            {message}
          </div>
        </div>
      )}
    </div>
  );
}
