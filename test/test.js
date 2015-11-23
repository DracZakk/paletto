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