$(document).ready(function () {
    
    $(".chirp").on('click', postChirp);
    $('.chirp').prop('disabled', true);
    $('#textbox').on('input', function () {
        $('.chirp').prop('disabled', $(this).val().length === 0);
    });

    $('#textbox').focus();

    function getChirps() { 
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/chirps',
        contentType: 'application/json',
            }).then(function (success) {
            for (var i = 0; i < success.length; i++) {
                $('#list-content').prepend('<li class="list-group-item">' + success[i].user + ':' + success[i].message + '/' + success[i].timestamp + '</div>');
            };
        });
};

    function postChirp() {
        console.log('posted');
        var chirpies = {
            message: $('#textbox').val(),
            user: "jesse",
            timestamp: new Date()
        }

        $.ajax({
            method: 'POST',
            url: "http://localhost:3000/api/chirps",
            contentType: 'application/json',
            data: JSON.stringify(chirpies),
        }).then(function () {
            // console.log('working');
            $('#list-content').prepend('<li class="list-group-item">' + chirpies.user + ':' + chirpies.message + '/' + chirpies.timestamp + '</div>')}); 
            $('#textbox').val('');
            $('.chirp').prop('disabled', true);
    };

  getChirps();
});