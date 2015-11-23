// created by TRABELSI Nadir

//'use strict';

var Engine = function () {
    var board = new Array(6), line, column, player, player1 = new Array(0), player2 = new Array(0),
        player1_pieces = 0, player2_pieces = 0;
    for (line = 0; line < 6; line++) {
        board[line] = new Array(6);
    }

    this.initialisation = function () {
        this.initialisation_board();
        player = 1;
    };

    this.initialisation_board = function () {
        board[0][0] = "Black";
        board[0][1] = "Green";
        board[0][2] = "White";
        board[0][3] = "Blue";
        board[0][4] = "Red";
        board[0][5] = "White";

        board[1][0] = "Yellow";
        board[1][1] = "White";
        board[1][2] = "Green";
        board[1][3] = "Red";
        board[1][4] = "Yellow";
        board[1][5] = "Blue";

        board[2][0] = "Blue";
        board[2][1] = "Yellow";
        board[2][2] = "Blue";
        board[2][3] = "White";
        board[2][4] = "Black";
        board[2][5] = "Red";

        board[3][0] = "Red";
        board[3][1] = "Black";
        board[3][2] = "Red";
        board[3][3] = "Green";
        board[3][4] = "Blue";
        board[3][5] = "White";

        board[4][0] = "White";
        board[4][1] = "Green";
        board[4][2] = "Yellow";
        board[4][3] = "Black";
        board[4][4] = "Yellow";
        board[4][5] = "Green";

        board[5][0] = "Yellow";
        board[5][1] = "Blue";
        board[5][2] = "Black";
        board[5][3] = "Red";
        board[5][4] = "Green";
        board[5][5] = "Black";
    };

    this.check_board_length = function () {
        return ((board.length) * (board.length));
    };

    this.check_near = function () {
        return ((board[line][column] === board[line + 1][column]) ||
                (board[line][column] === board[line - 1][column]) ||
                (board[line][column] === board[line][column + 1]) ||
                (board[line][column] === board[line][column - 1]));
    };

    this.juxtaposition = function () {
        var juxtaposition = 0;

        line = 1;
        do {
            for (column = 1; column < board.length - 2; column++) {
                if (this.check_near()) {
                    juxtaposition = 1;
                }
            }
            line = line + 1;

        } while (line < 5);
        return juxtaposition;
    };

    this.check_player = function () {
        return player;
    };

    this.check_corner = function (color) {
        return (board[0][0] === color) || (board[0][5] === color) ||
            (board[5][0] === color) || (board[5][5] === color);
    };

    this.get_int_column = function (column) {
        return column.charCodeAt(0) - 65;
    };

    this.add_pieces_player = function (line, column, player) {
        var piece = board[line - 1][column];
        if (player === 1) {
            player1.unshift(piece);
            player1_pieces++;
        } else {
            player2.unshift(piece);
            player2_pieces++;
        }
    };

    this.remove_piece = function (line, column, player) {
        column = this.get_int_column(column);
        var result = false;
        if (board[line - 1][column] !== undefined) {
            board[line - 1][column] = undefined;
            result = true;
        }
        this.add_pieces_player(line, column, player);
        return result;
    };

    this.get_nb_board_pieces = function () {
        var result = 0;
        for (line = 0; line < 6; line++) {
            for (column = 0; column < 6; column++) {
                if (board[line][column] !== undefined) {
                    result++;
                }
            }
        }
        return result;
    };

    this.get_nb_player_pieces = function (player) {
        if (player === 1) {
            return player1_pieces;
        }
        if (player === 2) {
            return player2_pieces;
        }
    };
};
