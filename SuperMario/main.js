
function Game (FPS) {
    //构造函数模式用于定义实例属性
    this.FPS = FPS;
    this.gc = null;
    this.sleep = 0;
    this.sprites = [];
}

Game.prototype = {
	//原型模式用于定义方法和共享的变量
	constructor: Game,
	
	width: 600,
	height: 400,
	//score用于显示你完成游戏经过的时间
	score: document.querySelector('strong'),
	
	init: function () {
	    
	    this.canvas = document.getElementById('canvas');
		this.gc = this.canvas.getContext("2d");

		this.initEvent();
		this.sleep = Math.floor(1000 / this.FPS);
		
		for (var i = 0, len = this.sprites.length; i < len; i++){

			this.sprites[i].init();
		}

	},

	initEvent: function() {
		//监听整个document的keydown,keyup事件	
		document.addEventListener("keydown",　function(event)　{
			//按下某按键, 该键状态为true 
			KeyState[event.keyCode] = true;
		}, false);
		document.addEventListener("keyup", function(evt)　{
			//放开下某按键, 该键状态为true 
			KeyState[event.keyCode] = false;
		}, false);	
	},
		
	start: function(){
		var that = this;
		//记录游戏的开始时间, Date.now返回调用这个方法时的日期和时间的毫秒数
		that.startTime = Date.now();
		//主循环
		this.mainLoop = setInterval(function () {	
			//距上一次执行相隔的时间.(时间变化量), 目前可近似看作sleep.
			var deltaTime = that.sleep;
			that.run(deltaTime);
		}, that.sleep);
	
	},
	
	//主循环中要执行的操作
	run: function (deltaTime) {
         //playedTime保存已经过的时间，单位为秒
	     var playedTime = ((Date.now() - this.startTime) / 1000).toFixed(1); 
	     this.score.innerHTML = playedTime;

		//碰撞检测
		var coll = this.checkCollide();
		if (coll) {
			//如果发生敌人和玩家的碰撞,则结束游戏.
			clearInterval(this.mainLoop);
			document.querySelector('.restart').style.display = 'inline'
			return;
		}
			
		this.update(deltaTime);
		this.clear(deltaTime);
		this.draw(deltaTime);

		//处理输入,当前输入,影响下一次迭代.
		this.handleInput();

	},

	//碰撞检测,如果超级玛丽与敌人发生碰撞，则函数返回true
	checkCollide: function () {
		//本示例中, 主角为第一个精灵.
		var player = this.sprites[0];
		for (var i = 1,len = this.sprites.length; i < len; i++) {
			var sprite = this.sprites[i];
			var coll = sprite.collideWidthOther(player);
			if (coll) {
				return coll;
			}
		}
		return false;
	},
	
	update: function (deltaTime){
		for (var i = 0,len = this.sprites.length; i < len; i++){
			var sprite = this.sprites[i];
			sprite.update(deltaTime);
		}
	},

	clear: function (deltaTime) {
		//使用背景覆盖的方式 清空之前绘制的图片
		this.gc.drawImage(ImgCache["bg"], 0, 0);
	},
	
	draw: function (deltaTime) {
		for (var i = 0,len = this.sprites.length; i < len; i++) {
			var sprite=this.sprites[i];
			sprite.draw(this.gc);
		}
	},
	handleInput: function () {
		for (var i = 0,len = this.sprites.length; i < len; i++) {
			var sprite = this.sprites[i];
			if (sprite.handleInput) {
				sprite.handleInput();
			}
		}
	}
	
};
