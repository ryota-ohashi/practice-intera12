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
  draw(p: p5, f: string) {
    // ストロークの色を空にする
    p.stroke("");

    p.push();

    // 円を描画する
    p.circle(this.x, this.y, this.d);

    // 描画コンテキストにフィルターを適用する
    p.drawingContext.filter = f;

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
  let t = 0;

  // ドロップシャドウを作成
  let filter = "";
  for (let i = 0; i < 2; i++) {
    let r = i ** 2.5;
    filter += `drop-shadow(${r}px ${r * 3}px ${r * 5}px hsl(${i * 108} 100% 80%))`;
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    // Bubbleインスタンスを2個生成し、配列に格納する
    for (let j = 0; j < 10; j++) {
      const x = p.random(p.width);
      const y = p.height;
      const d = p.random(9, 130);
      const bubble = new Bubble(x, y, d);
      bubbles.push(bubble);
    }
  };

  p.draw = () => {
    t++;
    console.log(t);

    p.background(255);
    p.stroke("");
    p.push();
    // 配列の中のBubbleインスタンスを1pxずつ移動させ、draw関数で描画する
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].draw(p, filter);
    }
    p.pop();
  };
};

export default sketch;
