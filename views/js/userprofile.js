$(function() {
    $.ajax({
        url: "/userprofile",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(address) {
                    $(".addresses").append(`
                        <article>
                        <h3><a href="/edit?id=${address._id}">${address.name}</a></h3>
                        <div>
                            Description: ${address.description}<br>
                            Address: ${address.address}<br>
                            Postal Code: ${address.postal}<br>
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

    $(".addAddress").click(function () {
        $(".addNewAddress").show();
    })
})


function addAddress() {
    var newAddress = {
        name: $("#name").val(),
        description: $("#description").val(),
        address: $("#address").val(),
        postal: $("#postal").val(),
    };

    $.ajax({
        url:"/userprofile?token="+sessionStorage.authToken,
        method:"POST",
        data: newAddress
    })
    .done(function(data){
        $(".statusMessage").text(data);
        setTimeout(function(){
            location.reload();
        },3000);
    })
    .fail(function(err){
        $(".statusMessage").text("Unable to add new address");
    })
    return false;
}