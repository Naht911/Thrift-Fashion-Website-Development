var app = angular.module("myApp", ["ngRoute"]);
app.controller("myController", function ($scope, $rootScope) {
  $scope.saveName = function () {
    $scope.hideForm = !$scope.hideForm;
  };

  $scope.checkvalues = function (user) {
    var category_id = $('input[name="category_id"]:checked').val();
    console.log(category_id);
    if (category_id) {
      return user.category == category_id;
    }
    return user.category != 0;
  };
  var findIndexOfKey = function (searchKey) {
    for (var i = 0; i < localStorage.getItem("itemsArray").length; i++) {
      console.log(localStorage.getItem("itemsArray"));
      var key = localStorage.key(i);
      if (key === searchKey) return i;
    }
    return -1;
  };
  $rootScope.carItems = [];
  var cartItems = $rootScope.carItems;
  $rootScope.addtocart = function (id, name, price, quantity) {
    var oldItems = JSON.parse(localStorage.getItem("itemsArray")) || [];
    if (oldItems.length == 0 || oldItems == null) {
      var newItem = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
      };

      oldItems.push(newItem);

      localStorage.setItem("itemsArray", JSON.stringify(oldItems));
    }
    var count = 0;
    for (const key in oldItems) {
      if (oldItems[key].id == id) {
        count++;
        console.log(oldItems[i].name + "dsd");
        oldItems[key].quantity = oldItems[key].quantity + 1;

        // return false;
      }
    }
    if (count == 0) {
      var newItem = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
      };

      oldItems.push(newItem);

      localStorage.setItem("itemsArray", JSON.stringify(oldItems));
    }

    for (const key in oldItems) {
      if (oldItems[key].id) {
        console.log(oldItems[key].id);
        console.log(typeof oldItems[key]);
        console.log("tìm thấy item trong localStorage: ");
      }
      // else{
      //   console.log(' không tìm thấy item trong localStorage');
      //   var newItem = {
      //     id: id,
      //     name: name,
      //     price: price,
      //     quantity: quantity,
      //   };

      //   oldItems.push(newItem);

      //   localStorage.setItem("itemsArray", JSON.stringify(oldItems));
      // }
      //  console.log(oldItems[key].id.includes(id))
    }

    const includesTwenty = oldItems.includes(id);
    if (!includesTwenty) {
    }

    console.log(oldItems); //true
  };
});
app.config(function ($routeProvider) {
  $routeProvider
    // .when('/', {templateUrl: 'home.html', title: 'About US'})
    .when("/", {
      templateUrl: "home.html",
      title: "Home",
    })
    .when("/prod", {
      title: "Product",
      templateUrl: "Product.html",
    })
    .when("/product/:id", {
      title: "productDetail",
      templateUrl: "productDetail.html",
    })
    .when("/ab", {
      title: "AboutUS",
      templateUrl: "AboutUS.html",
    })
    .when("/cart", {
      title: "Cart",
      templateUrl: "cart2.html",
    })
    .when("/contact", {
      title: "ContactUS",
      templateUrl: "ContactUS.html",
    })
    .otherwise({
      title: "Home",
      redirectTo: "/",
    });
});

app.run(function ($rootScope, $location) {
  $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
    $rootScope.title = current.$$route.title;
    console.log(current.$$route.title);
  });
});

// $routeProvider
app.run(function ($rootScope, $http) {
  $rootScope.$on(
    "$routeChangeSuccess",
    function (event, currentRoute, previousRoute) {
      $rootScope.title = currentRoute.title;
    }
  );
  $http.get("json/category.json").then(function (rsp_category) {
    $rootScope.list_category = rsp_category.data.category;
  });
  $http.get("json/products.json").then(function (rsp_products) {
    $rootScope.data_products = rsp_products.data;
  });
  $http.get("json/products.json").then(function (rsp_bestSelling) {
    var obj_bestSelling = rsp_bestSelling.data;
    $rootScope.dataBest = [];
    for (const key in obj_bestSelling) {
      if (obj_bestSelling[key].bestSelling == true) {
        $rootScope.dataBest.push(obj_bestSelling[key]);
      }
    }
    $http.get("json/products.json").then(function (rsp_Sales) {
      var obj_Sales = rsp_Sales.data;
      $rootScope.dataSale = [];
      var i = 0;
      for (const key in obj_Sales) {
        if (obj_Sales[key].isSale == true && i < 6) {
          i++;
          $rootScope.dataSale.push(obj_Sales[key]);
        }
      }
    });
  });
});
function cartItem(pcode, name, price, quantity) {
  this.pcode = pcode;
  this.name = name;
  this.price = price * 1;
  this.quantity = quantity * 1;
}
