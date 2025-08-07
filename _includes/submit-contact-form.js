document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const responseDiv = document.getElementById("form-response");

  const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  console.log("Hostname:", window.location.hostname);
  console.log("isDev:", isDev);

  const api_url = isDev ? "https://localhost:8000/.netlify/functions/contact" : "https://tvaz.netlify.app/.netlify/functions/contact";
  console.log("API URL:", api_url);

  try {
    const res = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    responseDiv.textContent = "Sending...";
    responseDiv.style.color = "gray";

    const result = await res.json();

    if (res.ok && result.success) {
      responseDiv.textContent = "✅ Message sent successfully!";
      responseDiv.style.color = "green";

      document.getElementById("contact-form").reset();
    } else {
      throw new Error(result.error || "Something went wrong.");
    }
  } catch (err) {
      responseDiv.textContent = "❌ " + err.message;
      responseDiv.style.color = "red";

  }
});