$(() => {
    init()
    console.log("Main init called")

    ParseFen(START_FEN)
    PrintBoard()
    GenerateMoves()
    CheckBoard()
    MakeMove(GameBoard.moveList[0])
    PrintBoard()
    CheckBoard()
    TakeMove()
    PrintBoard()
    CheckBoard()

    
    // var piece1 = RAND_32()
    // var piece2 = RAND_32()
    // var piece3 = RAND_32()
    // var piece4 = RAND_32()

    // var key = 0
    // key ^= piece1
    // key ^= piece2
    // key ^= piece3
    // key ^= piece4
    // console.log("key:", key.toString(16))
    // key ^= piece1
    // console.log("Piece 1 out key:", key.toString(16))
    // key = 0
    // key ^= piece2
    // key ^= piece3
    // key ^= piece4
    // console.log("build on piece1:", key.toString(16))

})

function InitFilesRankBrd() {
    var index = 0
    var file = FILES.FILE_A
    var rank = RANKS.RANK_1
    var sq = SQUARES.A1

    for (index = 0; index < BRD_SQ_NUM; ++index) {
        FilesBrd[index] = SQUARES.OFFBOARD
        RanksBrd[index] = SQUARES.OFFBOARD
    }

    for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for (file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            sq = FR2SQ(file, rank)
            FilesBrd[sq] = file
            RanksBrd[sq] = rank
        }
    }
    // console.log("filerankinit done")
}

function InitHashKeys() {
    var index = 0

    for (index = 0; index < 14*120; ++index) {
        PieceKeys[index] = RAND_32()
    }

    SideKey = RAND_32()

    for (index = 0; index < 16; ++index) {
        CastleKeys[index] = RAND_32()
    }
    // console.log("hashkeys done")
}

function InitSq120To64() {
    var index = 0
    var file = FILES.FILE_A
    var rank = RANKS.RANK_1
    var sq  = SQUARES.A1
    var sq64 = 0

    for (index = 0; index < BRD_SQ_NUM; ++index) {
        Sq120ToSq64[index] = 65
    }

    for (index = 0; index < 64; ++index) {
        Sq64ToSq120[index] = 120
    }

    for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for (file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            sq = FR2SQ(file, rank)
            Sq64ToSq120[sq64] = sq
            Sq120ToSq64[sq] = sq64
            sq64++
        }
    }
    // console.log("sq120to64 done")
}

function InitBoardVars() {
    var index = 0
    for (index = 0; index < MAXGAMEMOVES; ++index) {
        GameBoard.history.push({
            move : NOMOVE,
            castlePerm : 0,
            enPas : 0,
            fiftyMove : 0,
            posKey : 0
        })
    }
}

function init() {
    console.log("init() called")
    InitFilesRankBrd()
    InitHashKeys()
    InitSq120To64()
    InitBoardVars()
}