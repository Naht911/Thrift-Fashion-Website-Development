var postAPI = "../data/Quan_Product.json";
fetch(postAPI)
  .then(function (response) {
    // console.log(response);
    return response.json(); //return về 1 mảng chứa Object và javacript types
  })
  .then((data) => {
    // console.log(data)
    // ------------------------Sreach Bar --------------------------
    var search = document.getElementById("search");
    var matchlist = document.getElementById("match-list");

    const searchStates = async (searchText) => {
      const states = data;
      //regex
      let matches = states.filter((state) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return state.title.match(regex);
      });

      if (searchText.length === 0) {
        matches = [];
      }
      outputHtml(matches);
    };
    //show data in html
    const outputHtml = (matches) => {
      const html = matches
        .map(
          (match) => `
          <td style="display: inline-block; width:300px;height:300px;">
      <figure class="snip1577">
             <img src="${match.image}" alt="sample99" />
          <figcaption>
              <h3>${match.category}</h3>
              <h4>$${match.price}</h4>
          </figcaption>
              <a href="#"></a>
      </figure>
      </td>`
        )
        .join("");
      matchlist.innerHTML = html;
    };
    search.addEventListener("input", () => searchStates(search.value));

// ==========Search Money
document.getElementById("Quan_all").onclick = function () {
  var table = "";
  let getAll = data.filter((data) => {  
      table += `<td style="display: inline-block;">
      <figure class="snip1423">
               <img src="${data.image}" alt="sample57" />
           <figcaption>
               <h3>${data.category}</h3>
               <p>${data.title}.</p>
            <div class="price">
                ${data.price}
                </div>
          </figcaption>
          <button>Add</button>           
      </figure>

      </td>`
    document.getElementById("myTable").innerHTML = table
  })
}; 
// ================Search 1 < 20=========
document.getElementById("1-20").onclick = function () {
  var table = "";
  let getMoney1 = data.filter((data) => {
    if (data.price <= 20) {
      table += `<td style="display: inline-block;"> 
        <img style="width: 183px;" src="${data.image}" />
        <h2>${data.category}</h2>
        <p>${data.description}</p>
        <p>$${data.price}</p>
        <button>Add</button>
        </td>`
    }
    document.getElementById("myTable").innerHTML = table
  })
};
// ================Search 20 < 50=========
document.getElementById("20-50").onclick = function () {
  var table = "";
  let getMoney2 = data.filter((data) => {
    if (data.price >=20 && data.price <= 50 ) {
      table += `<td style="display: inline-block;"> 
        <img style="width: 183px;" src="${data.image}" />
        <h2>${data.category}</h2>
        <p>${data.description}</p>
        <p>$${data.price}</p>
        <button>Add</button>
        </td>`
    }
    document.getElementById("myTable").innerHTML = table
  })
};
// ================Search > 50=========
document.getElementById("100").onclick = function () {
  var table = "";
  let getMoney3 = data.filter((data) => {
    if (data.price > 50) {
      table += `<td style="display: inline-block;"> 
        <img style="width: 183px;" src="${data.image}" />
        <h2>${data.category}</h2>
        <p>${data.description}</p>
        <p>$${data.price}</p>
        <button>Add</button>
        </td>`
    }
    document.getElementById("myTable").innerHTML = table
  })
};
// ==============Categories Tree ============
// ==============Man Clothes
document.getElementById("man-clothes").onclick = function () {
  var table = "";
  let getItem1 = data.filter((data) => {
    if (data.category === "men's clothing") {
      table += `<td style="display: inline-block;"> 
        <img style="width: 183px;" src="${data.image}" />
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <p>$${data.price}</p>
        <button>Add</button>
        </td>`
    }
    document.getElementById("myTable").innerHTML = table
  })
};

// =================Women Clothes
document.getElementById("women-clothes").onclick = function () {
  var table = "";
  let getItem2 = data.filter((data) => {
    if (data.category === "women's clothing") {
      table += `<td style="display: inline-block;"> 
        <img style="width: 183px;" src="${data.image}" />
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <p>$${data.price}</p>
        <button>Add</button>
        </td>`
    }
    document.getElementById("myTable").innerHTML = table
  })
};
// =====================Jewelery
document.getElementById("jewelery").onclick = function () {
  var table = "";
  let getItem3 = data.filter((data) => {
    if (data.category === "jewelery") {
      table += `<td style="display: inline-block;"> 
        <img style="width: 183px;" src="${data.image}" />
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <p>$${data.price}</p>
        <button>Add</button>
        </td>`
    }
    document.getElementById("myTable").innerHTML = table
  })
};
// =====================Electronics
document.getElementById("electronics").onclick = function () {
  var table = "";
  let getItem4 = data.filter((data) => {
    if (data.category === "electronics") {
      table += `<td style="display: inline-block;"> 
        <img style="width: 183px;" src="${data.image}" />
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <p>$${data.price}</p>
         <button>Add</button>
        </td>`
    }
    document.getElementById("myTable").innerHTML = table
  })
};
});

// ==========Carl========
$(".hover").mouseleave(function () {
  $(this).removeClass("hover");
});
// ==========End Carl========
