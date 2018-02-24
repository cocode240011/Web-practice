var log = console.log.bind(console);

// 存下定时器的 id，便于消除定时器
var clockId

// 判断元素是否在数组中
function hasNum(arr, n) {
    for (var i = 0; i < arr.length; i++) {
        var a = arr[i];
        if (n === a) {
            return true;
        };
    };
    return false;
};

// 随机生成 Hex 颜色值
function randomHexColor() {
    var n = Math.random() * 0xffffff >> 0;
    var hex = n.toString(16);
    var result = '#' + ('00000' + hex).substr(-6);
    return result
};

// 生成一组长度为 3 的随机数组，作为选取九宫格格子的 id
function randomIds() {
    var counts = [];
    for (var i = 0; i < 3; i++) {
        var n = Math.floor(Math.random() * 9);
        var valid = hasNum(counts, n);
        // 当随机到的数字已经在数组中，重新随机一个数字
        if (valid) {
            i--;
            continue;
        };
        counts.push(n);
    };
    return counts;
};

// 一组长度为 3 的随机颜色数组，用以给 3个不同的格子赋予背景颜色
function colorArray() {
    var colors = [];
    for (var i = 0; i < 3; i++) {
        var c = randomHexColor();
        // 当与初始颜色一样时，跳过此次循环，重新取色
        if (c == '#fdb274') {
            log('c==', c, i);
            i--;
            continue;
        }
        colors.push(c);
    };
    return colors;
};

// 在下一次随机选取 3个格子赋予颜色前，重置所有格子的颜色为初始色
function resetAll() {
    var allBox = document.querySelectorAll('.box');
    for (var i = 0; i < allBox.length; i++) {
        var b = allBox[i];
        b.style.backgroundColor = '#fdb274';
    };
};

//
function changeColor() {
    var counts = randomIds();
    var colors = colorArray();
    // 重置所有格子为初始颜色
    resetAll();
    // 根据 id 选取 3个格子，并对它们上色
    var box1 = document.querySelector('#box' + Number(counts[0]));
    box1.style.backgroundColor = `${colors[0]}`;
    var box2 = document.querySelector('#box' + Number(counts[1]));
    box2.style.backgroundColor = `${colors[1]}`;
    var box3 = document.querySelector('#box' + Number(counts[2]));
    box3.style.backgroundColor = `${colors[2]}`;
};

// 对开始按钮绑定点击事件，点击后随机 3 个格子开始变色
function bindEventStart() {
    var start = document.querySelector('#btn1');
    start.addEventListener('click', function() {
        clockId = setInterval(function() {
            changeColor();
        }, 1000);
    }, false);
};

function bindEventEnd() {
    var end = document.querySelector('#btn2');
    end.addEventListener('click', function() {
        if (clockId !== undefined) {
            clearInterval(clockId);
            resetAll();
        }
    }, false);
};

function __main() {
    bindEventStart();
    bindEventEnd();
};

__main();
