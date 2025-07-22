import { useState } from "react";
import { Connect4, Player, Cell } from "../services/connect4";

export function useConnect4() {
  const [game, setGame] = useState(() => new Connect4());
  const [board, setBoard] = useState<Cell[][]>(
    game.board.map((row) => [...row])
  );
  const [player, setPlayer] = useState<Player>(game.player);
  const [winner, setWinner] = useState<Player | undefined>(game.winner);
  const [winnerCoords, setWinnerCoords] = useState<string[]>([]);
  const play = (col: number) => {
    game.play(col);
    setBoard(game.board.map((row) => [...row])); // force new reference
    setPlayer(game.player);

    if (game.winner) {
      setWinner(game.winner);
      const joinedWinnerCoords =
        game.winnerCoords?.map(([x, y]) => `${x},${y}`) || [];
      setWinnerCoords(joinedWinnerCoords);
    }
  };

  const reset = () => {
    const newGame = new Connect4();
    setGame(newGame);
    setBoard(newGame.board.map((row) => [...row]));
    setPlayer(newGame.player);
    setWinner(newGame.winner);
    setWinnerCoords([]);
  };
  const numRows = board.length;
  const numCols = board[0]?.length || 0;

  return { board, player, winner, winnerCoords, numRows, numCols, play, reset };
}
