let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach((slide) => (slide.style.display = "none")); // Hide all slides

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1; // Reset to first slide

    slides[slideIndex - 1].style.display = "block"; // Show current slide
    setTimeout(showSlides, 4000); // Change slide every 4 seconds
}

// Start slideshow on page load
document.addEventListener("DOMContentLoaded", showSlides);


// Set up project filters
function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".filter-button.active").classList.remove("active");
      button.classList.add("active");

      const filter = button.dataset.filter.toLowerCase();
      projectCards.forEach((card) => {
        const languages = card.dataset.languages.toLowerCase();
        if (filter === "all" || languages.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Run filter setup on page load
setupFilters();
