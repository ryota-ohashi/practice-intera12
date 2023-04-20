import p5 from "p5";

class Bubble {
  x: number;
  y: number;
  d: number;
  constructor(x: number, y: number, d: number) {
    this.x = x;
    this.y = y;
    this.d = d;
  }
  draw(p: p5, j: number) {
    // ストロークの色を空にする
    p.stroke("");

    p.push();

    // 円を描画する
    p.circle(this.x, this.y, this.d);

    // ドロップシャドウを描画する
    let filter = "";
    for (let i = 0; i < 8; i++) {
      let r = i ** 1.5;
      filter += `drop-shadow(${r}px ${r * 3}px ${r * 2}px hsl(${j * 32 + i * 38} 100% 90%))`;
    }

    // 描画コンテキストにフィルターを適用する
    p.drawingContext.filter = filter;

    // 円の形にクリッピングする
    p.drawingContext.clip();

    // 円を描画する
    p.circle(this.x, this.y, this.d);
    p.pop();

    // 位置を1pxずつ移動させる
    this.y--;
  }
}

const sketch = (p: p5) => {
  let bubbles: Bubble[] = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    // Bubbleインスタンスを2個生成し、配列に格納する
    for (let j = 0; j < 2; j++) {
      const x = p.random(p.width);
      const y = p.height;
      const d = p.random(9, 130);
      const bubble = new Bubble(x, y, d);
      bubbles.push(bubble);
    }
  };

  p.draw = () => {
    p.background(255);
    // 配列の中のBubbleインスタンスを1pxずつ移動させ、draw関数で描画する
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].draw(p, i);
    }
  };
};

export default sketch;
