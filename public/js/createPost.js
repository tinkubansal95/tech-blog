const title = $("#title");
const content = $("#content");
const form = $("form");

const handleSubmit = async (e) => {
  e.preventDefault();

  const titleVal = title.val().trim();
  const contentVal = content.val().trim();

  const errors = {};
  if (!titleVal) {
    errors.title = "Title can't be empty!";
  }

  if (!contentVal) {
    errors.content = "Content can't be empty!";
  }

  if (errors.title || errors.content) {
    alert(`${Object.keys(errors)
      .map((key) => {
        return `${errors[key]}\r`;
      })
      .join("")}
        `);
    return;
  } else {
    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: titleVal, content: contentVal }),
    });
    if (res.ok) {
      window.location.href = "/dashboard";
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
