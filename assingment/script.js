const userContainer = document.getElementById("user-container");
const searchInput = document.getElementById("search");
const modal = document.getElementById("user-modal");
const closeModal = document.getElementById("close-modal");

// Modal elements
const modalImg = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalEmail = document.getElementById("modal-email");
const modalPhone = document.getElementById("modal-phone");
const modalAddress = document.getElementById("modal-address");

let users = [];

async function fetchUsers() {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  users = data.users;
  displayUsers(users);
}


// Display cards
function displayUsers(list) {
  userContainer.innerHTML = list
    .map(
      (user) => `
      <div class="user-card" data-id="${user.id}">
        <img src="${user.image}" alt="${user.firstName}">
        <h3>${user.firstName} ${user.lastName}</h3>
        <p>${user.email}</p>
        <p>${user.phone}</p>
      </div>
    `
    )
    .join("");
}

// Search filter
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );
  displayUsers(filtered);
});

// Open modal
userContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".user-card");
  if (!card) return;
  const id = card.dataset.id;
  const user = users.find((u) => u.id == id);
  showModal(user);
});

function showModal(user) {
  modalImg.src = user.image;
  modalName.textContent = `${user.firstName} ${user.lastName}`;
  modalEmail.textContent = `Email: ${user.email}`;
  modalPhone.textContent = `Phone: ${user.phone}`;
  modalAddress.textContent = `Address: ${user.address.address}, ${user.address.city}`;
  modal.classList.remove("hidden");
}

// Close modal
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Initialize
fetchUsers();
