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


// GitHub personal access token
const GITHUB_TOKEN = "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"; // Your GitHub token

// Fetch and display GitHub projects
async function fetchGitHubProjects() {
  const username = "Neeti-shah05"; // Your GitHub username
  const container = document.getElementById("projects-container");
  const filterButtons = document.querySelector(".filters");

  try {
    // Fetch repositories from GitHub using the token
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    if (!reposResponse.ok) {
      throw new Error(`GitHub API returned status ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();

    if (!repos || repos.length === 0) {
      container.innerHTML = `<p>No projects found. Please ensure your GitHub account is public and repositories are accessible.</p>`;
      return;
    }

    // Clear the container and filters
    container.innerHTML = "";
    filterButtons.innerHTML = '<button data-filter="all" class="filter-button active">All</button>';

    const languagesSet = new Set();

    for (const repo of repos) {
      if (repo.fork) continue; // Skip forked repositories

      // Fetch languages for each repository
      const languagesResponse = await fetch(repo.languages_url, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      });

      if (!languagesResponse.ok) {
        console.warn(`Failed to fetch languages for repo: ${repo.name}`);
        continue;
      }

      const languages = await languagesResponse.json();
      const languageList = Object.keys(languages);

      // Add languages to the filter set
      languageList.forEach((lang) => languagesSet.add(lang));

      // Add project card to the container
      const card = `
        <div class="project-card" data-languages="${languageList.join(" ")}">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <p><strong>Languages Used:</strong> ${languageList.join(", ") || "None"}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        </div>
      `;
      container.innerHTML += card;
    }

    // Add filters for languages
    Array.from(languagesSet).forEach((lang) => {
      const button = `<button data-filter="${lang}" class="filter-button">${lang}</button>`;
      filterButtons.innerHTML += button;
    });

    setupFilters();
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    container.innerHTML = `<p>Unable to fetch projects at this time. Please try again later.</p>`;
  }
}

// Set up filters
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

// Fetch projects on page load
fetchGitHubProjects();

// Artwork Lightbox
let currentImageIndex = 0;
const images = document.querySelectorAll('.artwork-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(index) {
  currentImageIndex = index;
  lightbox.style.display = "block";
  lightboxImg.src = images[currentImageIndex].src;
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function changeSlide(direction) {
  currentImageIndex += direction;
  
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0; // Loop back to first image
  } else if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1; // Loop back to last image
  }

  lightboxImg.src = images[currentImageIndex].src;
}
