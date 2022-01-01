var fullLyric = `[length:03:54.21]
[re:www.megalobiz.com/lrc/maker]
[ve:v1.2.3]
[00:16.09]Em như là đại dương xanh ngắt khiến bao người ao ước
[00:19.89]Còn anh là đám lá khô rơi lặng yên
[00:23.59]Ánh nắng đến vây quanh em
[00:26.33]Còn nơi anh tàn tro quấn lấy..
[00:29.58]Anh như ngàn vì sao biến mất khi huy hoàng
[00:32.59]Còn em là bình minh đem theo trong tim muôn vàn rạng rỡ
[00:37.84].
[00:40.59]Ta vốn không thuộc về nhau , sinh ra đã là thứ đối lập nhau
[00:44.84].
[00:46.84]Như nam châm ta có hai cực hút
[00:48.33]Nhưng sẽ đẩy nhau nếu quay đầu ngược hướng
[00:50.09]Như là bóng đêm đôi chân sẽ bước lạc nhưng chợt nhận ra khi mặt trời dẫn đường
[00:53.59]Rồi sẽ bùng cháy như những đám tro tàn hay lại hồi sinh theo từng giọt mưa rơi
[00:57.09]Như kẻ mộng du với vương quốc mơ màng rồi chợt tỉnh giấc khi bình minh vừa tới
[01:00.34]Như tương lai em gạt đi, anh vội tô màu xanh cho quá khứ
[01:03.59]Giữa sa mạc khô nhưng vòng tay anh lạnh căm như đóng băng một nửa
[01:07.08]Chơ vơ anh đứng giữa bóng đêm
[01:08.84]Để chờ thấy chút ánh sáng em còn lại
[01:12.33]Nhưng mà đâu thấy
[01:14.34]Ngôi sao trên cao lấp lánh
[01:16.84]Ánh lên ngàn hy vọng rồi lại vụt biến mất
[01:20.33]Chẳng có định nghĩa nào là đúng nhất
[01:24.34]Hành tinh vẫn cứ xoay thôi
[01:27.59]Không thể khiến ngày chạm vào đêm đen tối
[01:30.34]Cũng như không cách nào để hai ta chung lối
[01:33.59]Vạn vật sẽ biến tan cùng em
[01:37.84]Anh lang thang với trái tim ngủ yên
[01:40.59]Em như là đại dương xanh ngắt khiến bao người ao ước
[01:44.58]Còn anh là đám lá khô rơi lặng yên
[01:48.09]Ánh nắng đến vây quanh em
[01:50.83]Còn nơi anh tàn tro quấn lấy
[01:53.84]Anh như ngàn vì sao biến mất khi huy hoàng
[01:57.34]Còn em là bình minh đem theo trong tim muôn vàn rạng rỡ
[02:04.83]Ta vốn không thuộc về nhau, sinh ra đã là thứ đối lập nhau
[02:08.84].
[02:21.09]Bỏ lại quá khứ
[02:22.58]Nhìn về tương lai
[02:24.34]Hành trang ta có sẽ mang theo suốt đời
[02:27.59]Cùng tình yêu kia dù gặp lại nhau cũng chẳng thể nói
[02:36.09]Em như là đại dương xanh ngắt khiến bao người ao ước
[02:40.09]Còn anh là đám lá khô rơi lặng yên
[02:43.84]Ánh nắng đến vây quanh em
[02:46.60]Còn nơi anh tàn tro quấn lấy
[02:49.83]Anh như ngàn vì sao biến mất khi huy hoàng
[02:53.09]Còn em là bình minh đem theo trong tim muôn vàn rạng rỡ
[02:57.83].
[03:00.59]Ta vốn không thuộc về nhau, sinh ra đã là thứ đối lập nhau
[03:05.09]Chẳng đặt tên cho nỗi đau
[03:08.34]Nụ cười in dấu tháng ngày ta đã đánh mất phía sau
[03:14.34]Ánh nắng che mờ giông tố, ngăn cơn mưa trong em ngừng rơi
[03:19.33]Hãy bước tiếp tới bình yên khác
[03:22.59]Em sẽ cất giấu trong tim, hãy quên nhau đi ta vốn đã không thuộc về nhau
[03:33.09].`;
var displayLine = 9;
var middle = Math.round(displayLine / 2);
var lassIndex = -1;
var lines = fullLyric.split("\n");
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
