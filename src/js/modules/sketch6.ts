import p5 from "p5";

const sketch = (p: p5) => {
  const shapes: { x: number; y: number; size: number; color: p5.Color }[] = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.noStroke();
    p.frameRate(30);

    // create shapes
    const numShapes = 50;
    for (let i = 0; i < numShapes; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const size = p.random(20, 100);
      const color = p.color(
        p.random(255),
        p.random(255),
        p.random(255),
        p.random(100, 200)
      );
      shapes.push({ x, y, size, color });
    }
  };

  p.draw = () => {
    // draw shapes
    for (const shape of shapes) {
      const { x, y, size, color } = shape;
      p.fill(color);
      p.ellipse(x, y, size, size);

      // create fluffy, blurred effect
      for (let i = 0; i < 5; i++) {
        const offsetX = p.random(-10, 10);
        const offsetY = p.random(-10, 10);
        const blur = p.random(10, 20);
        const alpha = p.random(10, 50);
        const blurColor = p.color(
          p.red(color),
          p.green(color),
          p.blue(color),
          alpha
        );
        p.fill(blurColor);
        p.ellipse(x + offsetX, y + offsetY, size + blur, size + blur);
      }
    }
  };
};

export default sketch;