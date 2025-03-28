document.addEventListener("DOMContentLoaded", () => {
  const repos = document.querySelectorAll(".repo");

  repos.forEach((repo, index) => {
    const name = repo.dataset.name;
    const description = repo.dataset.description;
    const repoLink = `https://github.com/orn8/${name}`;
    
    const nameContainer = document.createElement("a");
    nameContainer.href = repoLink;
    nameContainer.classList.add("repo-name");
    nameContainer.textContent = "_".repeat(name.length);
    nameContainer.target = "_blank";
    nameContainer.rel = "noopener noreferrer";

    const repoIcon = document.createElement("img");
    repoIcon.src = "/assets/repo-icon.png";
    repoIcon.alt = "GitHub Repo Icon";
    repoIcon.classList.add("repo-icon");

    repo.prepend(repoIcon);
    repo.appendChild(nameContainer);

    const descElement = document.createElement("p");
    descElement.classList.add("repo-desc");
    descElement.textContent = description;
    repo.appendChild(descElement);

    repo.style.transition = `opacity 1s ease-in-out, transform 1s ease-in-out`;
    setTimeout(() => {
      repo.style.opacity = 1;
      repo.style.transform = "translateY(0)";
    }, 500 + index * 200);

    repo.addEventListener("transitionend", (event) => {
      if (event.propertyName === "opacity") {
        let delay = 0;
        const typeEffect = setInterval(() => {
          if (delay < name.length) {
            const currentText = name.slice(0, delay + 1);
            const remainingUnderscores = "_".repeat(name.length - delay - 1);
            nameContainer.textContent = currentText + remainingUnderscores;
            delay++;
          } else {
            clearInterval(typeEffect);
          }
        }, 100);
      }
    });
  });
});

// App menu
(function() {
  // URLs for hosted files
  const BASE_URL = "https://raw.githubusercontent.com/orn8/appmenu/refs/heads/main/";
  const cssUrl = BASE_URL + "appmenu.css";
  const jsUrl = BASE_URL + "appmenu.js";
  const htmlUrl = BASE_URL + "appmenu.html";

  // Function to dynamically load CSS
  function loadCSS(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
  }

  // Function to dynamically load and inject HTML
  function loadHTML(url) {
      return fetch(url)
          .then(response => response.text())
          .then(html => {
              document.body.insertAdjacentHTML("afterbegin", html);
          });
  }

  // Function to dynamically load JavaScript
  function loadJS(url) {
      return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
      });
  }

  // Function to wait until an element exists before continuing
  function waitForElement(selector, timeout = 5000) {
      return new Promise((resolve, reject) => {
          const startTime = Date.now();

          (function checkElement() {
              const element = document.querySelector(selector);
              if (element) return resolve(element);

              if (Date.now() - startTime >= timeout) {
                  return reject(new Error(`Timeout: ${selector} did not appear`));
              }

              requestAnimationFrame(checkElement); // Check again on the next frame
          })();
      });
  }

  // Main execution sequence
  loadCSS(cssUrl); // Load CSS first
  loadHTML(htmlUrl) // Load HTML and wait for it to be fully inserted
      .then(() => waitForElement("#app-menu-container")) // Wait for HTML to actually appear
      .then(() => loadJS(jsUrl)) // Load JS only after HTML exists
      .catch(error => console.error("Error loading app menu:", error));

})();