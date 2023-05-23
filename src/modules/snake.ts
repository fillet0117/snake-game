class Snake {
    // 表示蛇頭的元素
    head: HTMLElement;
    // 蛇的身體，包括蛇頭
    bodies: HTMLCollection;
    // 獲取蛇的容器
    element: HTMLElement

    constructor() {
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.element = document.getElementById('snake')!;
        this.bodies = this.element.getElementsByTagName('div');
    }

    // 獲取蛇頭的座標
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    // 設置蛇頭座標
    set X(value: number) {
        if (this.X === value) {
            return;
        }

        // 修改水平座標，蛇在向左移動時不能向右
        // 判斷掉頭
        if (this.bodies.length >= 2 && value === (this.bodies[1] as HTMLElement).offsetLeft) {
            // throw new Error("撞到自己啦");
            // 有掉頭，則繼續往原來的方向走
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }

        // 判斷是否撞牆
        if (value > 290 || value < 0) {
            // 拋出異常
            throw new Error('撞牆了');
        }

        // 移動身體
        this.moveBody()

        this.head.style.left = value.toString() + 'px';

        this.checkHeadBody();
    }

    set Y(value: number) {
        if (this.Y === value) {
            return;
        }

        // 修改垂直座標，蛇在向上移動時不能向下
        // 判斷掉頭
        if (this.bodies.length >= 2 && value === (this.bodies[1] as HTMLElement).offsetTop) {
            // throw new Error("撞到自己啦");
            // 有掉頭，則繼續往原來的方向走
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        // 判斷是否撞牆
        if (value > 290 || value < 0) {
            // 拋出異常
            throw new Error('撞牆了');
        }

        // 移動身體
        this.moveBody()

        this.head.style.top = value.toString() + 'px';

        this.checkHeadBody();
    }

    // 吃到食物，身體要增加一節
    addBody() {
        // 向element中添加div
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    // 身體移動
    moveBody() {
        // 後邊身體設置為前面身體的位置
        for (let i = this.bodies.length-1; i > 0; i--) {
            // 獲取前邊身體的位置
            let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = x.toString() + 'px';
            (this.bodies[i] as HTMLElement).style.top = y.toString() + 'px';
        }
    }

    // 檢查蛇有沒有撞到自己
    checkHeadBody() {
        // 後邊身體設置為前面身體的位置
        for (let i = 1; i < this.bodies.length; i++) {
            let tmp = this.bodies[i] as HTMLElement;
            if (this.X === tmp.offsetLeft && this.Y === tmp.offsetTop) {
                throw new Error('撞到自己啦');
            }
        }
    }
}

export default Snake;