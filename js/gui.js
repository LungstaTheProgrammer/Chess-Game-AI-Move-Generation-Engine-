$("#SetFen").click(() => {
    var fenStr = $("#fenIn").val()
    ParseFen(fenStr)
    PrintBoard()
    PerftTest(5)
})