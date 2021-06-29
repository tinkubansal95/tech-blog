const title = $("#title");
const content = $("#content");

$("#updatePost").click(async function () {
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
    const id = $("#updatePost").attr("data-post");
    const res = await fetch("/api/post/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title: titleVal, content: contentVal }),
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
});

$("#deletePost").click(async function () {
  const id = $("#deletePost").attr("data-post");
  const res = await fetch("/api/post/delete", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
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
});
