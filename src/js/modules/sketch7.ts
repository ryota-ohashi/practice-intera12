import p5 from "p5";

const sketch = (p: p5) => {
  let shapes: Shape[] = [];
  let numShapes = 50;
  let shapeSize = 100;

  class Shape {
    x: number;
    y: number;
    size: number;
    color: p5.Color;
    shapeType: "ellipse" | "circle";

    constructor(x: number, y: number, size: number, color: p5.Color, shapeType: "ellipse" | "circle") {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.shapeType = shapeType;
    }

    update() {
      this.x += p.random(-1, 1);
      this.y += p.random(-1, 1);
    }

    display() {
      p.push();
      p.translate(this.x, this.y);
      p.noStroke();
      p.fill(this.color);
      if (this.shapeType === "ellipse") {
        p.ellipse(0, 0, this.size, this.size * 1.5);
      } else {
        p.circle(0, 0, this.size);
      }
      p.pop();
    }
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100);
    for (let i = 0; i < numShapes; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      let size = p.random(shapeSize / 2, shapeSize);
      let hue = p.random(360);
      let saturation = p.random(50, 100);
      let brightness = p.random(50, 100);
      let color = p.color(hue, saturation, brightness);
      let shapeType: "ellipse" | "circle" = p.random() > 0.2 ? "ellipse" : "circle";
      let shape = new Shape(x, y, size, color, shapeType);
      shapes.push(shape);
    }
  };

  p.draw = () => {
    p.background(0);
    p.blendMode(p.SCREEN);
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      shape.update();
      shape.display();
    }
  };
};

export default sketch;
