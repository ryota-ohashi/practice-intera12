import p5 from "p5";

const sketch = (p: p5) => {
  let W: number;
  let D: any;
  let C: any;
  let R: any;

  p.setup = () => {
    p.createCanvas(W = 800, W);
    D = p.drawingContext;
    C = p.circle;
    R = p.random;
    p.noFill();
    p.colorMode(p.HSL, 360, 100, 100, 1);
    p.randomSeed(42); // ランダムシードを設定
  };

  p.draw = () => {
    p.clear(0,0,0,0);
    for (let j = 90; j > 0; j--) {
      let f = "";
      for (let i = 2; i < 8; i++) {
        f += `drop-shadow(-${i}px -${i}px hsla(${160 + j}, 99%, 70%, 1))`;
      }
      D.filter = f;
      D.clip();
      const x = R(W);
      const y = R(W);
      const d = R(9, 130);
      p.push();
      p.stroke("");
      C(x, y, d);
      p.pop();
    }
  };
};

export default sketch;
