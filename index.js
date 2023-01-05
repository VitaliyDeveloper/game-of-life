const root = document.getElementById("root");
const canvas = document.createElement("canvas");
const generationCount = document.querySelector(".counter");
document.getElementById("start").onclick = startLife;
document.getElementById("reset").onclick = reset;

canvas.width = 500;
canvas.height = 500;
canvas.style.border = "3px solid #fff";
canvas.id = "cl";

const ctx = canvas.getContext("2d");

let mas = [];
let counter = 0;
let timer = 0;

canvas.onclick = function (e) {
  let x = e.offsetX;
  let y = e.offsetY;

  x = Math.floor(x / 10); // 500/10 = 50
  y = Math.floor(y / 10); // 500/10 = 50
  //   console.log(x, y);

  mas[y][x] = 1;
  //   console.log(mas);

  drawField();
};

function goLife() {
  const n = 50,
    m = 50;
  for (let i = 0; i < m; i++) {
    mas[i] = [];

    for (let j = 0; j < n; j++) {
      mas[i][j] = 0;
    }
  }
}

goLife();

function drawField() {
  ctx.clearRect(0, 0, 500, 500);
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      if (mas[i][j] === 1) {
        // ctx.fillStyle = generateColor();
        ctx.fillStyle = getRamdomColor();

        ctx.fillRect(j * 10, i * 10, 10, 10);
      }
    }
  }
}

function startLife() {
  let mas2 = [];
  for (let i = 0; i < 50; i++) {
    mas2[i] = [];
    for (let j = 0; j < 50; j++) {
      let neighbors = 0;

      if (mas[fpm(i) - 1][j] === 1) neighbors++; //UP
      if (mas[i][fpp(j) + 1] === 1) neighbors++; //RIGHT
      if (mas[fpp(i) + 1][j] === 1) neighbors++; //BOTTOM
      if (mas[i][fpm(j) - 1] === 1) neighbors++; //LEFT
      if (mas[fpm(i) - 1][fpp(j) + 1] === 1) neighbors++;
      if (mas[fpp(i) + 1][fpp(j) + 1] === 1) neighbors++;
      if (mas[fpp(i) + 1][fpm(j) - 1] === 1) neighbors++;
      if (mas[fpm(i) - 1][fpm(j) - 1] === 1) neighbors++;
      neighbors == 2 || neighbors == 3 ? (mas2[i][j] = 1) : mas2[i][j] == 0;
    }
  }
  mas = mas2;
  drawField();
  counter++;
  timer = setTimeout(startLife, 300);
  generationCount.innerText = `COUNTER: ${counter++}`;
}

function fpm(i) {
  if (i === 0) return 50;
  else return i;
}

function fpp(i) {
  if (i == 49) return -1;
  else return i;
}

function reset() {
  window.location.reload();
}

// function generateColor() {
//   const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
//   let code = "";
//   for (let i = 0; i < 6; i++) {
//     code += hexArray[Math.floor(Math.random() * 16)];
//   }
//   return `#${code}`;
// }

function getRamdomColor() {
  const colors = [
    // "#BFFF00",
    // "#FFD700",
    // "#EB6123",
    // "#DF73FF",
    // "#4B0082",
    // "#FBAED2",
    // "#545AA7",
    // "#15F2FD",
    "#FFF832",
    "#6984FF",
    // "#FF1482",
    // "#52FF46",
  ];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

root.appendChild(canvas);
