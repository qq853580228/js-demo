function Time(obj, target, callback) {
    // callback=function(){}

    // 如果是用按钮触发定时器，就会一直开启新的定时器，导致有多个定时器一起执行
    // 解决方案 让元素只有一个定时器执行
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // step：补偿目标 => 步长公式：(目标值target-现在的位置obj.offsetLeft)/10
        var step = (target - obj.offsetLeft) / 10;
        // 注意：步长值在计算过程存在小数运算，所以需要手动把步长值进行取整
        // 步长值为正，步长值往上取整，步长值为负，步长值往下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数需要等定时器结束的时候才开始执行
            callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}