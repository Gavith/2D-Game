// Define global variables
boy = document.querySelector('.boy'); //  Get the character image element by class name
idel_animation_number = 0; // Interval ID for idle animation
idel_image_number = 0; // Current frame number for idle animation
run_image_number = 1; // Current frame number for running animation
run_animation_number = 0; // Interval ID for running animation
background_image_position_x = 0; // Horizontal position of the background image
move_background_animation_id = 0; // Interval ID for background movement
jump_animation_number = 0; // Interval ID for jump animation
jump_image_number = 1; // Current frame number for jump animation
boy_margin_top = 500; // Initial vertical position of the character
is_running = false; // Flag to check if running animation has started

// Idle animation function
function idel_animation() {
  idel_image_number += 1; // Increment idle frame number
  if (idel_image_number === 11) {
    idel_image_number = 1; // Reset frame number after reaching the last frame
  }
  boy.src = `./asset/images/character/Idel/Idle (${idel_image_number}).png`; // Update character image source
}

// Start idle animation
function idel_animation_start() {
  idel_animation_number = setInterval(idel_animation, 200); // Run idle animation every 200ms
}

// Running animation function
function run_animation() {
  run_image_number += 1; // Increment running frame number
  if (run_image_number === 11) {
    run_image_number = 1; // Reset frame number after reaching the last frame
  }
  boy.src = `./asset/images/character/Run/Run (${run_image_number}).png`; // Update character image source
}

// Start running animation
function run_animation_start() {
  clearInterval(idel_animation_number); // Stop idle animation
  run_animation_number = setInterval(run_animation, 80); // Run running animation every 80ms
  is_running = true; // Set running flag to true
}

// Jumping animation function
function jump_animation() {
  jump_image_number += 1; // Increment jump frame number

  if (jump_image_number <= 6) {
    // Move character upward in the first half of the jump
    boy_margin_top -= 20;
  } else if (jump_image_number >= 7) {
    // Move character downward in the second half of the jump
    boy_margin_top += 20;
  }

  boy.style.marginTop = boy_margin_top + 'px'; // Update marginTop AFTER calculation

  if (jump_image_number === 11) {
    // End the jump animation
    jump_image_number = 1; // Reset frame number
    clearInterval(jump_animation_number); // Stop jump animation
    jump_animation_number = 0; // Reset jump animation ID
    run_animation_start(); // Resume running animation after jump
  }

  boy.src = `./asset/images/character/Jump/Jump (${jump_image_number}).png`; // Update character image source
}

// Start jumping animation
function jump_animation_start() {
  if (!is_running) return; // Prevent jumping if not running
  clearInterval(idel_animation_number); // Stop idle animation
  clearInterval(run_animation_number); // Stop running animation
  jump_animation_number = setInterval(jump_animation, 100); // Run jump animation every 100ms
}

// Key press event handler
function key_check(event) {
  const key_code = event.key; // Get the key that was pressed

  if (key_code === 'Enter') {
    // Start running animation and move background when Enter key is pressed
    if (run_animation_number === 0) {
      run_animation_start(); // Start running animation
    }
    if (move_background_animation_id === 0) {
      move_background_animation_id = setInterval(move_background, 1); // Start moving background
    }
  }

  if (key_code === ' ') {
    // Start jumping animation when Space key is pressed
    if (jump_animation_number === 0) {
      jump_animation_start(); // Start jumping animation
    }
  }
}

// Move background function
function move_background() {
  background_image_position_x -= 4; // Move background to the left
  document.querySelector(
    '.background'
  ).style.backgroundPositionX = `${background_image_position_x}px`; // Update CSS property for background position
}
