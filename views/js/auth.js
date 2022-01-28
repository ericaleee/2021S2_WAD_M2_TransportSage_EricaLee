$(function() {

    // handles the clicking of the logout function
    $(".logoutLink").on("click", function(e){
        //prevents the browser from navigating to "#", as defined by the <a href> tag
        e.preventDefault();
        
        $.ajax({
            url: "/logout?token="+sessionStorage.authToken,
            method:"get"
        })
        .done(function(data){
            sessionStorage.removeItem("authToken");
            //go to loginpage
            window.location.href="/";
        })
        .fail(function(err){
            console.log(err.responseText);
        })
    })
});

function login() {
    var credentials = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.ajax({
        url:"/",
        method:"post",
        data:credentials
    })
    .done(function(data){
        $(".statusMessage").text(data.message);
        sessionStorage.authToken=data.token;
        window.location.href="/home";
    })
    .fail(function(err){
        $(".statusMessage").text(err.responseText);
    })
    return false;
}

function register() {
    var newUser = {
        username: $("#username").val(),
        password: $("#password").val(),
        phone: $("#phone").val(),
        email: $("#email").val()
    }
    $.ajax({
        url: "/register",
        method: "post",
        data: newUser
    })
    .done(function(data){
        $(".statusMessage").text(data);
        window.location.href="/";
    })
    .fail(function (err){
        $(".statusMessage").text(err);
    })
    return false;
}