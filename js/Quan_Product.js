var postAPI = "./data/Quan_Product.json";
fetch(postAPI)
  .then(function (response) {
    // console.log(response);
    return response.json(); //return về 1 mảng chứa Object và javacript types
  })
  .then((data) => {
    // console.log(data)
    // ------------------------Sreach Bar --------------------------
    var search = document.getElementById('search');
    var matchlist = document.getElementById('match-list');

    const searchStates = async searchText => {
      const states = data;
      //regex
      let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.title.match(regex);
      });

      if (searchText.length === 0) {
        matches = [];
      }
      outputHtml(matches);
    }
    //show data in html
    const outputHtml = matches => {
      const html = matches.map(match => `
      <figure class="snip1583">
  <img style="width:300px; height:300px;" src="${match.image}" alt="sample68" />
  <div class="icons"><a><i class="ion-android-cart"></i></a><a><i class="ion-android-star"></i></a><a><i class="ion-android-share-alt"></i></a></div>
  <figcaption>
    <h3>${match.title}
        ${match.category}
    </h3>
    <div class="price">$${match.price}</div>
  </figcaption>
</figure>`
      ).join('');
      matchlist.innerHTML = html;
    }
    search.addEventListener('input', () => searchStates(search.value))
  })