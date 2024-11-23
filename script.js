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
    repoIcon.src = "https://raw.githubusercontent.com/orn8/oragne.dev/refs/heads/main/assets/repo-icon.png";
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