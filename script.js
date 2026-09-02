const pieces = [
  50, 60, 70, 80, 90, 100,
  110, 120, 130, 140, 150,
  170, 180, 200, 210, 220,
  230, 240, 250
];

const cornerAllowance = 200;
const minPuzzleSize = 200;
const largeFrameWarning = 1000;

function bestPieces(target) {
  let best = null;

  function search(current, total, startIndex) {
    if (total >= target) {
      const difference = total - target;

      const candidate = {
        pieces: [...current],
        total,
        difference
      };

      if (
        !best ||
        candidate.difference < best.difference ||
        (
          candidate.difference === best.difference &&
          candidate.pieces.length < best.pieces.length
        ) ||
        (
          candidate.difference === best.difference &&
          candidate.pieces.length === best.pieces.length &&
          Math.max(...candidate.pieces) > Math.max(...best.pieces)
        )
      ) {
        best = candidate;
      }

      return;
    }

    // Safety cap so recursion doesn't go forever.
    if (current.length >= 12) return;

    for (let i = startIndex; i < pieces.length; i++) {
      const piece = pieces[i];
      search([...current, piece], total + piece, i);
    }
  }

  search([], 0, 0);

  return best;
}

function groupPieces(pieceList) {
  const counts = {};

  for (const piece of pieceList) {
    counts[piece] = (counts[piece] || 0) + 1;
  }

  return Object.entries(counts)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([size, count]) => `${count} × ${size} mm`)
    .join("<br>");
}

function calculate() {
  let width = Number(document.getElementById("width").value);
  let height = Number(document.getElementById("height").value);
  const units = document.getElementById("units").value;
  const result = document.getElementById("result");

  if (!width || !height || width <= 0 || height <= 0) {
    result.innerHTML = `
      <div class="answer">
        Please enter valid puzzle dimensions.
      </div>
    `;
    return;
  }

  if (units === "in") {
    width *= 25.4;
    height *= 25.4;
  }

  if (width < minPuzzleSize || height < minPuzzleSize) {
    result.innerHTML = `
      <div class="answer">
        <strong>⚠️ Too small for this frame system</strong><br><br>
        The minimum supported puzzle size is approximately
        <strong>200 × 200 mm</strong>.
      </div>
    `;
    return;
  }

  const widthTarget = width - cornerAllowance;
  const heightTarget = height - cornerAllowance;

  const widthPieces = bestPieces(widthTarget);
  const heightPieces = bestPieces(heightTarget);

  if (!widthPieces || !heightPieces) {
    result.innerHTML = `
      <div class="answer">
        No combination found for this size.
      </div>
    `;
    return;
  }

  const finalWidth = widthPieces.total + cornerAllowance;
  const finalHeight = heightPieces.total + cornerAllowance;

  const widthClearance = finalWidth - width;
  const heightClearance = finalHeight - height;

  let warning = "";

  if (width >= largeFrameWarning || height >= largeFrameWarning) {
    warning = `
      <div style="margin-top:16px;">
        <strong>⚠️ Large frame</strong><br>
        The original frame design says large puzzle sizes
        should theoretically work, but they have not been
        fully tested. Consider additional support for very
        large frames.
      </div>
    `;
  }

  result.innerHTML = `
    <div class="answer">
      <strong>Puzzle size</strong><br>
      ${width.toFixed(1)} × ${height.toFixed(1)} mm

      <hr>

      <strong>Horizontal sides</strong><br>
      ${widthPieces.pieces.join(" + ")} mm<br><br>
      For both horizontal sides, print:<br>
      ${groupPieces(
        widthPieces.pieces.flatMap(piece => [piece, piece])
      )}

      <br><br>

      <strong>Vertical sides</strong><br>
      ${heightPieces.pieces.join(" + ")} mm<br><br>
      For both vertical sides, print:<br>
      ${groupPieces(
        heightPieces.pieces.flatMap(piece => [piece, piece])
      )}

      <br><br>

      <strong>Corners</strong><br>
      Print 4 × 100 mm corner pieces

      <hr>

      <strong>Finished frame</strong><br>
      ${finalWidth.toFixed(1)} × ${finalHeight.toFixed(1)} mm

      <br><br>

      <strong>Extra clearance</strong><br>
      Width: +${widthClearance.toFixed(1)} mm<br>
      Height: +${heightClearance.toFixed(1)} mm

      <br><br>

      <strong>Puzzle thickness:</strong>
      approximately 3 mm maximum.

      ${warning}
    </div>
  `;
}
