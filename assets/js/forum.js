const API = "https://after-immersion-api.onrender.com/api";
const token = localStorage.getItem("token");

async function loadCategories() {
  const res = await fetch(`${API}/forum/categories`);
  const data = await res.json();

  const select = document.getElementById("category");

  data.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    select.appendChild(option);
  });
}

async function loadPosts(search = "") {
  const res = await fetch(`${API}/forum/posts?search=${search}`);
  const posts = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>${post.nom} - ${post.category}</small>
      <button onclick="loadComments(${post.id})">Voir</button>

      <div id="comments-${post.id}"></div>
      <input type="text" id="comment-${post.id}" placeholder="Commenter...">
      <button onclick="addComment(${post.id})">Envoyer</button>
    `;

    container.appendChild(div);
  });
}

async function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const category_id = document.getElementById("category").value;

  await fetch(`${API}/forum/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, content, category_id })
  });

  loadPosts();
}

async function loadComments(postId) {
  const res = await fetch(`${API}/forum/comments/${postId}`);
  const comments = await res.json();

  const container = document.getElementById(`comments-${postId}`);
  container.innerHTML = "";

  comments.forEach(c => {
    container.innerHTML += `<p><b>${c.nom}</b>: ${c.content}</p>`;
  });
}

async function addComment(postId) {
  const content = document.getElementById(`comment-${postId}`).value;

  await fetch(`${API}/forum/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ post_id: postId, content })
  });

  loadComments(postId);
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  loadPosts(e.target.value);
});

loadCategories();
loadPosts();