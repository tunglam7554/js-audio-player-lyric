var fullLyric = "";
$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44394/api/baihat/fd9b85d7-1d2e-42f6-85d0-6063a1781556",
        success: function (data) {
            $('title').text(data.tenBaiHat);
            //$("#player-source").attr('src', `https://localhost:44394/Uploads/Musics/${data.idBaiHat}/${data.fileBaiHat}`);
            $(".thumb").attr('src', `https://localhost:44394/Uploads/Musics/${data.idBaiHat}/${data.fileAnh}`);
            fullLyric = data.loiBaiHat;
            getLyric();
        }
    })
})

function getLyric() {
    var displayLine = 9;
    var middle = Math.round(displayLine / 2);
    var lassIndex = -1;
    var lines = fullLyric.split("[");
    var lyric = [];
    lines.forEach(line => {
        var index = line.indexOf(']') + 1;
        var text = line.substring(index);
        if (text == "") text = "*";

        var times = line.substring(1, index - 1).split(':').reverse();
        var time = 0;
        time = times[0] ? time + parseFloat(times[0]) : time;
        time = times[1] ? time + parseFloat(times[1]) * 60 : time;
        time = times[2] ? time + parseFloat(times[2]) * 3600 : time;

        var line = {
            text: text,
            time: time
        };
        lyric.push(line);
    })
    console.log(lyric);
    var text = "";
    lyric.forEach((line, index) => {
        text += `<p class="text-lyric" id="line-${index}">${line.text}</p>`;
    })
    $('#lyric').html(text);
    var player = document.getElementById("player");
    $('#player').on("timeupdate", function () {
        var currentIndex = lyric.findIndex(line => {
            return line.time > player.currentTime;
        })
        currentIndex -= 1;

        if (lassIndex != currentIndex) {

            var start = currentIndex - middle + 1;
            if (start < 0) start = 0;

            var end = start + displayLine;
            if (end > lyric.length) end = lyric.length;

            $('.text-lyric').removeClass('show').removeClass('current');
            for (let index = start; index < end; index++) {
                $(`#line-${index}`).addClass("show");
            }
            $(`#line-${currentIndex}`).addClass('current');

            lassIndex = currentIndex;
            console.log(`${player.currentTime} : ${$(`#line-${currentIndex}`).text()}`);
        }

    })
}


$('#player').on('play', function () {
    $('.img').addClass('rotate');
})

$('#player').on('pause', function () {
    $('.img').removeClass('rotate');
})
