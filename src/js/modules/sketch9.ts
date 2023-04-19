import p5 from "p5";

const sketch = (p: p5) => {
  const bubbles: Bubble[] = [];
  const numBubbles = 50;

  class Bubble {
    x: number;
    y: number;
    radius: number;
    color: p5.Color;
    xNoise: number;
    yNoise: number;
    rNoise: number;

    constructor() {
      this.x = p.random(p.width);
      this.y = p.random(p.height);
      this.radius = p.random(20, 100);
      this.color = p.color(
        p.random(100, 255),
        p.random(100, 255),
        p.random(100, 255),
        p.random(100, 200)
      );
      this.xNoise = p.random(1000);
      this.yNoise = p.random(1000);
      this.rNoise = p.random(1000);
    }

    display() {
      p.push();
      p.translate(this.x, this.y);
      const angle = p.map(p.noise(this.xNoise), 0, 1, 0, p.TWO_PI);
      const r = p.map(p.noise(this.rNoise), 0, 1, -20, 20);
      p.rotate(angle);
      p.fill(this.color);
      p.noStroke();
      p.ellipse(0, 0, this.radius + r);
      p.pop();
    }

    move() {
      this.x += p.map(p.noise(this.xNoise), 0, 1, -1, 1);
      this.y += p.map(p.noise(this.yNoise), 0, 1, -1, 1);
      this.xNoise += 0.01;
      this.yNoise += 0.01;
      this.rNoise += 0.01;
      this.wrap();
    }

    wrap() {
      if (this.x < -this.radius) {
        this.x = p.width + this.radius;
      } else if (this.x > p.width + this.radius) {
        this.x = -this.radius;
      }
      if (this.y < -this.radius) {
        this.y = p.height + this.radius;
      } else if (this.y > p.height + this.radius) {
        this.y = -this.radius;
      }
    }
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    for (let i = 0; i < numBubbles; i++) {
      bubbles.push(new Bubble());
    }
  };

  p.draw = () => {
    p.background(0);
    for (const bubble of bubbles) {
      bubble.move();
      bubble.display();
    }
  };
};

export default sketch;
