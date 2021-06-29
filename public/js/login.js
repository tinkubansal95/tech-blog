const username = $("#username");
const password = $("#password");
const form = $("form");

const handleSubmit = async (e) => {
  e.preventDefault();

  const usernameVal = username.val().trim();
  const passwordVal = password.val().trim();

  const errors = {};
  if (!usernameVal) {
    errors.username = "Invalid email";
  }
  if (!passwordVal) {
    errors.password = "Invalid password";
  }

  if (errors.username || errors.password) {
    alert(`${Object.keys(errors)
      .map((key) => {
        return `${errors[key]}\r`;
      })
      .join("")}
        `);
  } else {
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usernameVal, password: passwordVal }),
    });
    if (res.ok) {
      window.location.href = "/";
      return;
    }

    const body = await res.json();

    alert(
      Array.isArray(body)
        ? body.map((err) => `Invalid ${err}`)
        : `${body.message}`
    );
  }
};

form.on("submit", handleSubmit);
