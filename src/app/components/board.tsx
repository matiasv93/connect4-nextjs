"use client";
import { useState } from "react";
import { Connect4, Player, PLAYER_A, PLAYER_B } from "../services/connect4";

const PLAYER_COLORS = {
  [PLAYER_A]: "bg-red-500",
  [PLAYER_B]: "bg-yellow-500",
};

export default function Board() {
  const [game] = useState<Connect4>(new Connect4());
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  return (
    <div className="font-sans items-center justify-items-center flex-1 p-4 gap-16 sm:p-20 bg-gray-200">
      {/* Arrow row */}
      <div
        className="grid grid-cols-7 gap-3 h-10 px-6"
        style={{ width: "564px" }}
      >
        {game.board.map((_, colIdx) => (
          <div key={colIdx} className="flex items-center justify-center">
            {hoveredCol === colIdx ? (
              <span className="text-3xl text-blue-500">↓</span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center bg-blue-500 px-6 py-4 rounded-xl">
        <div className="grid grid-cols-7 gap-y-3 gap-x-4">
          {game.board.flatMap((row, rowIdx) =>
            row.map((cell, colIdx) => {
              // Calculate the index for the flat array
              const idx = rowIdx * game.board.length + colIdx;
              const cellColor = PLAYER_COLORS[cell as Player] || "bg-gray-200";
              // Highlight column on hover
              const highlight =
                hoveredCol === colIdx ? "ring-4 ring-blue-400" : "";
              return (
                <div
                  key={idx}
                  className={`w-15 h-15 border border-gray-400 rounded-full transition-all duration-150 ${cellColor} ${highlight} cursor-pointer`}
                  onMouseEnter={() => setHoveredCol(colIdx)}
                  onMouseLeave={() => setHoveredCol(null)}
                ></div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
