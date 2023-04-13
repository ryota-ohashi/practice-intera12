import p5 from 'p5';

interface CircleShape {
  x: number;
  y: number;
  size: number;
  color: p5.Color;
}

let circles: CircleShape[] = [];

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 1);
    p.noStroke();
  };

  p.draw = () => {
    // Clear background
    p.background(0, 0.1);

    // Update and display circles
    for (const circle of circles) {
      // Move circle based on noise
      const noiseVal = p.noise(circle.x / 200, circle.y / 200);
      const xOff = p.map(noiseVal, 0, 1, -2, 2);
      const yOff = p.map(noiseVal, 0, 1, -2, 2);
      circle.x += xOff;
      circle.y += yOff;

      // Grow and change color of circle over time
      circle.size += 0.01;
      circle.color = p.color(
        (p.frameCount / 50 + circle.x) % 360,
        100,
        100,
        0.1
      );

      // Draw circle
      p.fill(circle.color);
      p.circle(circle.x, circle.y, circle.size);

      // Remove circle if it goes off screen
      if (
        circle.x < -circle.size ||
        circle.x > p.width + circle.size ||
        circle.y < -circle.size ||
        circle.y > p.height + circle.size
      ) {
        circles = circles.filter((c) => c !== circle);
      }
    }

    // Add new circle
    if (p.random() < 0.05) {
      const newCircle: CircleShape = {
        x: p.random(p.width),
        y: p.random(p.height),
        size: 10,
        color: p.color(0, 0, 0, 0),
      };
      circles.push(newCircle);
    }
  };
};

// new p5(sketch);
export default sketch;