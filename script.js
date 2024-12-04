//your code here
// Get all image elements and the buttons
const images = document.querySelectorAll('img');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const messagePara = document.getElementById('para');
let selectedImages = [];

// Shuffle images and randomly pick one to duplicate
function shuffleImages() {
  // Create an array with the image classes
  const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
  const duplicateClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
  
  // Create a copy of the original array and add a duplicate image
  const shuffledImages = [...imageClasses, duplicateClass];
  
  // Shuffle the images array
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
  }

  // Assign the images to the elements
  images.forEach((image, index) => {
    image.className = shuffledImages[index];
  });
}

// Handle image click events
function handleImageClick(event) {
  const clickedImage = event.target;

  // Check if the image is already selected
  if (clickedImage.classList.contains('selected')) {
    return; // Prevent double-clicking the same image
  }

  // Mark the image as selected
  clickedImage.classList.add('selected');
  selectedImages.push(clickedImage);

  // Show the reset button after at least one image is clicked
  resetButton.style.display = 'inline-block';

  // If two images are selected, show the verify button
  if (selectedImages.length === 2) {
    verifyButton.style.display = 'inline-block';
  }
}

// Handle reset button click
function handleReset() {
  // Reset the state
  selectedImages.forEach(image => image.classList.remove('selected'));
  selectedImages = [];
  
  // Hide the reset and verify buttons
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  messagePara.textContent = '';
  document.getElementById('h').textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  
  // Shuffle images again
  shuffleImages();
}

// Handle verify button click
function handleVerify() {
  const [image1, image2] = selectedImages;

  // Check if the two selected images are identical
  if (image1.className === image2.className) {
    messagePara.textContent = 'You are a human. Congratulations!';
  } else {
    messagePara.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
  }

  // Hide the verify button
  verifyButton.style.display = 'none';
}

// Event listeners
images.forEach(image => {
  image.addEventListener('click', handleImageClick);
});

resetButton.addEventListener('click', handleReset);
verifyButton.addEventListener('click', handleVerify);

// Initialize the game
shuffleImages();

