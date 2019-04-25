var perft_leafNodes

function Perft(depth) {
    // console.log("works")
    if (depth == 0) {
        perft_leafNodes++
        return
    }

    GenerateMoves()

    var index
    var move

    for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
        move = GameBoard.moveList[index]
        // console.log(GameBoard.move)
        if (MakeMove(move) == BOOL.FALSE) {
            // console.log("MakeMove is false")
            continue
        }
        Perft(depth - 1)
        TakeMove()
    }

    return

}

function PerftTest(depth) {
    // console.log("works")
    PrintBoard()
    console.log("Starting Test To Depth: " + depth)
    perft_leafNodes = 0

    var index
    var move
    var moveNum = 0
    // GameBoard.moveListStart[GameBoard.ply + 1] = 1
    // console.log(GameBoard.moveListStart[GameBoard.ply] + "  " + GameBoard.moveListStart[GameBoard.ply + 1])
    GenerateMoves()
    for (index = GameBoard.moveListStart[GameBoard.ply]; index < GameBoard.moveListStart[GameBoard.ply + 1]; ++index) {
        // console.log("loop works")
        move = GameBoard.moveList[index]
        if (MakeMove(move) == BOOL.FALSE) {
            // console.log("false move")
            continue
        }
        moveNum++
        var cumnodes = perft_leafNodes
        Perft(depth - 1)
        TakeMove()
        var oldnodes = perft_leafNodes - cumnodes
        console.log("Move: " + moveNum + " " + PrMove(move) + " " + oldnodes)
    }

    console.log("Test Complete: " + perft_leafNodes + " leaf nodes visited")

    return
}