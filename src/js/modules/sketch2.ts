import p5 from "p5";

export const sketch = (p: p5) => {

  let t = 0;

  p.setup = () => {
    p.createCanvas(720, 720);
  };

  p.draw = () => {
    t += 0.005;

    // Set color mode and blend mode
    p.colorMode(p.HSB);
    p.blendMode(p.BLEND);

    // Set background color
    p.background(0, 0.1);

    // Change blend mode
    p.blendMode(p.ADD);

    // Remove fill from shapes
    p.noFill();

    // Loop through rows of shapes
    for (let y = 0; y < p.width; y += 17) {
      // Loop through shapes in row
      for (let x = -y / 17 % 2 * 17; x < p.width; x += 34) {
        // Set stroke color based on noise value, time, and width of canvas
        let hue = (p.noise(x / 200, y / 200, t) * 6 + t) * p.width % 360;
        let saturation = 90;
        let brightness = p.width;
        let alpha = (p.tan(hue) ** 8);

        p.stroke(hue, saturation, brightness, alpha);
        p.square(x, y, 17);
      }
    }
  };

};
