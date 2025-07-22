import { useState } from "react";
import {
  Connect4,
  PLAYER_A,
  PLAYER_B,
  Player,
  Cell,
} from "../services/connect4";

export function useConnect4() {
  const [game, setGame] = useState(() => new Connect4());
  const [board, setBoard] = useState<Cell[][]>(
    game.board.map((row) => [...row])
  );
  const [player, setPlayer] = useState<Player>(game.player);
  const [winner, setWinner] = useState<Player | undefined>(game.winner);

  const play = (col: number) => {
    game.play(col);
    setBoard(game.board.map((row) => [...row])); // force new reference
    setPlayer(game.player);
    setWinner(game.winner);
  };

  const reset = () => {
    const newGame = new Connect4();
    setGame(newGame);
    setBoard(newGame.board.map((row) => [...row]));
    setPlayer(newGame.player);
    setWinner(newGame.winner);
  };
  const numRows = board.length;
  const numCols = board[0]?.length || 0;

  return { board, player, winner, numRows, numCols, play, reset };
}
