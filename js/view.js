class View {
  constructor() {
    //---------------------------
    // Controle Speed Set
    //---------------------------
    this.deltaTime = 200;

    //---------------------------
    // Key lListeners set
    //---------------------------
    this.keyListeners();
    //---------------------------
    // Event InterVal set
    //---------------------------
    this.timer = setInterval(() => {
      this.snake.move();
      this.effaceCanvas();
      // console.log("this.timer -> " + this.snake.body.x[0] + "=" + this.apple.body.x + " " + this.snake.body.y[0] + "=" + this.apple.body.y)
      this.snake.gameOverSet();

      
      // Set New 
      this.apple.setNewApple(this.snake, this.apple, this.alert);
      this.alert.textContent = "Score : " + this.snake.score;
      
      if (this.snake.gameOver) {
        this.stopTimer(this.timer);
        this.alert.textContent = "Geme Over!!! Score : " + this.snake.score;
      if (this.snake.gameClear) {
        this.stopTimer(this.timer);
        this.alert.textContent = "Game clear!! You are win!! ";
      }
      }
      
      this.drawSnake(this.snake);
      this.drawApple(this.apple);

    }, this.deltaTime);
  }// End constructor
  //--------------------------------------------------------
  //--------------------------
  // func _initLocalListeners() 
  //--------------------------
  keyListeners() {
    window.addEventListener('keydown', e => {
      console.log("View -> constructor -> e.key",e.keyCode+" = "+e.code+" "+e.key)
      // interdiction U-turn
      if(!this.snake.check){
      if ((e.key === '8'||e.code==='ArrowUp'||e.KeyCode===38) && this.snake.direction != "down") {
        this.check=1;
        this.snake.direction = "up";
        return;
      }
      if ((e.key === '4'||e.code==='ArrowLeft'||e.KeyCode===37) && this.snake.direction != "right") {
        this.check=1;
        this.snake.direction = "left";
        return;
      }
      if ((e.key === '2'||e.code==='ArrowDown'||e.KeyCode===40) && this.snake.direction != "up") {
        this.check=1;
        this.snake.direction = "down";
        return;
      }
      if ((e.key === '6'||e.code==='ArrowRight'||e.KeyCode===39) && this.snake.direction != "left") {
        this.check=1;
        this.snake.direction = "right";
        return;
      }}
    
    });
  }
  //-----------------------
  // Set Datas at Model
  //-----------------------
  setData(snake, apple, alert, canvas) {
    this.snake = snake;
    this.apple = apple;
    this.alert = alert;
    this.canvas = canvas;
    this.snake.body.x[0] = 1;
    this.snake.body.y[0] = 1;
    if (this.canvas.getContext) { // if browser suported
      //la création d'un objet CanvasRenderingContext2D
      this.ctx = this.canvas.getContext("2d");
    } else {
      this.alert.textContent = "This game is not compatible with your browser.";
    }
  }
  //-----------------------
  //stopTime
  //-----------------------
  stopTimer(timer) {
    console.log("stopTimer");
    clearInterval(this.timer);
  }
  //---------------------------
  //drawSnake
  //---------------------------
  drawSnake(snake) {
    this.ctx.fillStyle = snake.body.color;
    //ctx.fillRect(x, y, width, height);
    for (let i = 0; i < snake.body.x.length; i++) {
      this.ctx.fillRect(snake.body.x[i] * snake.body.size, snake.body.y[i] * snake.body.size, snake.body.size, snake.body.size);
    }
  }
  //---------------------------
  // drawApple
  //---------------------------
  drawApple(apple) {
    this.ctx.fillStyle = apple.body.color;
    // reset path
    this.ctx.beginPath();
    //arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.ctx.arc(apple.body.x * apple.body.size * 2 + apple.body.size, apple.body.y * apple.body.size * 2 + apple.body.size, apple.body.size, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  //---------------------------
  // clear for move snake
  //---------------------------
  effaceCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  //-------------------------
}// End Class View