
//JS逐帧动画
// Animation构造函数，
// cfg参数为一个对象，包括图片的名称img和动画的帧frames
function Animation (animArgs) {
	//枚举对象的属性(属性必须是可枚举的  enumerable为true)
	for (var attr in animArgs ) {
		this[attr] = animArgs[attr];
	}
}

Animation.prototype = {
	constructor: Animation,

	// Animation 包含的Frame, 类型:数组
	frames: null,
	// 包含的Frame数目
	frameCount: -1,
	// 所使用的图片id(在ImgCache中存放的Key), 字符串类型. 
	img: null,
	currentFrame: null,
	currentFrameIndex: -1,
	//currentFramePlayed用于当前帧已经播放的时间
	currentFramePlayed: 0,
	
	// 初始化Animation
	init: function () {
		// 根据id取得Image对象
		this.img = ImgCache[this.img] || this.img;
		
		this.frames=this.frames || [];
		this.frameCount = this.frames.length;
		
		// 缺省从第0帧播放
		this.setFrame(0);
	},
	
	//设置当前帧信息
	setFrame: function (index) {
		this.currentFrameIndex = index;
		this.currentFrame = this.frames[index];
		this.currentFramePlayed = 0;	
	},
	
	// 更新Animation状态. deltaTime表示时间的变化量.
	update: function (deltaTime) {
		//判断当前Frame是否已经播放完成, 
		if (this.currentFramePlayed >= this.currentFrame.duration) {
			//播放下一帧
			
			if (this.currentFrameIndex >= this.frameCount - 1) {
				//当前是最后一帧,则播放第0帧
				this.currentFrameIndex = 0;
			} else {
				//按顺序播放下一帧
				this.currentFrameIndex++;
			}
			//设置当前帧信息
			this.setFrame(this.currentFrameIndex);
		
		} else {
			//增加当前帧的已播放时间
			this.currentFramePlayed += deltaTime;
		}
	},
	
	//绘制Animation
	draw: function (gc, x, y) {
		var f = this.currentFrame;
		gc.drawImage(this.img, f.x , f.y, f.w, f.h , x, y, f.w, f.h );
	}
};
