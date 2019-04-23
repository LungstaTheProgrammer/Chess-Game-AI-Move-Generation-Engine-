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
GameBoard.posKey = 0


GameBoard.moveList = new Array(MAXDEPTH * MAXPOSITIONMOVES)
GameBoard.moveScores = new Array(MAXDEPTH * MAXPOSITIONMOVES)
GameBoard.moveListStart = new Array(MAXDEPTH)

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

function ResetBoard() {

    var index = 0

    for (index = 0; index < BRD_SQ_NUM; ++index) {
        GameBoard.pieces[index] = SQUARES.OFFBOARD
    }

    for (index = 0; index < 64; ++index) {
        GameBoard.pieces[Sq120(index)] = PIECES.EMPTY
    }

    for (index = 0; inde < 14; ++index) {
        GameBoard.pList[index] = PIECES.EMPTY
    }

    for (index = 0; index < 2; ++index) {
        GameBoard.material[index] = 0
    }

    for (index = 0; index < 13; ++index) {
        GameBoard.pceNum[index] = 0
    }

    GameBoard.side = COLOURS.BOTH
    GameBoard.enPas = SQUARES.No_SQ
    GameBoard.fiftyMove = 0
    GameBoard.ply = 0
    GameBoard.hisPly = 0
    GameBoard.castlePerm = 0
    GameBoard.posKey = 0
    GameBoard.moveListStart[GameBoard.ply] = 0

}

function ParseFen(fen) {
    
    ResetBoard()

    var rank = RANKS.RANK_8
    var file = FILES.FILE_A
    var piece = 0
    var count = 0
    var i = 0
    var sq120 = 0
    var fenCnt = 0

    while ((rank >= RANKS.RANK_1) && fenCnt < fen.length) {
        count = 1
        switch (fen[fenCnt]) {
            case "p" : piece = PIECES.bP; break;
            case "r" : piece = PIECES.bR; break;
            case "n" : piece = PIECES.bK; break;
            case "b" : piece = PIECES.bB; break;
            case "k" : piece = PIECES.bK; break;
            case "q" : piece = PIECES.bQ; break;
            case "P" : piece = PIECES.wP; break;
            case "R" : piece = PIECES.wR; break;
            case "N" : piece = PIECES.wN; break;
            case "B" : piece = PIECES.wB; break;
            case "K" : piece = PIECES.wK; break;
            case "Q" : piece = PIECES.wQ; break;

            case '1' : 
            case '2' :
            case '3' :
            case '4' :
            case '5' :
            case '6' :
            case '7' :
            case '8' :
            piece = PIECES.EMPTY;
            count = fen[fenCnt].charCodeAt() - '0'.charCodeAt();
            break;

            case '/':
            case ' ':
                rank--;
                file = FILES.FILE_A;
                fenCnt++;
                contine;

            default:
                console.log("FEN error \n");
                return;
            
        }

        for (i=0; i < count; i++) {
            sq120 = FR2SQ(file, rank)
            GameBoard.pieces[sq120] = piece
            file++
        }

        fenCnt++
    }

    GameBoard.side = (fen[fenCnt] == "w") ? COLOURS.WHITE : COLOURS.BLACK
    fenCnt += 2

    for (i = 0; i < 4; i++) {
        if (fen[fenCnt] == " ") {
            break
        }
        switch(fen[fenCnt]) {
            case "K": GameBoard.castlePerm |= CASTLEBIT.WKCA; break;
            case "Q": GameBoard.castlePerm |= CASTLEBIT.WQCA; break;
            case "k": GameBoard.castlePerm |= CASTLEBIT.BKCA; break;
            case "q": GameBoard.castlePerm |= CASTLEBIT.BQCA; break;
            default: break;
        }
        fenCnt++
    }

    fenCnt++

    if (fen[fenCnt] != "-") {
        file = fen[fenCnt].charCodeAt() - "a".charCodeAt()
        rank = fen[fenCnt + 1].charCodeAt() - "1".charCodeAt()
        console.log("fen[fenCnt]: ", fen[fenCnt], "File: ", file, "Rank: ", rank)
        GameBoard.enPas = FR2SQ(file,rank)
    }

    GameBoard.posKey = GeneratePosKey()

    //check if fen string is correct or throw exception

}