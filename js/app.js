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

});


app.run(function ($rootScope, $http) {
  $http.get("json/products.json").then(function (rsp) {
    var obj = rsp.data;
    $rootScope.dataBest = [];
    for (const key in obj) {
      if (obj[key].bestSelling == true) {
        $rootScope.dataBest.push(obj[key]);
      }
    }
    console.log($rootScope.dataBest);
  });
});
app.run(function ($rootScope, $http) {
  $http.get("json/products.json").then(function (rsp) {
    var obj = rsp.data;
    $rootScope.dataSale = [];
    var i = 0;
    for (const key in obj) {
      if (obj[key].isSale == true && i < 6) {
        i++;
        $rootScope.dataSale.push(obj[key]);
      }
    }
    console.log($rootScope.dataSale);
  });
});

$(".hover").mouseleave(function () {
  $(this).removeClass("hover");
});
