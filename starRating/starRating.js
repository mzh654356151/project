//跨浏览器的事件对象
var EventUtil = {
    addHandle: function (element, type, handle) {
        if (element.addEventListener) {
            element.addEventListener(type, handle, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handle);
        } else {
            element['on' + type] = handle;
        }
    },
    removeHandle: function (element, type, handle) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handle, false);
        } else if (element.detachevent) {
            element.detachevent('on' + type, handle);
        } else {
            element['on' + type] = null;
        }
    },
    getEvent:function (event) {
        return event || window.event
    },
    getTarget: function (event) {
        return event.target || event.srcElement
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
//简化访问DOM的操作
function $ (str, ele) {
    return typeof ele !== 'object' ? document.querySelector(str)
           : ele.querySelector(str);
}
function $$ (str, ele) {
    return typeof ele !== 'object' ? document.querySelectorAll(str)
           : ele.querySelectorAll(str);
}

var starRating = $('#star-rating'),
    ul = $('ul', starRating),
    liList = $$('li', ul),
    span = $$('span', starRating)[1],
    p = $('p', starRating),
    score = clickScore = 0;
    messages = [
        '很不满意|差的太离谱，与卖家描述的严重不符，非常不满',
        '不满意|部分有破损，与卖家描述的不符，不满意',
        '一般|质量一般，没有卖家描述的那么好',
        '满意|质量不错，与卖家描述的基本一致，还是挺满意的',
        '非常满意|质量非常好，与卖家描述的完全一致，非常满意'
    ];
//为每个li添加index属性，快速得出评分
for (let i = 0; i < liList.length; i++) {
  	liList[i].index = i + 1;
}
//利用事件冒泡,在ul上注册事件，在li上发生的mouseover事件会冒泡到ul上
EventUtil.addHandle(ul, 'mouseover', function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if (target.nodeName === 'LI') {
      var str1 = messages[target.index - 1].split('|')[0],
          str2 = messages[target.index - 1].split('|')[1];
      score = target.index;
      findPoint(score);
      p.style.display = 'block';
      p.style.left = ul.offsetLeft + target.index * target.offsetWidth
                       - 104 + 'px';	     
      p.innerHTML = '<em>' + target.index + '分' + str1 + '</em>'
                    + str2;
      }	               
});
//注册mouseout事件
EventUtil.addHandle(ul, 'mouseout', function (event) {
	findPoint(clickScore);
	p.style.display = 'none';
});
//注册click事件
EventUtil.addHandle(ul, 'click', function (event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if (target.nodeName === 'LI') {
	    var str1 = messages[target.index - 1].split('|')[0],
	        str2 = messages[target.index - 1].split('|')[1],
	    score = clickScore = target.index;
	    findPoint(score);
	    span.style.display = 'block';
	    span.innerHTML = '<strong>' + score + '</strong>分' + '(' + str2 + ')';
	}
});
//点亮对应的星星(class属性为on则将background切换到点亮的星星上)
function findPoint (sco) {
	for (let i = 0; i < liList.length; i++) {
	    liList[i].className = i < sco ? 'on' : '';

	}
}


