$("#SetFen").click(() => {
    var fenStr = $("#fenIn").val()
    console.log(fenStr)
    if (fenStr != "") {
        ParseFen(fenStr)
    } else {
        ParseFen(START_FEN)
    }
    PrintBoard()
    SearchPosition()
})