let angle = 0;
let constant = 8;

let sketch1 = (p) => {
  p.setup = () => {
    let sketchWrapper = p.createCanvas(800, 800);
    sketchWrapper.parent("canvas1");
    p.angleMode(p.DEGREES);
  };

  p.draw = () => {
    p.background(255);

    p.strokeWeight(1);

    let tilesX = 30;
    let tilesY = 30;

    let tileW = p.width / tilesX;
    let tileH = p.height / tilesY;

    for (let x = 0; x < tilesX; x++) {
      for (let y = 0; y < tilesY; y++) {
        p.push();
        // Calculate the center of the current tile
        let centerX = tileW * x + tileW / 2;
        let centerY = tileH * y + tileH / 2;
        p.stroke(200);
        // Move the canvas origin to the center of the current line
        p.translate(centerX, centerY);

        // Apply rotation based on mouse position
        angle = p.map(p.mouseX + p.mouseY, 0, p.width + p.height, 0, 200);
        p.rotate(angle + p.sin(x) * 1000 + p.tan(y) * 1000 + p.cos(x) * 1000);

        // p.rect(-tileW / 2, -tileH / 2, 10, 10);
        // Draw the line centered at the origin
        p.line(
          -tileW / 2 + constant,
          tileH / 2 - constant,
          tileW / 2 - constant,
          -tileH / 2 + constant
        );
        p.pop();
      }
    }
  };
};

new p5(sketch1);
