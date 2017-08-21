// 页面初始化函数
function init(){
    
    // 加载图片,并存入全局变量 ImgCache,
    // 加载完成后,调用startDemo
    loadImage( [ 
            {   id : "player",
                url : "res/player.png"
            },
            {   id : "enemy",
                url : "res/enemy.png"
            },
            {   id : "bg",
                url : "res/bg.png"
            }
        ], 
        startDemo );
}

//定义游戏所用 按键的keyCode的常量
var Key = {
    A: 65, 
    W: 87,
    D: 68
}

// Demo的启动函数
function startDemo () {

    //创建game对象,传入参数为FPS
    game = new Game(30);

    //将必要的精灵加入game的精灵列表里
    //加入马里奥
    game.sprites.push(createPlayer());
    // 加入五个敌人
    for (var i = 0; i < 4; i++) {
        game.sprites.push(createEnemy());
    }
    
    //初始化game
    game.init();   
    //开始game
    game.start();
}

document.querySelector('.restart').addEventListener('click', function (event) {
    var target = event.target;
    target.style.display = 'none';
    init();
}, false)
document.body.addEventListener('load', function () {
    init();
}, false)
