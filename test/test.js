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