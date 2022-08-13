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
      templateUrl: "Cart.html",
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
  $http.get("json/products.json").then(function(rsp_rating){
    var obj_Rating = rsp_rating.data;
    $rootScope.dataRating = [];
    var a =0;
    for(const key in obj_Rating){
      if(obj_Rating[key].rating  === 5 && a <4 ){
        a++;
        $rootScope.dataRating.push(obj_Rating[key]);
      }
    }
  })
});

