function PCEINDEX(pce, pceNum) {
    return (pce * 10 + pceNum)
}

var GameBoard = {}

GameBoard.pieces = new Array(BRD_SQ_NUM)

GameBoard.side = COLOURS.WHITE
GameBoard.fiftyMove = 0
GameBoard.hisPly = 0
GameBoard.ply = 0
GameBoard.enPas = 0
/*
0001
0010
0100
1000

1101 = 13
0101 = 5

bitwise operation
if (1101 & WKCA) != 0

*/
GameBoard.castlePerm = 0
GameBoard.material = new Array(2) // WHITE, BLACK material of pieces
GameBoard.pceNum = new Array(13) // Index by pce
GameBoard.pList = new Array(14 * 10)

function GeneratePosKey() {
    var sq = 0
    var finalKey = 0
    var piece = PIECES.EMPTY

    for (sq = 0; sq < BRD_SQ_NUM; ++sq) {
        piece = GameBoard.pieces[sq]
        if (piece != PIECES.EMPTY && piece != SQUARES.OFFBOARD) {
            finalKey ^= Piece[(piece * 120) + sq]
        }
    }

    if (GameBoard.side == COLOURS.WHITE) {
        finalKey ^= SideKey
    }

    if (GameBoard.enPas != SQUARES.No_SQ) {
        finalKey ^= PieceKeys[GameBoard.enPas]
    }

    finalKey ^= CastleKeys[GameBoard.castlePerm]

    return finalKey
}