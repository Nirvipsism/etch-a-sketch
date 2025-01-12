/**********************************************
 * CREATE AND MANAGE THE GRID
 **********************************************/

/**
 * Creates a grid of size n x n inside the #container.
 * @param {number} n - The number of squares on each side of the grid.
 */
function createGrid(n) {
  const container = document.getElementById("container");
  
  // Clear any existing squares
  clearGrid();

  // Calculate the size of each square (in px) so that the total width is 960px
  // Subtracting 2 for the border can help avoid float rounding,
  // but typically 960 / n is sufficient.
  const squareSize = 960 / n;

  // Generate n*n squares
  for (let i = 0; i < n * n; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    // Set inline styles for width and height:
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Attach a "mouseover" event listener to change color
    square.addEventListener("mouseover", handleMouseOver);

    // Append square to container
    container.appendChild(square);
  }
}

/**
 * Clears all squares from the grid container.
 */
function clearGrid() {
  const container = document.getElementById("container");
  // Remove all child nodes
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

/**********************************************
 * HOVER / COLOR LOGIC
 **********************************************/

/**
 * Handle mouse hover over a square.
 * - First time: choose random color, set opacity to 0.1
 * - Each subsequent hover: increase darkness up to 1.0 in 10 steps
 */
function handleMouseOver(e) {
  const square = e.target;

  // If the square does not have a stored color, create one
  if (!square.dataset.r) {
    // Generate a random color
    const { r, g, b } = getRandomColor();
    // Store the color in dataset
    square.dataset.r = r;
    square.dataset.g = g;
    square.dataset.b = b;
    // Start the darkness count at 1
    square.dataset.darkness = 1;
    // Apply initial color with 10% opacity
    square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
  } else {
    // The square has a color, so darken it by 10% more
    let darkness = Number(square.dataset.darkness);
    if (darkness < 10) {
      darkness++;
      square.dataset.darkness = darkness;
      const r = square.dataset.r;
      const g = square.dataset.g;
      const b = square.dataset.b;
      // Calculate new opacity
      const newOpacity = darkness * 0.1;
      square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
    }
    // If darkness >= 10, it's fully colored, do nothing further
  }
}

/**
 * Generates a random RGB color.
 * @returns {Object} an object containing random r, g, b values
 */
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}

/**********************************************
 * BUTTON + INITIAL SETUP
 **********************************************/

/**
 * Prompts the user for grid size and creates a new grid.
 */
function promptNewGrid() {
  let newSize = prompt("Enter new grid size (max 100):", "16");
  if (newSize !== null) {
    newSize = parseInt(newSize);
    if (isNaN(newSize) || newSize < 1) {
      alert("Invalid input. Please enter a number between 1 and 100.");
      return;
    }
    if (newSize > 100) {
      alert("Size too large. Using 100 instead.");
      newSize = 100;
    }
    createGrid(newSize);
  }
}

// On page load, create a default 16x16 grid
createGrid(16);

// Add event listener to the "New Grid" button
document.getElementById("newGridBtn").addEventListener("click", promptNewGrid);
