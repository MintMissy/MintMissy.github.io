/* Particles */
const trailParticles = [];

let mousePosition = { x: 0, y: 0 };
let lastMoveTimeStamp = 0;

addEventListener("mousemove", (event) => {
	lastMoveTimeStamp = Date.now();
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

	this.setDisplayNone = () => {
		this.element.style.display = "none";
	};

	this.setDisplayBlock = () => {
		this.element.style.display = "block";
	};
}

function drawParticles() {
	let x = mousePosition.x;
	let y = mousePosition.y + 15;

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

setInterval(() => {
	if (Date.now() - lastMoveTimeStamp > 250) {
		trailParticles.forEach((particle) => particle.setDisplayNone());
	} else {
		trailParticles.forEach((particle) => particle.setDisplayBlock());
	}
}, 100);

// Update active navbar link
const navbar = document.querySelector("#navbar");
let currentSection = "";

function updateActiveNav(section) {
	if (currentSection === section) {
		return;
	}

	const link = navbar.querySelector("li .active");
	if (link !== null) {
		link.classList.remove("active");
		currentSection = section;
	}

	if (section === "") {
		return;
	}

	const activeLink = navbar.querySelector(`li > #${section}`);
	activeLink.classList.add("active");
}

const aboutSection = document.querySelector("#about");
const skillsSection = document.querySelector("#skills");
const projectsSection = document.querySelector("#projects");
const contactSection = document.querySelector("#contact");

addEventListener("scroll", () => {
	const scrollY = window.scrollY;
	const offset = scrollY - 200;

	console.log("----------");
	console.log(document.body.scrollHeight);
	console.log(window.scrollY + window.innerHeight);

	console.log(scrollY);

	if (window.scrollY + window.innerHeight > document.body.scrollHeight - 200) {
		updateActiveNav("contactLink");
	} else if (scrollY > projectsSection.getBoundingClientRect().top + offset) {
		updateActiveNav("projectsLink");
	} else if (scrollY > skillsSection.getBoundingClientRect().top + offset) {
		updateActiveNav("skillsLink");
	} else if (scrollY > aboutSection.getBoundingClientRect().top + offset) {
		updateActiveNav("aboutLink");
	} else {
		updateActiveNav("");
	}
});
