function liveSearch() {
  let cards = document.querySelectorAll('.space')
  let search_query = document.getElementById("idSearch").value;
  console.log(cards)

  for (var i = 0; i < cards.length; i++) {
    if (cards[i].innerText.toLowerCase()
      .includes(search_query.toLowerCase())) {
      cards[i].classList.remove("hidden");
    } else {
      cards[i].classList.add("hidden");
    }
  }
}

let typingTimer;
let typeInterval = 500;
let searchInput = document.getElementById('idSearch');

searchInput.addEventListener('keyup', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearch, typeInterval);
});

$(document).ready(function () {
  $("#main-background").css("background", "url('svg/yw.svg')");
  $("#main-background").css("backgroundColor", "black").css("backgroundSize", "cover")
})

