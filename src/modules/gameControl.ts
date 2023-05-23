import Food from "./food";
import Snake from "./snake";
import ScorePanel from "./scorePanel";

// 遊戲控制器，控制其他類
class GameControl {
    // 定義三個屬性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 存蛇的移動方向，就是按鍵的方向
    direction: string = '';
    // 記錄遊戲是否結束
    isLive: boolean = true;

    constructor() {
        this.snake = new Snake;
        this.food = new Food;
        this.scorePanel = new ScorePanel;

        this.init();
    }

    // 遊戲初始化方法
    init() {
        // 綁定鍵盤按下的事件
        // 事件給誰綁定的，他的this就是誰，所以這裡的this.keydownHandler的this是document而非GameControl
        // document.addEventListener('keydown', this.keydownHandler);

        // bind的作用為創建一個新函數
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 使蛇移動
        this.run();
    }

    // 鍵盤按下響應函數
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    // 控制蛇移動
    run() {
        // 獲取蛇現在座標
        let x = this.snake.X;
        let y = this.snake.Y;

        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                // 每次移動一格，一格10px
                y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                x -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                x += 10;
                break;
        }

        // 檢查蛇是否吃到食物
        this.checkEat(x, y);

        // 修改蛇的位置
        try {
            this.snake.X = x;
            this.snake.Y = y;
        } catch(e) {
            alert(e + ' Game Over');
            this.isLive = false;
        }

        // 設定蛇的速度
        this.isLive && setTimeout(this.run.bind(this), 200 - (this.scorePanel.level - 1) * 10);
    }

    // 檢查蛇是否吃到食物
    checkEat(x: number, y: number): void {
        if (x === this.food.X && y === this.food.Y) {
            // 食物換位置
            this.food.change();
            // 加分
            this.scorePanel.addScore();
            // 蛇增加一節
            this.snake.addBody();
        }
    }

    
}

export default GameControl;