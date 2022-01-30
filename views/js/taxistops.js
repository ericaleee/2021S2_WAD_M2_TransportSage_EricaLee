$(function() {
    $.ajax({
        url: "/stops",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(stops) {
                    $(".taxistops").append(`
                        <article>
                        <h2>${stops.Name}</h2>
                        <div>
                          <h3>Type:  ${stops.Type}</h3>
                          <div class="flexbig"
                          <div class="flex">
                          Code: ${stops.TaxiCode}
                          </div>
                          <div class="flex">
                        Latitude: ${stops.Latitude}<br>
                        Longtitude: ${stops.Longitude}
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