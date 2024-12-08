const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";

let coordinates = [];
let connections = [];

function drawPoint(x, y) {
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

function parseCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result.trim().split("\n");
      const data = lines.map((line) => line.split(",").map(Number));
      resolve(data);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function applyTransformations(coordinates, scale, rotationAngle, translateX, translateY) {
  const rad = (rotationAngle * Math.PI) / 180; // Convert degrees to radians

  // Transformation matrices
  const scaleMatrix = [
    [scale, 0, 0],
    [0, scale, 0],
  ];

  // Rotation matrix
  const rotationMatrix = [
    [Math.cos(rad), -Math.sin(rad)],
    [Math.sin(rad), Math.cos(rad)],
  ];

  const numPoints = coordinates.length;
  const centroid = coordinates.reduce(
    (acc, [_, x, y]) => [acc[0] + x, acc[1] + y],
    [0, 0]
  ).map((val) => val / numPoints);

  return coordinates.map(([id, x, y, z]) => {
    const translatedX = x - centroid[0];
    const translatedY = y - centroid[1];

    const [scaledX, scaledY] = [
      scaleMatrix[0][0] * translatedX + scaleMatrix[0][1] * translatedY,
      scaleMatrix[1][0] * translatedX + scaleMatrix[1][1] * translatedY,
    ];

    const [rotatedX, rotatedY] = [
      rotationMatrix[0][0] * scaledX + rotationMatrix[0][1] * scaledY,
      rotationMatrix[1][0] * scaledX + rotationMatrix[1][1] * scaledY,
    ];

    const finalX = rotatedX + centroid[0] + translateX;
    const finalY = rotatedY + centroid[1] + translateY;

    return [id, finalX, finalY, z];
  });
}



function drawShape() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 

  connections.forEach(([startIndex, endIndex]) => {
    const start = coordinates[startIndex - 1];
    const end = coordinates[endIndex - 1];
    if (start && end) {
      drawLineBruteForce(start[1], start[2], end[1], end[2]);
    }
  });
}

document.getElementById("drawBtn").addEventListener("click", async () => {
  const coordinatesFile = document.getElementById("coordinatesFile").files[0];
  const connectionsFile = document.getElementById("connectionsFile").files[0];

  if (!coordinatesFile || !connectionsFile) {
    alert("Silakan pilih kedua file!");
    return;
  }

  try {
    coordinates = await parseCSV(coordinatesFile);
    connections = await parseCSV(connectionsFile);
    drawShape(); 
  } catch (error) {
    alert("Terjadi kesalahan saat membaca file: " + error.message);
  }
});

document
  .getElementById("applyTransformBtn")
  .addEventListener("click", () => {
    const scaleInput = parseFloat(document.getElementById("scaleInput").value);
    const rotationInput = parseFloat(
      document.getElementById("rotationInput").value
    );
    const translateXInput = parseFloat(
      document.getElementById("translateXInput").value
    );
    const translateYInput = parseFloat(
      document.getElementById("translateYInput").value
    );

    coordinates = applyTransformations(
      coordinates,
      scaleInput,
      rotationInput,
      translateXInput,
      translateYInput
    );
    drawShape(); 
  });
