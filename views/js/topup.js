$(function () {
    $.ajax({
        url: "/topup",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (topup) {
                    $(".topup"), append(`
                  <article>
                  
                <div>
                bankacc : ${topup.bankacc}<br>
                ezlinkID : ${topup.ezlinkID}<br>
                topupAmount : ${topup.topupAmount}<br>
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

    $(".addTopup").click(function () {
        $(".addNewTopup").show();
    })
})