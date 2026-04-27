const form = document.getElementById('registerForm');

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');

// Password check
if (password !== confirmPassword) {
  message.innerHTML = `<span class="text-danger">Passwords do not match!</span>`;
  return;
}

     try {
    const response = await fetch("http://localhost:9000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      message.innerHTML = `<span class="text-success">Registration successful!</span>`;
      form.reset();
    } else {
      message.innerHTML = `<span class="text-danger">${data.message}</span>`;
    }

  } catch (error) {
    message.innerHTML = `<span class="text-danger">Server error</span>`;
  }
});


// Password toggle
 function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "👁️"; // change icon
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
}
