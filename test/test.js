// created by TRABELSI Nadir

'use strict';

//start TP3 (tp-gal-10.pdf)

var PalettoTestCase = TestCase("PalettoTestCase");
var x;

PalettoTestCase.prototype.test_firstStory = function () {
    x = new Engine();
    x.initialisation();
    assertEquals(x.check_board_length(), 36);
    assertEquals(x.juxtaposition(), 0);
};

PalettoTestCase.prototype.test_secondStory = function () {
    assertTrue(x.check_player() === 1);
    assertTrue(x.check_corner("Yellow") === true);
};

PalettoTestCase.prototype.test_thirdStory = function () {
    var column = "A", line = 6;
    assertEquals(x.get_int_column(column), 0);
    assertTrue(x.check_player() === 1);
    assertEquals(x.remove_piece(line, column, 1), true);
    assertEquals(x.get_nb_board_pieces(), 35);
    assertEquals(x.get_nb_player_pieces(1), 1);
};

PalettoTestCase.prototype.test_fourthStory = function () {
    var test = x.possible_stroke();
    assertTrue(test.indexOf("Black") !== -1);
    assertTrue(test.indexOf("White") !== -1);
    //assertTrue(test.indexOf("Blue") !== -1);
    x.change_player();
    assertTrue(x.check_player() === 2);
    var column = "A", line = 1;
    assertEquals(x.remove_piece(line, column, 2), true);
    column = "F";
    line = 6;
    assertEquals(x.remove_piece(line, column, 2), true);
    assertEquals(x.get_nb_player_pieces(2), 2);
};

PalettoTestCase.prototype.test_fifthStory = function () {
    x = new Engine();
    x.initialisation_fifth_story();

    var column = "D", line = 1;
    assertTrue(x.isPossible(line, column));

    column = "F";
    line = 1;
    assertTrue(x.isPossible(line, column));

    column = "C";
    line = 3;
    assertFalse(x.isPossible(line, column));

    column = "E";
    line = 3;
    assertTrue(x.isPossible(line, column));

    column = "A";
    line = 4;
    assertTrue(x.isPossible(line, column));

    column = "B";
    line = 5;
    assertTrue(x.isPossible(line, column));

    column = "C";
    line = 6;
    assertTrue(x.isPossible(line, column));
};