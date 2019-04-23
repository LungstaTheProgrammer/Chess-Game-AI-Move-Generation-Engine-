var GameBoard = {}

GameBoard.pieces = new Array(BRD_SQ_NUM)

GameBoard.side = COLOURS.WHITE
GameBoard.fiftyMove = 0
GameBoard.hisPly = 0
GameBoard.ply = 0
/*
0001
0010
0100
1000

1101 = 13
0101 = 9

bitwise operation
if (1101 & WKCA) != 0

*/
GameBoard.castlePerm = 0