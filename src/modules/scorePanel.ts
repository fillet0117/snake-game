// 記分牌
class ScorePanel {
    score: number = 0;
    level: number = 1;

    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    // 設置變數來限制等級
    maxLevel: number;
    // 升級判斷
    levelUp: number;

    constructor(maxLevel: number = 10, levelUp: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;

        this.maxLevel = maxLevel;
        this.levelUp = levelUp;
    }

    // 加分
    addScore() {
        this.score++;
        this.scoreEle.innerHTML = this.score.toString();

        // 判斷分數是否升級
        if (this.score % this.levelUp == 0) {
            this.addLevel();
        }
    }

    // 升等級(上限10)
    addLevel() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level.toString();
        }
    }
}

export default ScorePanel;