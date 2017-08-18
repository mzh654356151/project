//enemy图片的大小为200x50，每个部分的大小为50x50。它的y坐标会比player大10

function createEnemy () {

	var r = getRandom(0, 1);	
	var enemyArgs = {

		img: "enemy",
		x: r ? 500 : 0,
		y: 294,

		//x/y坐标的最大值和最小值, 可用来限定移动范围.
		minX: 0,
		maxX: 500,
		minY: 0,
		maxY: 294,
		
		//enemy将只会在x轴上移动，并且移动速度只会在一个范围内小幅度变化，y坐标不变
		handleInput: function () {
			var s = getRandom (-4, 4);
			var moveSpeed = (150 + s * 10) / 1000;
			this.speedX = this.speedX || moveSpeed;

			if (this.x <= this.minX){
				this.x = this.minX;
				this.speedX = moveSpeed;
			} else if (this.x >= this.maxX){
				this.x = this.maxX;
				this.speedX = -moveSpeed;
			}
		},

		defaultAnimId: "move",		
		anims: {
			"move": new Animation({
					img: "enemy" ,
					frames: [
						{ x: 0, y: 0, w: 50, h: 50, duration: 100 },
						{ x: 50, y: 0, w: 50, h: 50, duration: 100 },
						{ x: 100, y: 0, w: 50, h: 50, duration: 100 },
						{ x: 150, y: 0, w: 50, h: 50, duration: 100 }
					]
				})
		}
			
	};
	return new Sprite(enemyArgs) ;
}



