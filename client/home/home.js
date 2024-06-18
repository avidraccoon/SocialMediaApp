
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

async function generateHtmlForPost(post){
  const title = post.title;
  const body = post.body;
  const resp = await fetch("post.html");
  const html = await resp.text();
  const element = document.createElement("div");
  element.innerHTML = html;
  const titleElement = element.querySelector(".title");
  const bodyElement = element.querySelector(".body");
  const authorElement = element.querySelector(".author");
  titleElement.innerText = title;
  bodyElement.innerText = body;
  authorElement.innerText = post.author;
  document.body.appendChild(element);
  //return element;
}

function generateHtmlForComment(comment){
  
}

post = {
  title: "title",
  author: "test",
  body: "random body",
  comments: []
}

generateHtmlForPost(post)
generateHtmlForPost(post)
generateHtmlForPost(post)
generateHtmlForPost(post)



