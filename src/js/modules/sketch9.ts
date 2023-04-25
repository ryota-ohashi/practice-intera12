import p5 from "p5";

class Bubble {
  x: number;
  y: number;
  d: number;
  noiseScale: number;
  velocity: p5.Vector;
  constructor(p: p5, x: number, y: number, d: number) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.noiseScale = 0.02;
    this.velocity = p.createVector(5, 10);
  }
  draw(p: p5, f: string, t: number, r: number) {
    p.stroke("");

    p.push();

    const noiseX = p.noise(this.x * this.noiseScale * t / 500, this.y * this.noiseScale * t / 500);
    const noiseY = p.noise(this.x * this.noiseScale * t / 500 + 100, this.y * this.noiseScale * t / 500 + 100);
    const ellipseW = this.d * (0.9 + 0.1 * noiseX);
    const ellipseH = this.d * (0.9 + 0.1 * noiseY);

    this.x += (noiseX - 0.5) * this.velocity.x;
    this.y += (noiseY - 0.5) * this.velocity.y;

    // 画面外に出ないようにする
    if (this.x < r) {
      this.x = r;
      this.velocity.x *= -1;
    }
    if (this.x > p.width - r) {
      this.x = p.width - r;
      this.velocity.x *= -1;
    }
    if (this.y < r) {
      this.y = r;
      this.velocity.y *= -1;
    }
    if (this.y > p.height - r) {
      this.y = p.height - r;
      this.velocity.y *= -1;
    }

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
  const r = 80;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    p.angleMode(p.DEGREES);
    // Bubbleインスタンスを生成し、配列に格納する
    for (let j = 0; j < 1; j++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const d = 2 * r;
      const bubble = new Bubble(p, x, y, d);
      bubbles.push(bubble);
    }
  };

  p.draw = () => {
    t++;

    p.clear(0,0,0,0);
    p.stroke("");
    p.push();

    // ドロップシャドウを作成
    let filter = "";
    for (let i = 0; i < 6; i++) {
      let r = i ** 2.5;
      filter += `drop-shadow(${r * 4 * p.sin(t + 100)}px ${r * 3 * p.sin(t)}px ${r * 3}px hsl(${i * 108 + t} 100% 70%))`;
    }

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].draw(p, filter, t, r);
    }
    p.pop();
  };
};

export default sketch;
