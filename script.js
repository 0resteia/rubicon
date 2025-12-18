document.addEventListener("DOMContentLoaded", () => {

  // ---- CONFIG ----
  const PASSWORD = "123"; // CHANGE THIS

  // ---- ELEMENT REFERENCES ----
  const passwordInput = document.getElementById("password");
  const lock = document.getElementById("lock");
  const diary = document.getElementById("diary");
  const grid = document.getElementById("grid");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeBtn = document.getElementById("close");

  // ---- PASSWORD UNLOCK ----
  function unlock() {
    if (passwordInput.value === PASSWORD) {
      lock.hidden = true;
      diary.hidden = false;
      loadPosts();
    } else {
      alert("Wrong password");
    }
  }

  // Connect button to unlock
  const unlockBtn = document.querySelector("button");
  unlockBtn.addEventListener("click", unlock);

  // ---- LOAD POSTS ----
  async function loadPosts() {
    try {
      const res = await fetch("posts.json");
      if (!res.ok) throw new Error("Could not load posts.json");
      const data = await res.json();

      data.posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";

        const img = document.createElement("img");
        img.src = post.image;
        img.alt = post.caption;

        // Open modal on click
        img.addEventListener("click", () => openModal(post));

        div.appendChild(img);
        grid.appendChild(div);
      });
    } catch (err) {
      console.error("Error loading posts:", err);
      grid.innerHTML = "<p style='color:red;'>Failed to load posts.</p>";
    }
  }

  // ---- MODAL ----
  function openModal(post) {
    modal.style.display = "flex";
    modalImg.src = post.image;
    modalCaption.innerHTML = `<strong>${post.date}</strong><br>${post.caption}`;
  }

  function closeModal() {
    modal.style.display = "none";
  }

  // Close modal via X or background
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

});
