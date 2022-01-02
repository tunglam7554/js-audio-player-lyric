var fullLyric = `[length:04:38.88]
[re:www.megalobiz.com/lrc/maker]
[ve:v1.2.3]
[00:07.80]Chào cơn mưa
[00:10.05]Làm sao cứ kéo ta quay lại
[00:13.54]Những rung động con tim
[00:15.56]Lần đầu hai ta gặp gỡ
[00:18.55].
[00:21.80]Chào hàng cây
[00:24.05]Làm sao cố níu tay nhau lại
[00:27.80]Để thấy nồng nàn
[00:29.54]Đang về trên đôi mắt em
[00:32.55].
[00:34.29]Chợt nhìn đôi bàn tay em run nắm lấy bờ vai, rất lâu
[00:41.79]Cuối thu, với anh là ngày khiến hai hàng mi rối bời
[00:48.30]Vì ngày ấy gặp nhau không ai dám nói một câu chào nhau
[00:56.29]Cứ đắm đuối, cứ thế hát bài hát chia xa
[01:03.79].
[01:05.30]Mùa thu rơi vào em vào trong giấc mơ hôm qua
[01:13.05]Mùa thu ôm mình em chạy xa vòng tay vội vã
[01:20.55]Lời em nói ngày xưa đâu đây vẫn âm thầm chìm vào trong mây
[01:27.55]Đến bao giờ, dặn lòng anh không mong nhớ
[01:34.30]Mùa thu rơi vào em vào trong chiếc hôn ngây thơ
[01:41.29]Mùa thu không cần anh, vì em giờ đây còn mãi hững hờ
[01:48.80]Ngày mai kia nếu có phút giây vô tình thấy nhau sẽ nói câu gì
[01:56.05]Hay ta chỉ nhìn lặng lẽ đi qua
[02:04.05].
[02:18.30]Chào cơn mưa
[02:20.55]Làm sao cứ kéo ta quay lại
[02:24.05]Những rung động con tim
[02:26.05]Lần đầu hai ta gặp gỡ
[02:28.80].
[02:32.30]Chào hàng cây
[02:34.55]Làm sao cố níu tay nhau lại
[02:38.30]Để thấy nồng nàn
[02:40.05]Đang về trên đôi mắt em
[02:43.31].
[02:44.80]Chợt nhìn đôi bàn tay em run nắm lấy bờ vai, rất lâu
[02:52.30]Cuối thu, với anh là ngày khiến hai hàng mi rối bời
[02:58.80]Vì ngày ấy gặp nhau không ai dám nói 1 câu, chào nhau
[03:06.80]Cứ đắm đuối, chẳng thể chia xa
[03:13.05]Mùa thu rơi vào em vào trong giấc mơ hôm qua
[03:20.05]Mùa thu ôm mình em rời xa vòng tay vội vã
[03:27.55]Lời em nói ngày xưa đâu đây vẫn âm thầm chìm vào trong mây
[03:34.55]Đến bao giờ, dặn lòng anh không mong nhớ
[03:41.29]Mùa thu rơi vào em vào trong chiếc hôn ngây thơ
[03:48.30]Mùa thu không cần anh, vì em giờ đây còn mãi hững hờ
[03:55.80]Ngày mai kia nếu có phút giây vô tình thấy nhau sẽ nói câu gì
[04:08.04]Hay ta chỉ nhìn, lặng lẽ, đi qua..
[04:16.04].`;
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

$('#player').on('play', function () {
    $('.img').addClass('rotate');
})

$('#player').on('pause', function () {
    $('.img').removeClass('rotate');
})
