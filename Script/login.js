const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    try {
      const response = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        message.innerHTML = `<span class="text-success">Login successful!</span>`;

        // Save user
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect after 1 second
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);

      } else {
        message.innerHTML = `<span class="text-danger">${data.message}</span>`;
      }

    } catch (error) {
      message.innerHTML = `<span class="text-danger">Server error</span>`;
    }
  });
}