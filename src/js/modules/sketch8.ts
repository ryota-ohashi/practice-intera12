import p5 from "p5";

const sketch = (p: p5) => {

  let shapes: Shape[] = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 1);
    p.noStroke();

    // create initial shapes
    for (let i = 0; i < 100; i++) {
      shapes.push(new Shape(p.random(p.width), p.random(p.height)));
    }
  };

  p.draw = () => {
    p.background(0, 0, 0.1);

    for (let i = 0; i < shapes.length; i++) {
      shapes[i].update();
      shapes[i].display();
    }
  };

  class Shape {
    x: number;
    y: number;
    size: number;
    hue: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = p.random(30, 80);
      this.hue = p.random(360);
    }

    update() {
      // random movement
      this.x += p.random(-2, 2);
      this.y += p.random(-2, 2);

      // wrap around canvas edges
      if (this.x < -this.size) this.x = p.width + this.size;
      if (this.x > p.width + this.size) this.x = -this.size;
      if (this.y < -this.size) this.y = p.height + this.size;
      if (this.y > p.height + this.size) this.y = -this.size;
    }

    display() {
      p.fill(this.hue, 80, 100, 0.5);
      p.circle(this.x, this.y, this.size);

      // subtle texture
      p.fill(this.hue, 80, 100, 0.1);
      let numDots = p.floor(p.random(5, 10));
      let angleStep = p.TWO_PI / numDots;
      for (let i = 0; i < numDots; i++) {
        let angle = i * angleStep;
        let dotX = this.x + p.cos(angle) * this.size * 0.3;
        let dotY = this.y + p.sin(angle) * this.size * 0.3;
        let dotSize = p.random(3, 10);
        p.circle(dotX, dotY, dotSize);
      }
    }
  }

};
export default sketch;
