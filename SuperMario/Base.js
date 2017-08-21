
// js异步加载图片,当图片全部加载完成后，调用callback函数。
function loadImage (srcList, callback) {
    //总共需要加载的图片数量
    var totalCount = srcList.length;
    //当前已经加载完成的图片数量         
    var loadedCount = 0;                     

    for (var i = 0; i < totalCount; i++) {
        //取得每一张图片的信息(包含属性id和url).
        var img = srcList[i];                
        var image = new Image();     
        image.src = img.url;

        //将加载好的图片保存在ImgCache中，这是一个全局变量
        ImgCache[img.id] = image;           

        image.addEventListener('load', function () {
            loadedCount++;
        }, false)      
    }
    if (typeof callback === 'function') {
        //保持this引用，因为在定时器中的函数，this引用会丢失。
        var that = this;     
        function check () {
            if (loadedCount >= totalCount) {
                // callback.apply(Me, arguments);
                callback.bind(that)();
            } else {      
                setTimeout(check, 100);
            }   
        }
        check();
    }
}

//取得闭区间(包含lower，higher)的随机整数
function getRandom(lower, higher) {

    if (typeof lower != 'number' || typeof higher != 'number') {
        alert('输入的参数类型错误');
        return
    }
    var choices = higher - lower + 1;
    return Math.floor(choices * Math.random()) + lower; 
}

//定义全局对象
var ImgCache = {};

//用来记录按键状态
var KeyState = {};

