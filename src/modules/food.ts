// 食物
class Food {
    // 定義食物所對應的元素
    element: HTMLElement;

    constructor() {
        // 獲取頁面中food的元素
        // 元素不可能為空，因為已經設定在html裡了
        this.element = document.getElementById('food')!;
    }

    // 獲取食物x軸座標
    get X() {
        return this.element.offsetLeft;
    }

    // 獲取食物Y軸座標
    get Y() {
        return this.element.offsetTop;
    }

    // 食物改變位置
    change() {
        // 生成隨機的位置
        // 食物位置最小0，最大290(300視窗大小-10食物大小)
        // 蛇移動一次一格，一格是10，所以食物座標只能是10的倍數
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;

        this.element.style.left = left.toString() + 'px';
        this.element.style.top = top.toString() + 'px';
    }
}

export default Food;