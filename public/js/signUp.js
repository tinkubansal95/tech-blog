const username = $("#username");
const password = $("#password");
const form = $("form");

const handleSubmit = async (e) => {
  e.preventDefault();

  const usernameVal = username.val().trim();
  const passwordVal = password.val().trim();

  const errors = {};
  if (!usernameVal) {
    errors.username = "Invalid username";
  }

  if (passwordVal < 8) {
    errors.passwordLength = "Password should be atleast 8 characters long!";
  }

  if (errors.username || errors.password) {
    alert(`${Object.keys(errors)
      .map((key) => {
        return `${errors[key]}\r`;
      })
      .join("")}
        `);
    return;
  } else {
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usernameVal, password: passwordVal }),
    });
    if (res.ok) {
      window.location.href = "/home";
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
