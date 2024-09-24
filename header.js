const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let isMouseMoving = false;
let lastMouseMove = 0;
let autoParticleInterval = 100; // Intervalo para crear partículas automáticas

// Clase para manejar partículas
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 80;
    this.alpha = 1; // Transparencia inicial
  }

  // Dibujar las partículas
  draw() {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, `rgba(255, 193, 7, ${this.alpha})`); // Color Amarillo #ffc107 (RGB 255-193-7)
    gradient.addColorStop(1, `rgba(255, 193, 7, 0)`); // Desvanecimiento gradual
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Actualizar las partículas (desvanecimiento y reducción de tamaño)
  update() {
    this.alpha -= 0.02; // Desvanecerse gradualmente
    if (this.alpha <= 0) {
      this.alpha = 0;
    }
  }
}

function handleMouseMove(event) {
  isMouseMoving = true;
  lastMouseMove = Date.now();
  
  const x = event.clientX;
  const y = event.clientY;
  particlesArray.push(new Particle(x, y)); // Crear nuevas partículas en la posición del mouse
}

// Animación de partículas
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

  // Dibujar y actualizar cada partícula
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].draw();
    particlesArray[i].update();

    // Eliminar partículas cuando se vuelven completamente transparentes
    if (particlesArray[i].alpha <= 0) {
      particlesArray.splice(i, 1);
      i--; // Ajustar índice después de eliminar una partícula
    }
  }

  // Crear partículas aleatorias si el mouse no se ha movido recientemente
  const timeSinceLastMouseMove = Date.now() - lastMouseMove;
  if (!isMouseMoving || timeSinceLastMouseMove > 1000) {
    createRandomParticle();
  }

  requestAnimationFrame(animateParticles); // Animar constantemente
}

// Crear una partícula en una posición aleatoria
function createRandomParticle() {
  const randomX = Math.random() * canvas.width;
  const randomY = Math.random() * canvas.height;
  particlesArray.push(new Particle(randomX, randomY));
}

// Detectar movimiento del mouse
window.addEventListener('mousemove', handleMouseMove);

// Ajustar el tamaño del canvas al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Iniciar la animación de las partículas
animateParticles();
