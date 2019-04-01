var canvas = document.getElementById('game')
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;
var snake = {
    x:160,
    y:160,
    dx:grid,
    dy:0,
    cells: [],
    maxCells:1 //1 apple tambah 1 kotak
};
var apple ={
    x:320,
    y:320
};

function getRandomInt(min,max){   //perandoman tempat apple
    return Math.floor(Math.random()* (max - min)) + min;
}

function loop(){
    requestAnimationFrame(loop);

    if (++count<4){
        return;
    }
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height)
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0){ //tembus tembok
        snake.x= canvas.width - grid;
        console.log('tembus tembok kiri')
    }
    else if ( snake.x >= canvas.width) {
        snake.x =0;
        console.log('tembus tembok kanan')
    }
    if (snake.y < 0){
        snake.y = canvas.height - grid;
        console.log('tembus tembok atas')
    }
    else if (snake.y >= canvas.height){
        snake.y = 0;
        console.log('tembus tembok bawah')
    }
    snake.cells.unshift({x: snake.x, y: snake.y});  //unshift javasript array menambah 1kotak 
    if (snake.cells.length>snake.maxCells){
        snake.cells.pop();
        // console.log('snake.cells.pop()');
    }
    context.fillStyle = 'red'; // gambar apple
    context.fillRect(apple.x, apple.y, grid-1, grid-1);

    context.fillStyle= 'green';
    snake.cells.forEach(function(cell, index){ //gambar ular 
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
        // console.log('context.fillRect(cell.x, cell.y, grid-1, grid-1)')
        if (cell.x === apple.x && cell.y === apple.y){ // tata letak apple
            snake.maxCells++;

            apple.x = getRandomInt(0,25)*grid; // canvas ukuran 400x400 jadi 25X25 grid
            apple.y = getRandomInt(0,25)*grid; 
        }

        for (var i = index + 1;i < snake.cells.length; i++){  //reset game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                snake.x = 160;
                snake.y = 160;
                snake.cells= [];
                snake.maxCells=4;
                snake.dx= grid;
                snake.dy= 0;

                apple.x = getRandomInt(0,25)*grid;
                apple.y = getRandomInt(0,25)*grid;
            }
        }
    });
}
var allowedTime = 200;
var startX= 0;
var startY= 0;
document.addEventListener('touchstart', function(e){
var touch = e.changedTouches[0]
startX =touch.pageX
startY = touch.pageY
startTime = new Date ().getTime ()
e.preventDefault()}, false)
document.addEventListener('touchmove',function(e){
    e.preventDefault()
},false)
document.addEventListener('touchend',function(e){
    var touch =e.changedTouches[0]
    distX= touch.pageX- startX
    distY= touch.pageY- startY

    if (Math.abs(distX)>Math.abs(distY)){
        if(distX > 0 && snake.dx === 0){
            snake.dx = grid;
            snake.dy = 0;
        }
        else if (distX< 0 && snake.dx === 0){
            snake.dx= -grid;
            snake.dy= 0;
        }
    } else {
        if (distY > 0 && snake.dy ===0){
            snake.dy= grid;
            snake.dx= 0;
        }
        else if ( distY < 0 && snake.dy===0){
            snake.dy= -grid;
            snake.dx= 0;
        }
    }
    e.preventDefault();
},false)
document.addEventListener('keydown',function(e){
    
    if(e.which === 37&& snake.dx === 0){ //left
        snake.dx= -grid;
        snake.dy = 0;
        console.log('left')
    }
    else if(e.which === 38 && snake.dy === 0){ //up
        snake.dy = -grid;
        snake.dx = 0;
        console.log('up')
    }
    else if(e.which === 39 && snake.dx === 0){// right
        snake.dx = grid;
        snake.dy = 0;
        console.log('right')
    }
    else if (e.which === 40 && snake.dy === 0){// down
        snake.dy = grid;
        snake.dx = 0;
        console.log('down')

    }
}); requestAnimationFrame(loop);