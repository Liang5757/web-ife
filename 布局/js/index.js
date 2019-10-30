function Slider(obj, imgUrlList) {
    //获取imgList
    this.imgList = document.getElementsByClassName("carousel-inner")[0];
    //获取页面中所有的img标签
    this.imgArr = document.getElementsByTagName("img");
    //获取所有索引按钮
    this.indexBtn = document.querySelectorAll(".carousel-indicators li");
    //下一个按钮
    this.nextBtn = document.getElementById("next");
    //上一个按钮
    this.preBtn = document.getElementById("pre");
    //默认显示图片的索引
    this.index = 0;
    //计时器
    this.timer;
}

//设置imgList的宽度
imgList.style.width = 900 * imgArr.length + "px";
//设置初始样式
indexBtn[index].classList.add("index-active");

for (let i = 0; i < indexBtn.length; i++) {
    indexBtn[i].index = i;
    //为indexBtn绑定单击响应函数
    indexBtn[i].onclick = function () {
        index = this.index;

        //关闭自动切换的定时器
        clearInterval(timer);

        //设置选中的btn
        setIndexBtn(index);
        //切换图片
        Tools.move(imgList , "left" , -900*index , 100, function(){
            //动画执行完毕，开启自动切换
            autoChange();
        });
    };
}

nextBtn.onclick = function () {
    //关闭自动切换的定时器
    clearInterval(timer);

    //设置选中的btn
    setIndexBtn(index++);
    //切换图片
    Tools.move(imgList , "left" , -900*index , 100, function(){
        //动画执行完毕，开启自动切换
        autoChange();
    });
};

preBtn.onclick = function () {
    //关闭自动切换的定时器
    clearInterval(timer);

    //设置选中的btn
    setIndexBtn(index--);
    //切换图片
    Tools.move(imgList , "left" , -900*index , 100, function(){
        //动画执行完毕，开启自动切换
        autoChange();
    });
};

function setIndexBtn() {
    for(let i = 0 ; i < indexBtn.length; i++){
        indexBtn[i].classList.remove("index-active");
    }

    if (index < 0) {
        index = indexBtn.length - 1;
    }

    if (index > indexBtn.length - 1) {
        index = 0;
    }

    indexBtn[index].classList.toggle("index-active");
}

function autoChange() {
    //开启一个定时器，用来定时去切换图片
    timer = setInterval(function(){

        //使索引自增
        index++;

        //判断index的值
        index %= imgArr.length - 1;

        //执行动画，切换图片
        Tools.move(imgList , "left" , -900*index , 100 , function(){
            //修改导航按钮
            setIndexBtn();
        });

    },2000);
}

autoChange();