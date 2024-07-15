function reviewAdd() {
  const product = document.querySelector(".name").value;
  const review = document.querySelector(".review").value;
  if (!product || !review) {
    alert("Ошибка! Заполнены не все поля!");
    return;
  }

  let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
  if (!reviews[product]) {
    reviews[product] = [];
  }
  reviews[product].push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  document.querySelector(".name").value = "";
  document.querySelector(".review").value = "";
  reviewsSee();
}

function reviewsSee() {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
  const reviewsDiv = document.getElementById("reviews");
  reviewsDiv.innerHTML = "";
  Object.keys(reviews).forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `<h4>${product}</h4>`;
    reviews[product].forEach((review, index) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.innerHTML = `${review} <button onclick="reviewDelete('${product}', ${index})">Удалить</button>`;
      productDiv.appendChild(reviewDiv);
    });
    reviewsDiv.appendChild(productDiv);
  });
}

function reviewDelete(product, index) {
  const reviews = JSON.parse(localStorage.getItem("reviews"));
  reviews[product].splice(index, 1);
  if (reviews[product].length === 0) {
    delete reviews[product];
  }
  localStorage.setItem("reviews", JSON.stringify(reviews));
  reviewsSee();
}

window.onload = reviewsSee;
