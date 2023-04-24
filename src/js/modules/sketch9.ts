import p5 from "p5";

class Bubble {
  x: number;
  y: number;
  d: number;
  noiseScale: number;
  constructor(x: number, y: number, d: number) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.noiseScale = 0.02;
  }
  draw(p: p5, f: string, t: number) {
    p.stroke("");

    p.push();

    const noiseX = p.noise(this.x * this.noiseScale * t/2000, this.y * this.noiseScale * t/2000);
    const noiseY = p.noise(this.x * this.noiseScale * t/2000 + 100, this.y * this.noiseScale * t/2000 + 100);
    const ellipseW = this.d * (0.8 + 0.2 * noiseX);
    const ellipseH = this.d * (0.8 + 0.2 * noiseY);

    p.ellipse(this.x, this.y, ellipseW, ellipseH);
    p.drawingContext.filter = f;
    p.drawingContext.clip();
    p.ellipse(this.x, this.y, ellipseW, ellipseH);
    p.pop();

  }
}

const sketch = (p: p5) => {
  let bubbles: Bubble[] = [];
  let t = 0;
  const r = 65;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    p.angleMode(p.DEGREES);
    // Bubbleインスタンスを生成し、配列に格納する
    for (let j = 0; j < 1; j++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const d = 2 * r;
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
      filter += `drop-shadow(${r * 4}px ${r * 3}px ${r * 3}px hsl(${i * 108 + t} 100% 70%))`;
    }

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].draw(p, filter, t);
    }
    p.pop();
  };
};

export default sketch;
