// created by TRABELSI Nadir

//'use strict';

var Engine = function () {
    var board = new Array(6), line, column, player, player1 = new Array(0), player2 = new Array(0),
        player1_pieces = 0, player2_pieces = 0,
        p1_black = 0, p1_yellow = 0, p1_green = 0, p1_blue = 0, p1_red = 0, p1_white = 0,
        p2_black = 0, p2_yellow = 0, p2_green = 0, p2_blue = 0, p2_red = 0, p2_white = 0;

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

    this.add_color_counter = function (line, column, player) {
        var piece = board[line - 1][column];
        if (player === 1) {
            if (piece === "Yellow") {
                p1_yellow++;
            } else if (piece === "Black") {
                p1_black++;
            } else if (piece === "Red") {
                p1_red++;
            } else if (piece === "Green") {
                p1_green++;
            } else if (piece === "Blue") {
                p1_blue++;
            } else if (piece === "White") {
                p1_white++;
            }
        }
    };

    this.remove_piece = function (line, column, player) {
        column = this.get_int_column(column);
        var result = false;
        this.add_color_counter(line, column, player);
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

    this.check_up = function (i, j) {
        if (i - 1 >= 0) {
            if (board[i - 1][j] !== 0) {
                return 1;
            }
        }
        return 0;
    };

    this.check_down = function (i, j) {
        if (i + 1 < 6) {
            if (board[i + 1][j] !== 0) {
                return 1;
            }
        }
        return 0;
    };

    this.check_left = function (i, j) {
        if (j - 1 >= 0) {
            if (board[i][j - 1] !== 0) {
                return 1;
            }
        }
        return 0;
    };

    this.check_right = function (i, j) {
        if (j + 1 < 6) {
            if (board[i][j + 1] !== 0) {
                return 1;
            }
        }
        return 0;
    };

    this.get_nb_neighbours = function (i, j) {
        return this.check_up(i, j) + this.check_down(i, j) + this.check_left(i, j) +
            this.check_right(i, j);
    };

    this.update_colors = function (colors, i, j) {
        if (colors.indexOf(board[i][j]) < 0) {
            if (this.get_nb_neighbours(i, j) < 3) {
                colors.push(board[i][j]);
            }
        }
    };

    this.possible_stroke = function () {
        var colors = [], i, j;
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 6; j++) {
                this.update_colors(colors, i, j);
            }
        }
        return colors;
    };

    this.change_player = function () {
        if (player === 1) {
            player = 2;
        } else {
            player = 1;
        }
        return player;
    };

    this.initialisation_fifth_story = function () {
        this.initialisation_board_fifth_story();
        player = 1;
    };

    this.initialisation_board_fifth_story = function () {
        board[0][0] = "undefined";
        board[0][1] = "undefined";
        board[0][2] = "undefined";
        board[0][3] = "Blue";
        board[0][4] = "Red";
        board[0][5] = "White";

        board[1][0] = "undefined";
        board[1][1] = "undefined";
        board[1][2] = "undefined";
        board[1][3] = "Red";
        board[1][4] = "Yellow";
        board[1][5] = "undefined";

        board[2][0] = "undefined";
        board[2][1] = "undefined";
        board[2][2] = "Blue";
        board[2][3] = "White";
        board[2][4] = "Black";
        board[2][5] = "undefined";

        board[3][0] = "Red";
        board[3][1] = "Black";
        board[3][2] = "Red";
        board[3][3] = "undefined";
        board[3][4] = "undefined";
        board[3][5] = "undefined";

        board[4][0] = "undefined";
        board[4][1] = "Green";
        board[4][2] = "Yellow";
        board[4][3] = "undefined";
        board[4][4] = "undefined";
        board[4][5] = "undefined";

        board[5][0] = "undefined";
        board[5][1] = "undefined";
        board[5][2] = "Black";
        board[5][3] = "undefined";
        board[5][4] = "undefined";
        board[5][5] = "undefined";
    };

    this.get_vertical = function (line, column) {
        var vertical = '';
        if (this.check_up(line, column)) {
            vertical += 'up';
        }
        if (this.check_down(line, column)) {
            vertical += 'down';
        }
        return vertical;
    };

    this.get_horizontal = function (line, column) {
        var horizontal = '';
        if (this.check_left(line, column)) {
            horizontal += 'left';
        }
        if (this.check_right(line, column)) {
            horizontal += 'right';
        }
        return horizontal;
    };

    this.check_up_pos = function (line, column, position) {
        if (position === 'upleft') {
            return board[line - 1][column - 1] !== undefined;
        }

        if (position === 'upright') {
            return board[line - 1][column + 1] !== undefined;
        }

        return null;
    };

    this.check_down_pos = function (line, column, position) {
        if (position === 'downleft') {
            return board[line + 1][column - 1] !== undefined;
        }

        if (position === 'downright') {
            return board[line + 1][column + 1] !== undefined;
        }
    };

    this.check_pos = function (line, column, position) {
        var res = this.check_up_pos(line, column, position);
        if (res === null) {
            return this.check_down_pos(line, column, position);
        }
        return res;
    };

    this.get_neigh_pos = function (line, column) {
        return this.get_horizontal(line, column) + this.get_vertical(line, column);
    };

    this.check_connected = function (line, column) {
        var res = this.get_neigh_pos(line, column);
        if (res === 'updown' || res === 'leftright') {
            return false;
        }
        return this.check_pos(line, column, res);
    };

    this.is_possible = function (line, column) {
        column = this.get_int_column(column);
        var neigh = this.get_nb_neighbours(line, column);
        if (neigh > 4) {
            return false;
        }

        if (neigh === 2) {
            return this.check_connected(line, column);
        }

        return board[line][column] !== undefined;
    };

    this.win = function () {
        if (p1_black === 6 || p1_yellow === 6 || p1_green === 6 || p1_blue === 6 || p1_red === 6 || p1_white === 6) {
            return 1;

        }
        if (p2_black === 6 || p2_yellow === 6 || p2_green === 6 || p2_blue === 6 ||  p2_red === 6 || p2_white === 6) {
            return 2;
        }
    };
};
