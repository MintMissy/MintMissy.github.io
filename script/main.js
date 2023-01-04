/* Particles */
const trailParticles = [];

let mousePosition = { x: 0, y: 0 };
addEventListener("mousemove", (event) => {
  mousePosition = { x: event.pageX, y: event.pageY };
});

function Particle() {
  this.x = 0;
  this.y = 0;

  this.setPosition = (x, y) => {
    this.x = x;
    this.y = y;
  };

  this.element = (() => {
    const particle = document.createElement("div");
    particle.className = "trail-particle";
    document.body.appendChild(particle);
    return particle;
  })();

  this.draw = () => {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  };
}

function drawParticles() {
  let x = mousePosition.x;
  let y = mousePosition.y;

  trailParticles.forEach((particle, index, particles) => {
    const nextParticle = particles[index + 1] || particles[0];

    particle.setPosition(x, y);
    particle.draw();

    x += (nextParticle.x - particle.x) * 0.6;
    y += (nextParticle.y - particle.y) * 0.6;
  });
}

function animateParticles() {
  drawParticles();
  requestAnimationFrame(animateParticles);
}

for (let i = 0; i < 10; i++) {
  trailParticles.push(new Particle());
}
animateParticles();
