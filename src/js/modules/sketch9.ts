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
  }
}

const sketch = (p: p5) => {
  let bubbles: Bubble[] = [];
  let t = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    // Bubbleインスタンスを生成し、配列に格納する
    for (let j = 0; j < 1; j++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const d = 130;
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

    // ドロップシャドウを作成
    let filter = "";
    for (let i = 0; i < 6; i++) {
      let r = i ** 2.5;
      let I = i * 4 + "px ";
      filter += `drop-shadow(${r * 4}px ${r * 3}px ${r * 3}px hsl(${i * 108 + t} 100% 90%))`;
      // filter += `drop-shadow(-${I}-${r}${r}hsl(${160+r} 99%70%))`;
      // filter += `drop-shadow(-${(I)}-${r}${r}hsl(${i * 64 + t} 99% 60%))`;
    }
    // 配列の中のBubbleインスタンスを1pxずつ移動させ、draw関数で描画する
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].draw(p, filter);
    }
    p.pop();
  };
};

export default sketch;
