class Model {

  constructor() {
    this.alert = document.getElementById('alert');
    this.canvas = document.getElementById('canvas');
    this.canvasZone = {
      width: canvas.width,
      height: canvas.height,
      block: 24
    }

    this.snake = this.createSnake(this.canvasZone);
    this.apple = this.createApple(this.canvasZone);
  }// END constructoe


  //---------------------------
  // keyListeners
  //---------------------------

  keyListeners(snake,e) {
  
      // interdiction U-turn
      if(!snake.check){
        console.log("View -> constructor -> e.key",e.keyCode+" = "+e.code+" "+e.key)
      if ((e.key === '8'||e.code==='ArrowUp'||e.KeyCode===38) && snake.direction != "down") {
        snake.check=1;
        snake.direction = "up";
        return;
      }
      if ((e.key === '4'||e.code==='ArrowLeft'||e.KeyCode===37) && snake.direction != "right") {
        snake.check=1;
        snake.direction = "left";
        return;
      }
      if ((e.key === '2'||e.code==='ArrowDown'||e.KeyCode===40) && snake.direction != "up") {
        snake.check=1;
        snake.direction = "down";
        return;
      }
      if ((e.key === '6'||e.code==='ArrowRight'||e.KeyCode===39) && snake.direction != "left") {
        snake.check=1;
        snake.direction = "right";
        return;
      }}
    
  
  }
  //---------------------------
  // Snake 
  //---------------------------
  createSnake(zone) {
    return {
      body: {
        x: [],
        y: [],
        color: "#1B4D01",
        size: zone.block
      },
      gameOver: 0,
      gemeClear: 0,
      score: 0,
      direction: "rigft",
      check:0,
      move: function () {
        
        const x = this.body.x[0];
        const y = this.body.y[0];

        if (this.direction === "right") {
          // this.body.x[0] += 1;
          this.check=0;
          this.body.x.pop();
          this.body.x.unshift(x + 1);
          this.body.y.pop();
          this.body.y.unshift(y);
        }
        if (this.direction === "down") {
          // this.body.y[0] += 1;
          this.check=0;
          this.body.x.pop();
          this.body.x.unshift(x);
          this.body.y.pop();
          this.body.y.unshift(y + 1);
        }
        if (this.direction === "left") {
          // this.body.x[0] -= 1;
          this.check=0;
          this.body.x.pop();
          this.body.x.unshift(x - 1);
          this.body.y.pop();
          this.body.y.unshift(y);
        }
        if (this.direction === "up") {
          // this.body.y[0] -= 1;
          this.check=0;
          this.body.x.pop();
          this.body.x.unshift(x);
          this.body.y.pop();
          this.body.y.unshift(y - 1);
        }
      },
      gameOverSet: function () {
        if (this.direction === "right" && this.body.x[0] > zone.width / zone.block) {
          this.gameOver = 1;
        }
        if (this.direction === "down" && this.body.y[0] > zone.height / zone.block) {
          this.gameOver = 1;
        }
        if (this.direction === "left" && this.body.x[0] < 0) {
          this.gameOver = 1;
        }
        if (this.direction === "up" && this.body.y[0] < 0) {
          this.gameOver = 1;
        }
        for (let i = 2; i < this.body.x.length; i++) {
          if (this.body.x[0] === this.body.x[i] && this.body.y[0] === this.body.y[i]) {
            console.log("gameover", this.body.x[0] + "=" + this.body.x[i] + " " + this.body.y[0] + "=" + this.body.y[i] + " index=" + i +" direction= "+this.direction)
            this.gameOver = 1;
          }
        }
      }
    }
  }
  //---------------------------
  // Apple
  //---------------------------
  createApple(zone) {
    return {
      body: {
        x: 10, // which block
        y: 10, // which block
        color: "#BB1C1A",
        size: zone.block / 2,//radius
      },
      move: function () {
        this.body.x = Math.floor(Math.random() * (zone.width - zone.block) / zone.block);
        this.body.y = Math.floor(Math.random() * (zone.height - zone.block) / zone.block);
        console.log("createApple -> move this.body.x=" + this.body.x + " y= " + this.body.y)
      },
      setNewApple: function (snake, apple, alert) {
        if (snake.body.x[0] === apple.body.x && snake.body.y[0] === apple.body.y) {
          snake.score += 1;
          snake.body.x.push(snake.body.x[snake.body.x.length - 1]);
          snake.body.y.push(snake.body.y[snake.body.y.length - 1]);
          console.log("x=" + snake.body.x[1] + "  " + snake.body.x[snake.body.x.length - 1])
         
          apple.move();
          // Don't apple on the snale. Game Clear If there in no space for put apple 
          while (this._isOnSnake(snake,apple)) {
            const xA = apple.body.x;
            const yA = apple.body.y; 

              apple.body.x += 2;
            
              if (xA === apple.body.x && yA === apple.body.y) {
                snake.gameClear = 1;
                break;
              }

              if (apple.body.x < zone.width / snake.block) {
                console.log("Model -> createApple -> apple.body.x < zone.width / snake.block", apple.body.x < zone.width / snake.block)
                continue;
              }
              apple.body.x = 0;
              apple.body.y += 2;

              if (apple.body.y >= zone.hight / snake.block) {
                console.log("Model -> createApple -> apple.body.y >= zone.hight / snake.block", apple.body.y >= zone.hight / snake.block)
                apple.body.y = 0;
              }
          }
        }
      },  //---------------
      _isOnSnake(snake, apple) {
        for (let i = 0; i < snake.body.x.length; i++) {
          if (snake.body.x[i] === apple.body.x && snake.body.y[i] === apple.body.y) {
            return true;
          }
        }
        return false;
      }//---------------------

    }
  }
  //-----------------
}//End class Model
