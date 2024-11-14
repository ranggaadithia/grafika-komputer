const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const points = [];
let selectedAlgorithm = "bresenham";
let lineColor = "red";

function drawPoint(x, y) {
  ctx.fillStyle = lineColor;
  ctx.fillRect(x, y, 2, 2);
}

function drawLineBruteForce(x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const xIncrement = dx / steps;
  const yIncrement = dy / steps;
  let x = x0;
  let y = y0;
  for (let i = 0; i <= steps; i++) {
    drawPoint(Math.round(x), Math.round(y));
    x += xIncrement;
    y += yIncrement;
  }
}

function drawLineDDA(x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const xIncrement = dx / steps;
  const yIncrement = dy / steps;
  let x = x0;
  let y = y0;
  for (let i = 0; i <= steps; i++) {
    drawPoint(Math.round(x), Math.round(y));
    x += xIncrement;
    y += yIncrement;
  }
}

function drawLineBresenham(x0, y0, x1, y1) {
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    drawPoint(x0, y0);

    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

function drawCircleBresenham(xc, yc, radius) {
  let x = 0;
  let y = radius;
  let d = 3 - 2 * radius;

  function drawCirclePoints(xc, yc, x, y) {
    drawPoint(xc + x, yc + y);
    drawPoint(xc - x, yc + y);
    drawPoint(xc + x, yc - y);
    drawPoint(xc - x, yc - y);
    drawPoint(xc + y, yc + x);
    drawPoint(xc - y, yc + x);
    drawPoint(xc + y, yc - x);
    drawPoint(xc - y, yc - x);
  }

  drawCirclePoints(xc, yc, x, y);
  while (y >= x) {
    x++;
    if (d > 0) {
      y--;
      d = d + 4 * (x - y) + 10;
    } else {
      d = d + 4 * x + 6;
    }
    drawCirclePoints(xc, yc, x, y);
  }
}

function drawShape(x0, y0, x1, y1) {
  if (selectedAlgorithm === "bruteForce") {
    drawLineBruteForce(x0, y0, x1, y1);
  } else if (selectedAlgorithm === "dda") {
    drawLineDDA(x0, y0, x1, y1);
  } else if (selectedAlgorithm === "bresenham") {
    drawLineBresenham(x0, y0, x1, y1);
  } else if (selectedAlgorithm === "circle") {
    const radius = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    drawCircleBresenham(x0, y0, Math.round(radius));
  }
}

canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  points.push({ x, y });
  drawPoint(x, y);

  if (points.length === 2) {
    drawShape(points[0].x, points[0].y, points[1].x, points[1].y);
    points.length = 0;
  }
});

function setActiveButton(algorithm) {
  selectedAlgorithm = algorithm;

  document.getElementById("bruteForceBtn").classList.remove("active");
  document.getElementById("ddaBtn").classList.remove("active");
  document.getElementById("bresenhamBtn").classList.remove("active");
  document.getElementById("circleBtn").classList.remove("active");

  if (algorithm === "bruteForce") {
    document.getElementById("bruteForceBtn").classList.add("active");
  } else if (algorithm === "dda") {
    document.getElementById("ddaBtn").classList.add("active");
  } else if (algorithm === "bresenham") {
    document.getElementById("bresenhamBtn").classList.add("active");
  } else if (algorithm === "circle") {
    document.getElementById("circleBtn").classList.add("active");
  }
}

function setActiveColor(colorElement) {
  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.classList.remove("active-color");
  });
  colorElement.classList.add("active-color");
}

document
  .getElementById("bruteForceBtn")
  .addEventListener("click", function () {
    setActiveButton("bruteForce");
  });
document.getElementById("ddaBtn").addEventListener("click", function () {
  setActiveButton("dda");
});
document
  .getElementById("bresenhamBtn")
  .addEventListener("click", function () {
    setActiveButton("bresenham");
  });
document
  .getElementById("circleBtn")
  .addEventListener("click", function () {
    setActiveButton("circle");
  });

document
  .getElementById("redColor")
  .addEventListener("click", function () {
    lineColor = "red";
    setActiveColor(this);
  });
document
  .getElementById("greenColor")
  .addEventListener("click", function () {
    lineColor = "green";
    setActiveColor(this);
  });
document
  .getElementById("blueColor")
  .addEventListener("click", function () {
    lineColor = "blue";
    setActiveColor(this);
  });
document
  .getElementById("blackColor")
  .addEventListener("click", function () {
    lineColor = "black";
    setActiveColor(this);
  });