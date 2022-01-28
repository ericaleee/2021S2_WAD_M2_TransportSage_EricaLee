$(function() {
    $.ajax({
        url: "/availservices",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(service) {
                    $(".services").append(`
                        <article>
                        <h2><a href="/${service.link}">${service.name}</a></h2>
                        <div>
                            ${service.description}<br>
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

    // $(".addEvent").click(function () {
    //     $(".addNewEvent").show();
    // })
})