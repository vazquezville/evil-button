const evilButton = document.getElementById("evil__button");
const OFFSET = 100;

//If the enter is pressed, the windows is closed for cheating
evilButton.addEventListener("click", () => {
  alert("Don't bullshit, cheater");
  window.close();
});

//Register a listener for the mouse movement around the screen
document.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;

  //Get the x and y of the button
  const buttonBox = evilButton.getBoundingClientRect();

  //Get both x and y distance from the center of the button
  const horizontalDistance = distanceFromCenter(buttonBox.x, x, buttonBox.width);
  const verticalDistance = distanceFromCenter(buttonBox.y, y, buttonBox.height);

  const horizontalOffset = buttonBox.width / 2 + OFFSET;
  const verticalOffset = buttonBox.height / 2 + OFFSET;

  //If the mouse is close to the button, move it
  if (Math.abs(horizontalDistance) <= horizontalOffset && Math.abs(verticalDistance) <= verticalOffset) {
    changeButtonPosition(buttonBox.x + (horizontalOffset / horizontalDistance) * 10, buttonBox.y + (verticalOffset / verticalDistance) * 10);
  }
});

//Get the current x and y position in the windows
function changeButtonPosition(x, y) {
  const windowBox = document.body.getBoundingClientRect();
  const buttonBox = evilButton.getBoundingClientRect();

  //Filter condition to avoid the button left the screen
  //Left side
  if (distanceFromCenter(x, windowBox.left, buttonBox.width) < 0) {
    x = windowBox.right - buttonBox.width - OFFSET;
  }
  //Right side
  if (distanceFromCenter(x, windowBox.right, buttonBox.width) > 0) {
    x = windowBox.left + OFFSET;
  }
  //Top side
  if (distanceFromCenter(y, windowBox.top, buttonBox.height) < 0) {
    y = windowBox.bottom - buttonBox.height - OFFSET;
  }
  //Bottom side
  if (distanceFromCenter(y, windowBox.bottom, buttonBox.height) > 0) {
    y = windowBox.top + OFFSET;
  }

  //Add the new position
  evilButton.style.left = `${x}px`;
  evilButton.style.top = `${y}px`;
}

//Get the position of the mouse from the center of the button
function distanceFromCenter(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2;
}
