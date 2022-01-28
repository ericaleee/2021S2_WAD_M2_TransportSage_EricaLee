var addId = 0;
$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    addId = urlParams.get('id');

    $.ajax({
        url: "/userprofile/" + addId,
        method: "get"
    }).done(
        function (address) {
            $('#name').val(address.name);
            $('#description').val(address.description);
            $('#address').val(address.address);
            $('#postal').val(address.postal);
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    $(".deleteAddBtn").on('click', function() {
        $.ajax(
            {
                url: '/userprofile/'+addId+"?token="+sessionStorage.authToken,
                method: 'delete'
            }
        ).done(
            function (data) {
                alert("Address deleted!");
                window.location.href = "/profile";
            }
        ).fail(
            function (err) {
                console.log(err.responseText);
            }
        );
    });
});

function editAddress() {
    var address = {
        id: addId,
        name: $("#name").val(),
        description: $("#description").val(),
        address: $("#address").val(),
        postal: $("#postal").val(),
    };
    $.ajax(
        {
            url: '/userprofile?token='+sessionStorage.authToken,
            method: 'put',
            data: address
        }
    ).done(
        function (data) {
            alert("Address updated!");
            window.location.href = "/profile";
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
    return false;
}