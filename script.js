const pieces = [
  50, 60, 70, 80, 90, 100,
  110, 120, 130, 140, 150,
  170, 180, 200, 210, 220,
  230, 240, 250
];

const cornerAllowance = 200;

function bestPieces(target) {
  let best = null;

  for (const a of pieces) {
    for (const b of pieces) {
      const total = a + b;
      const difference = total - target;

      if (difference >= 0) {
        if (!best || difference < best.difference) {
          best = {
            a: a,
            b: b,
            total: total,
            difference: difference
          };
        }
      }
    }
  }

  return best;
}

function calculate() {
  let width = Number(document.getElementById("width").value);
  let height = Number(document.getElementById("height").value);
  const units = document.getElementById("units").value;

  if (units === "in") {
    width = width * 25.4;
    height = height * 25.4;
  }

  const longTarget = width - cornerAllowance;
  const shortTarget = height - cornerAllowance;

  const long = bestPieces(longTarget);
  const short = bestPieces(shortTarget);

  const result = document.getElementById("result");

  if (!long || !short) {
    result.innerHTML = `
      <div class="answer">
        No combination found.
      </div>
    `;
    return;
  }

  result.innerHTML = `
    <div class="answer">
      <strong>Puzzle:</strong>
      ${width.toFixed(1)} × ${height.toFixed(1)} mm

      <hr>

      <strong>Long sides</strong><br>
      ${long.a} mm + ${long.b} mm<br>
      Print 2 × ${long.a} mm and 2 × ${long.b} mm

      <br><br>

      <strong>Short sides</strong><br>
      ${short.a} mm + ${short.b} mm<br>
      Print 2 × ${short.a} mm and 2 × ${short.b} mm

      <br><br>

      <strong>Corners:</strong> Print 4

      <hr>

      Finished frame:
      <strong>
        ${(long.total + cornerAllowance).toFixed(1)}
        ×
        ${(short.total + cornerAllowance).toFixed(1)} mm
      </strong>
    </div>
  `;
}
