$("#postComment").click(async function () {
  const content = $("#content").val().trim();
  const postId = window.location.href.substring(34);
  if (!content) {
    window.location.reload();
    return;
  }

  const res = await fetch("/api/comment/post", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, postId }),
  });
  if (res.ok) {
    window.location.reload();
    return;
  }
});
