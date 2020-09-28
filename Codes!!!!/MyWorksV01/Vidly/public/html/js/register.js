$(document).ready(function() {



    $('#sumbit').click(function() {


        $.post("http://84.108.78.137:1029/api/user", {
            name: $("#name_inp").val(),
            lastName: $("#lastName_inp").val(),
            email: $("#email_inp").val(),
            userName: $("#UserName_inp").val(),
            password: $("#inp_password").val(),
            phone: $("#phone_inp").val()
        }).done(function(data) {

            alert("Data Loaded: " + data);
            changeWindow("http://84.108.78.137:1029/wellcome");
        });


    });



});


changeWindow = (url) => {

    window.location.replace(url)

}