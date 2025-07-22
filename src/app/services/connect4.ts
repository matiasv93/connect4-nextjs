// GAME
// 2 players (A/B)
// turn
// coin positions (7x7 matrix)
// win who get 4 coins in a line

const LINES_X = 7;
const LINES_Y = 7;

export type Player = "A" | "B";
export type Cell = Player | "";

export const PLAYER_A: Player = "A";
export const PLAYER_B: Player = "B";

export class Connect4 {
  board: Cell[][];
  player: Player;
  winner?: Player;

  constructor() {
    this.board = new Array(LINES_Y)
      .fill("")
      .map(() => new Array<Cell>(LINES_X).fill(""));
    this.player = PLAYER_A;
  }

  play(col: number): void {
    let lastMove: [number, number] | undefined;
    if (this.winner) {
      console.log("Skipping, Game over");
      return;
    }

    for (let row = this.board.length - 1; row >= 0; row--) {
      if (!this.board[row][col]) {
        this.board[row][col] = this.player;
        lastMove = [row, col];
        break;
      }
    }

    if (lastMove) {
      this.checkWinner(lastMove[0], lastMove[1], this.player);
    }

    if (this.winner) {
      console.log("Game over, winner: ", this.winner);
      return;
    }

    this.player = this.player === PLAYER_A ? PLAYER_B : PLAYER_A;
  }

  checkWinner(row: number, col: number, player: Player): void {
    const horizontal: Cell[] = [];
    const vertical: Cell[] = [];
    const diagonalLeft: Cell[] = [];
    const diagonalRight: Cell[] = [];

    for (let pos = -3; pos <= 3; pos++) {
      horizontal.push(this.board[row]?.[col + pos] ?? "");
      vertical.push(this.board[row + pos]?.[col] ?? "");
      diagonalLeft.push(this.board[row + pos]?.[col + pos] ?? "");
      diagonalRight.push(this.board[row + pos]?.[col - pos] ?? "");
    }

    const check4 = (arr: Cell[], player: Player): boolean => {
      let count = 0;

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === player) {
          count++;
          if (count === 4) return true;
        } else {
          count = 0;
        }
      }

      return false;
    };

    if (check4(horizontal, player)) {
      console.log("WON horizontal");
      this.winner = player;
      return;
    }
    if (check4(vertical, player)) {
      console.log("WON vertical");
      this.winner = player;
      return;
    }
    if (check4(diagonalLeft, player)) {
      console.log("WON diagonalLeft");
      this.winner = player;
      return;
    }
    if (check4(diagonalRight, player)) {
      console.log("WON diagonalRight");
      this.winner = player;
      return;
    }
  }

  print(): void {
    console.log("PLAYER: ", this.player);
    console.log("WINNER: ", this.winner);
    console.table(this.board);
  }
}

export const game = new Connect4();
