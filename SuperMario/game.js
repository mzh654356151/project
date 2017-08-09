
function loadImage (srclist, callback) {
    var len = srclist.length,
        loadedCount = 0,             //表示已经加载好的图片数量
        imgs = {};                   //保存加载的图片
    for (var i = 0; i < len; i++) {
        var imgObj = srclist[i];     //包含一个id属性和src属性
        var image = new Image();

        // imgs[srclist[i].id] = image;
        ImgCache[srclist[i].id] = image; //直接用一个全局变量保存加载的图片

        image.src = srclist[i].src;
        image.addEventListener('load', function () {
         	loadedCount++;
        })
    }
    if (typeof callback == 'function') {
    	var that = this;             //保存this，因为下面的定时器中this绑定会丢失
    	function check () {
    		if (loadedCount === len) {
    			callback.call(this);
    		} else {
    			setTimeout(check, 100);
    		}
    	}
    	check();
    }
    // return imgs
}
function startDemo () {
    // context.drawImage(ImgCache['bg'], 0, 0);
    // context.drawImage(ImgCache['player'], 0, 0, 50, 60, 0, 284, 50, 60);

    var FPS = 30;   //每秒传输帧数Frames Per Second
    var sleep = Math.floor(1000 / FPS);    //30.3毫秒
    var img = ImgCache['player'];

    var x = 0, y = 284;
    var minX = 0, maxX = 550,
        minY = 0, maxY = 284;
    var speedX = 65 / 1000, speedY = -45 / 1000;
    var count = 0;    
    var mainloop = setInterval(function () {
    	var deltaTime = sleep;
    	x += speedX * deltaTime;
    	// y += speedY * deltaTime;
    	x = Math.max(minX, Math.min(maxX, x));
    	y = Math.max(minY, Math.min(maxY, y));



    	// //使用背景覆盖的方式，清空之前绘制的图片
    	// context.drawImage(ImgCache['bg'], 0, 0);
    	// //在新的位置上绘制图片
    	// context.drawImage(ImgCache['player'], 0, 0, 50, 60, x, y, 50, 60);
    	
    	var px = 0
    	var py = (count % 2 === 0) ? 0 : 60;
    	// console.log(count);
        // var px = 0, py = 0;  	
    	if (x === maxX) {
    		py = 60;
    		speedX = -speedX;
    		count++;
    	}
    	if (x === minX) {
    		py = 0;
    		speedX = -speedX;
    		count++;    		
    	}
    	context.drawImage(ImgCache['bg'], 0, 0);    	
    	context.drawImage(ImgCache['player'], px, py, 50, 60, x, y, 50, 60);  

    }, sleep)

}


var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
// var ImgCache = loadImage([
// 	{ id: 'bg', src: 'res/bg.png' },
//     { id: 'player', src: 'res/player.png' }
// ], startDemo)

var ImgCache = {};
loadImage([
    { id: 'bg', src: 'res/bg.png' },
    { id: 'player', src: 'res/player.png' }
], startDemo)

// var bgImage = new Image();
// bgImage.src = 'res/bg.png';
// //图片是异步加载的，所有要在图片加载完触发事件
// bgImage.addEventListener('load', function (event) {
//     var loadedImg = event.target;
//     context.drawImage(loadedImg, 0, 0);
// }, false)

// var player = new Image();
// player.src = 'res/player.png';
// player.addEventListener('load', function (event) {
//     var loadedImg = event.target;
//     context.drawImage(loadedImg, 0, 0, 50, 60, 0, 0, 50, 60);
// }, false)

