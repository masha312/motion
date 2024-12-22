const sketch2 = (p) => {
  class Mover {
    constructor(x, y, topSpeed, accelFactor, label) {
      this.position = p.createVector(x, y);
      this.velocity = p.createVector();
      this.acceleration = p.createVector();
      this.topSpeed = topSpeed;
      this.accelFactor = accelFactor;
      this.label = label;
    }

    update(target) {
      let direction = p5.Vector.sub(target, this.position);
      direction.normalize();
      direction.mult(this.accelFactor);
      this.acceleration = direction;
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topSpeed);
      this.position.add(this.velocity);
    }

    display() {
      p.text(this.label, this.position.x, this.position.y);
    }
  }

  let movers = [];
  let word = "komm mit";

  p.setup = () => {
    let canvas = p.createCanvas(800, 800);
    canvas.parent("canvas2"); // Attach to the existing element with ID "canvas2"
    p.textSize(20);
    let spacing = p.width / (word.length * 4); // Even spacing for movers

    for (let i = 0; i < word.length; i++) {
      let c = word.charAt(i);
      let x = spacing * (i + 1);
      let y = p.height / 2;
      let topSpeed = p.int(p.map(i, 0, word.length - 1, 8, 4));
      let accelFactor = p.map(i, 0, word.length - 1, 0.3, 0.1);
      movers.push(new Mover(x, y, topSpeed, accelFactor, c));
    }
  };

  p.draw = () => {
    p.background(255);
    p.fill(0);
    p.noStroke();

    let mouse = p.createVector(p.mouseX, p.mouseY);

    for (let mover of movers) {
      mover.update(mouse);
      mover.display();
    }
  };
};

// Initialize the sketch and attach it to the existing element
new p5(sketch2);
