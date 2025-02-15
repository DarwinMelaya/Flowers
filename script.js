document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const sparkles = document.querySelector(".sparkles");
  const clickText = document.querySelector(".click-text");
  const imageUpload = document.getElementById("imageUpload");
  const uploadedImage = document.getElementById("uploadedImage");
  const photoArea = document.querySelector(".photo-area");
  const uploadPrompt = document.querySelector(".upload-prompt");

  // Get audio element
  const backgroundMusic = document.querySelector("#backgroundMusic");

  // Show flower and hide click text on first click
  let firstClick = true;
  document.addEventListener("click", (e) => {
    if (firstClick) {
      clickText.style.display = "none";
      container.classList.add("show"); // Show the flower
      firstClick = false;

      // Play background music
      backgroundMusic.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }

    const sparkle = document.createElement("div");
    sparkle.style.left = `${e.offsetX}px`;
    sparkle.style.top = `${e.offsetY}px`;
    sparkles.appendChild(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
      sparkle.remove();
    }, 4000);
  });

  // Add floating animation
  let floatY = 0;
  let floatDirection = 1;

  function floatAnimation() {
    floatY += 0.1 * floatDirection;

    if (floatY > 10) floatDirection = -1;
    if (floatY < -10) floatDirection = 1;

    container.style.transform = `scale(0.6) translateY(${floatY}px)`;
    requestAnimationFrame(floatAnimation);
  }

  floatAnimation();

  // Add this to your existing JavaScript file
  function createFirework(x, y) {
    const colors = ["#ff577f", "#ff884b", "#ffd384", "#fff9b0"];
    const fireworksContainer = document.querySelector(".fireworks-container");

    // Create the main explosion
    const explosion = document.createElement("div");
    explosion.className = "firework";
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    explosion.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    explosion.style.animation = "explode 1s ease-out forwards";
    fireworksContainer.appendChild(explosion);

    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "firework";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      // Random direction for each particle
      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.style.setProperty("--tx", `${tx}px`);
      particle.style.setProperty("--ty", `${ty}px`);
      particle.style.animation = "fireworkParticle 1s ease-out forwards";

      fireworksContainer.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }

    // Remove explosion after animation
    setTimeout(() => {
      explosion.remove();
    }, 1000);
  }

  // Add automatic fireworks
  function autoFireworks() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create a firework at random position
    const x = Math.random() * width;
    const y = Math.random() * (height * 0.7); // Keep in upper 70% of screen
    createFirework(x, y);

    // Schedule next firework
    setTimeout(autoFireworks, Math.random() * 1000 + 500); // Random interval between 500ms and 1500ms
  }

  // Start automatic fireworks after DOM loads
  autoFireworks();

  // Add fireworks on click as well
  document.addEventListener("click", (e) => {
    createFirework(e.clientX, e.clientY);
    // Your existing click handler code...
  });

  // Handle photo upload
  photoArea.addEventListener("click", () => {
    imageUpload.click();
  });

  imageUpload.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        uploadedImage.style.display = "block";
        uploadedImage.src = e.target.result;
        uploadPrompt.style.display = "none";
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  });
});
