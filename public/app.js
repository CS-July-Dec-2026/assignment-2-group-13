const name = document.querySelector("#name");
const email = document.querySelector("#email");
const response = document.querySelector("#response");
const inspect = document.querySelector("#inspect");

let profile;

async function loadProfile() {
  const res = await fetch("/api/profile/1");
  profile = await res.json();

  // The UI only uses two fields.
  name.textContent = profile.name;
  email.textContent = profile.email;
}

inspect.addEventListener("click", () => {
  response.textContent = JSON.stringify(profile, null, 2);
});

loadProfile();
