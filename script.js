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
  const cssUrl = "https://raw.githubusercontent.com/orn8/appmenu/refs/heads/main/appmenu.css";
  const jsUrl = "https://raw.githubusercontent.com/orn8/appmenu/refs/heads/main/appmenu.js";
  const htmlUrl = "https://raw.githubusercontent.com/orn8/appmenu/refs/heads/main/appmenu.html";

  // Function to load CSS
  function loadCSS(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
  }

  // Function to load JavaScript
  function loadJS(url) {
      return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
      });
  }

  // Function to load HTML and append it to the body
  function loadHTML(url) {
      return fetch(url)
          .then(response => response.text())
          .then(html => {
              document.body.insertAdjacentHTML("afterbegin", html);
          });
  }

  // Load CSS, HTML, and JS
  loadCSS(cssUrl);
  loadHTML(htmlUrl)
      .then(() => loadJS(jsUrl))
      .catch(error => console.error("Error loading app menu:", error));
})();