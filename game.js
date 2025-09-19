const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 400;

// Pirate player
const pirate = {
  x: 100,
  y: 300,
  width: 50,
  height: 80,
  color: "brown",
  dx: 0,
  speed: 5,
  isAttacking: false
};

// Enemy pirate
const enemy = {
  x: 600,
  y: 300,
  width: 50,
  height: 80,
  color: "red",
  health: 3
};

// ✅ Step 5: Player Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") pirate.dx = pirate.speed;
  if (e.key === "ArrowLeft") pirate.dx = -pirate.speed;
  if (e.key === " ") pirate.isAttacking = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") pirate.dx = 0;
  if (e.key === " ") pirate.isAttacking = false;
});

// Draw rectangle character
function drawCharacter(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

// Update loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pirate.x += pirate.dx;

  drawCharacter(pirate);
  drawCharacter(enemy);

  requestAnimationFrame(update);
}

function checkCombat() {
    if (pirate.isAttacking) {
      let overlap = 
        pirate.x + pirate.width > enemy.x &&
        pirate.x < enemy.x + enemy.width;
  
      if (overlap && enemy.health > 0) {
        enemy.health -= 1;
        console.log("Enemy hit! Remaining health:", enemy.health);
      }
    }
  }
  
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    pirate.x += pirate.dx;
  
    drawCharacter(pirate);
  
    if (enemy.health > 0) {
      drawCharacter(enemy);
    } else {
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText("You Win!", 320, 200);
    }
  
    checkCombat();
    requestAnimationFrame(update);
  }
  

  function drawHealthBar(obj, health) {
    ctx.fillStyle = "black";
    ctx.fillRect(obj.x, obj.y - 20, 50, 10);
    ctx.fillStyle = "green";
    ctx.fillRect(obj.x, obj.y - 20, health * 15, 10);
  }
  

update();
