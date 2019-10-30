let Tools = {
    /*
     * 定义一个函数，用来获取指定元素的当前的样式
     * 参数：
     * 		obj 要获取样式的元素
     * 		name 要获取的样式名
     */
    getStyle: function (obj, name) {
        if(window.getComputedStyle) {
            //正常浏览器的方式，具有getComputedStyle()方法
            return getComputedStyle(obj, null)[name];
        } else {
            //IE8的方式，没有getComputedStyle()方法
            return obj.currentStyle[name];
        }
    },

    /*
     * 参数：
     * 	obj:要执行动画的对象
     * 	attr:要执行动画的样式，比如：left top width height
     * 	target:执行动画的目标位置
     * 	speed:移动的速度(正数向右移动，负数向左移动)
     *  callback:回调函数，这个函数将会在动画执行完毕以后执行
     */
    move: function (obj, attr, target, speed, callback) {
        //关闭上一个定时器
        clearInterval(obj.timer);

        //获取元素目前的位置
        const current = parseInt(Tools.getStyle(obj, attr));

        if(current > target) {
            speed = -speed;
        }

        //开启一个定时器，用来执行动画效果
        obj.timer = setInterval(function() {
            //获取box1的原来的left值
            const oldValue = parseInt(Tools.getStyle(obj, attr));
            console.log(oldValue);

            //在旧值的基础上增加
            let newValue = oldValue + speed;

            //向左移动时，需要判断newValue是否小于target
            //向右移动时，需要判断newValue是否大于target
            if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
                newValue = target;
            }

            obj.style[attr] = newValue + "px";

            //当元素移动到0px时，使其停止执行动画
            if(newValue === target) {
                //达到目标，关闭定时器
                clearInterval(obj.timer);
                //动画执行完毕，调用回调函数
                callback && callback();
            }
        }, 30);
    },
};