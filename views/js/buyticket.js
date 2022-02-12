$(function () {
    $.ajax({
        url: "/buyticket",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (tickets) {
                    $(".buyticket"), append(`
                  <article>
                <div>
                date : ${tickets.date}<br?
                numofticket : ${tickets.numofticket}<br>
                totalamount : ${btickets.totalamount}<br>
                cardnum : ${tickets.cardnum}<br>
                <div>
                        </article>
                    `);
                })
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

    $(".addbuyticket").click(function () {
        $(".addNewbuyticket").show();
    })
})
