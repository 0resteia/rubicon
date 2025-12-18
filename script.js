const PASSWORD = "digital"; 
// Explicitly reference elements
const passwordInput = document.getElementById("password");
const lock = document.getElementById("lock");
const diary = document.getElementById("diary");
const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const closeBtn = document.getElementById("close");

document.addEventListener("DOMContentLoaded", () => {
function unlock() {
  if (passwordInput.value === PASSWORD) {
    lock.hidden = true;
    diary.hidden = false;
    loadPosts();
  } else {
    alert("Wrong password");
  }
}

async function loadPosts() {
  const res = await fetch("posts.json");
  const data = await res.json();

  data.posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    const img = document.createElement("img");
    img.src = post.image;
    img.onclick = () => openModal(post);

    div.appendChild(img);
    grid.appendChild(div);
  });
}

/* Modal */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const closeBtn = document.getElementById("close");

function openModal(post) {
  modal.style.display = "flex";
  modalImg.src = post.image;
  modalCaption.innerHTML = `<strong>${post.date}</strong><br>${post.caption}`;
}

closeBtn.onclick = closeModal;

modal.onclick = (e) => {
  if (e.target === modal) closeModal();
};

function closeModal() {
  modal.style.display = "none";
}
 
}  });
