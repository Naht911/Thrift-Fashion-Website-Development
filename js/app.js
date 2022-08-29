var app = angular.module("myApp", ["ngRoute"]);
app.controller("myController", function ($scope, $rootScope, $http, $location) {
  $scope.saveName = function () {
    $scope.hideForm = !$scope.hideForm;
  };
  
$rootScope.CountFunct = function(){
  $rootScope.countVisit = localStorage.getItem("countVisit");
  if ($rootScope.countVisit == null) {

    $rootScope.countVisit = 0;

  }else{
    $rootScope.countVisit++;
  }
  localStorage.setItem("countVisit", $rootScope.countVisit);
}
$rootScope.CountFunct();
  // if(!$rootScope.countVisit){
  //   $rootScope.countVisit = 0;
  // }else{
  //   $rootScope.countVisit++;
  // }
  
$rootScope.quantity = 1;
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

  $rootScope.addtocart = function (id, name, price, quantity) {
    var oldItems = JSON.parse(localStorage.getItem("itemsArray")) || [];
    
    var count = 0;
    for (const key in oldItems) {
      if (oldItems[key].id == id) {
        count++;
        // console.log(oldItems[key].name + "dsd");
        oldItems[key].quantity = oldItems[key].quantity + quantity;
        // console.log(quantity);
        // console.log("oldItems[key].quantity: " + oldItems[key].quantity);
      }
      if(oldItems[key].id == id && oldItems[key].quantity <= 0){
        oldItems.splice(key, 1);
      }else{
        localStorage.setItem("itemsArray", JSON.stringify(oldItems));
      }
    }

    if (count == 0 && quantity > 0) {
      var newItem = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
      };
      oldItems.push(newItem);
    }
    localStorage.setItem("itemsArray", JSON.stringify(oldItems));
    $rootScope.carItems = JSON.parse(localStorage.getItem("itemsArray"));
    $rootScope.calTotal();
    $rootScope.countProdFunct();
  };
  $rootScope.removefromcart = function (id) {
    var oldItems = JSON.parse(localStorage.getItem("itemsArray")) || [];
    var index = findIndexOfKey(id);
    oldItems.splice(index, 1);
    $rootScope.carItems = oldItems;
    localStorage.setItem("itemsArray", JSON.stringify(oldItems));
    $rootScope.calTotal();
    $rootScope.countProdFunct();
    
  }
  $rootScope.removeallcart = function () {
    localStorage.removeItem("itemsArray");
    $rootScope.carItems = [];
    $rootScope.total = 0;
    $rootScope.showCheckout = false;
    $rootScope.countProd = 0;
    $rootScope.calTotal();
  }
  

  $rootScope.carItems = JSON.parse(localStorage.getItem("itemsArray")) || [];
  $rootScope.total = 0;
  if($rootScope.carItems.length > 0){
    $rootScope.total = 0;
    for (const key in $rootScope.carItems) {
      $rootScope.total = $rootScope.total + $rootScope.carItems[key].price * $rootScope.carItems[key].quantity;
    }
    // console.log($rootScope.total);
  }
  $rootScope.checkoutsubmit = function () {
    console.log("checkoutsubmit");
    $rootScope.showCheckout = false;
    $rootScope.removeallcart();
    alert("Your order is received!");
    $location.url("/cart");
    // return false;
  }
  
  var users = [];
  $http.get("json/user.json").then(function (rsp_user) {
    users = rsp_user.data.users;
  });
  $rootScope.calTotal = function () {
    $rootScope.total = 0;
    for (const key in $rootScope.carItems) {
      $rootScope.total = $rootScope.total + $rootScope.carItems[key].price * $rootScope.carItems[key].quantity;
    }
    if($rootScope.total == 0){
      $rootScope.showCheckout = false;
      $rootScope.showCheckoutBt = false;
    }else{
      // $rootScope.showCheckout = true;
      $rootScope.showCheckoutBt = true;
    }
  }
  $rootScope.showCheckout = false;
  $rootScope.checkout = function () {
    if($rootScope.carItems.length > 0){
      $rootScope.showCheckout = !$rootScope.showCheckout;
      // $location.url("/checkout");
    }else{
      alert("Your cart is empty");
    }

  }
  $rootScope.countProd = 0;
  $rootScope.countProd = $rootScope.carItems.length;
  $rootScope.countProdFunct = function () {
    $rootScope.countProd = $rootScope.carItems.length;
  }

  $rootScope.login = function () {
    username = $('input[name="username"]').val();
    password = $('input[name="password"]').val();

    for (const key in users) {
      if (users[key].username == username && users[key].password == password) {
        $rootScope.user = users[key];
        // console.log($rootScope.user);
        // var isLogin = true;
        $scope.isLogin = true;
        localStorage.setItem("isLogin", true);

        localStorage.setItem("user", JSON.stringify($rootScope.user));
        $rootScope.name = $rootScope.user.name;
        // localStorage.setItem("isLogin", true);
        var url = $location.url();
        $location.url('/#')
        // console.log(url);
        $scope.logned_msg = "Welcome " + $rootScope.user.name;
        // return true;
      }
    }
    console.log("false");
    $scope.login_err = 'Username or password is incorrect';
    return false;
  };
  $scope.isLogin = JSON.parse(localStorage.getItem("isLogin")) || false;
  if($scope.isLogin){
    user = JSON.parse(localStorage.getItem("user"));
    
    $rootScope.name = user.name;
    console.log(user.name);
  }else{
     var logned_msg = "";
  }
  
  // console.log(logned_msg);
  $rootScope.logout = function () {
    localStorage.setItem("isLogin", false);
    localStorage.setItem("user", null);
    $scope.isLogin = false;
    $scope.logned_msg = "";
    $rootScope.name = "";

  };
  var productDetail = [];
  $http.get("json/products.json").then(function (rsp) {
    productDetail = rsp.data;
  });
  $rootScope.viewDetails = function (id) {
    for (const key in productDetail) {
    if(productDetail[key].id == id){
      $rootScope.product = productDetail[key];
      console.log($rootScope.product);
      // $location.url('/product-detail');
    }
    }
    //#!product/{{d.id}}
    console.log(productDetail.id);

    $location.url("/product/" + id);
    
  }
  



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
    .when("/login", {
      title: "Login",
      templateUrl: "login.html",
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
    // console.log(current.$$route.title);
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
  $http.get("json/products.json").then(function (rsp_rating) {
    var obj_Rating = rsp_rating.data;
    $rootScope.dataRating = [];
    var a = 0;
    for (const key in obj_Rating) {
      if (obj_Rating[key].rating === 5 && a < 4) {
        a++;
        $rootScope.dataRating.push(obj_Rating[key]);
      }
    }
  });
});

//  show arlet
app.controller("app", [
  "$scope",
  function ($app) {
    $app.alert = function () {
      alert("Thank's you");
    };
  },
]);
// validate from
app.controller("RegisterCtrl", [
  "$scope",
  function ($scope) {
    $scope.success = false;
    $scope.register = function () {
      $scope.success = true;
      $scope.register = function () {
        alert("Your message has sent to us successful");
      };
    };
  },
]);
