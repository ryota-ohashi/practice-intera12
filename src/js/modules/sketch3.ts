import p5 from "p5";

export const sketch = (p: p5) => {

let t = 0;

p.setup = () => {
p.createCanvas(720, 720);
p.colorMode(p.HSB);
};

p.draw = () => {
t += 0.005;
p.background(0, 0.1);

p.noFill();

for (let y = 0; y < p.width; y += 17) {
  for (let x = -y / 17 % 2 * 17; x < p.width; x += 34) {
    let hue = (p.noise(x / 200, y / 200, t) * 6 + t) * p.width % 360;
    let saturation = 90;
    let brightness = p.width;
    let alpha = p.pow(p.tan(hue), 8);

    p.stroke(hue, saturation, brightness, alpha);
    p.rect(x, y, 10 + p.sin(t + x / 10) * 10, 10 + p.sin(t + y / 10) * 10);
  }
}
};

};