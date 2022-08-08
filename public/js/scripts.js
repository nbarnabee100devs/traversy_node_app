document.addEventListener("DOMContentLoaded", function () {
  M.Sidenav.init(document.querySelector(".sidenav"));
  M.FormSelect.init(document.getElementById("status"));
  CKEDITOR.replace("body", {
    plugins: "basicstyles, toolbar, wysiwygarea, link",
  });
});
