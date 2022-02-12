
$(function () {
    $.ajax({
        url: "/bservices",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (bservices) {
                    $(".busservices").append(`
                        <article>
                        <h2>${bservices.ServiceNo}</h2>
                        <div>
                          OriginCode:  ${bservices.OriginCode}
                          <div class="flexbig"
                          <div class="flex">
                          DestinationCode: ${bservices.DestinationCode}
                          </div>
                          <div class="flex">
                          AM_Peak_Freq: ${bservices.AM_Peak_Freq}<br>
                          PM_Peak_Freq: ${bservices.PM_Peak_Freq}
                        </div>
                        </div>
                        </div>
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
})

