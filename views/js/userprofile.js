var userId = 0;
$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');
    $.ajax({
        url: "/userprofile",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(user) {
                    $(".profile").append(`
                        <article>
                        <h2>Hello, ${user.username}</h2>
                        <div>
                           Username :  ${user.username} <br>
                           Email :  ${user.email} <br>
                           Phone :  ${user.phone} <br>
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