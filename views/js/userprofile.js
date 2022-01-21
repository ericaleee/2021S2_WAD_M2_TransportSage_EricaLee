var userId = 0;
$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('token');
    $.ajax({
        url: '/userprofile/' + userId,
        method: "get"
    })
        .done(
            function (user) {
                    $("#profile").text(user.username);
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
})