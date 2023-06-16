const app = angular.module('app', []);
app.controller('productController', function ($scope, $http) {
    $scope.user = JSON.parse(localStorage.getItem('user')) || null;
    $scope.signOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        $scope.user = null;
        window.open('http://localhost:8080/', '_self');
    };
    $scope.carts = getCartFromLS();
    $scope.loading = false;
    $scope.getTotalQuantity = () => {
        return $scope.carts.reduce((acc, curr) => acc + curr.quantity, 0);
    };

    $scope.getAllProduct = () => {
        $scope.loading = true;
        $http.get('http://localhost:8080/api/public/products').then((res) => {
            $scope.products = res.data;
            setTimeout(() => {
                $scope.$apply(() => {
                    $scope.loading = false;
                });
            }, 600);
        });
    };

    $scope.getAllProduct();

    $scope.getProductByCategory_Id = (id) => {
        $scope.loading = true;
        $http
            .get('http://localhost:8080/api/public/products/category-' + id)
            .then((res) => {
                setTimeout(() => {
                    $scope.$apply(() => {
                        $scope.loading = false;
                        $scope.products = res.data;
                    });
                }, 600);
            });
    };
    $scope.getProductByPriceRange = () => {
        $scope.loading = true;
        $http
            .get(
                'http://localhost:8080/api/public/products/search?min=' +
                    $scope.min +
                    '&max=' +
                    $scope.max,
            )
            .then((res) => {
                setTimeout(() => {
                    $scope.$apply(() => {
                        $scope.loading = false;
                        $scope.products = res.data;
                    });
                }, 600);
            });
    };

    $http
        .get('http://localhost:8080/api/public/categories/exist')
        .then((res) => {
            $scope.categories = res.data;
        });

    $scope.min = 1;
    $scope.max = 100;

    $scope.addToCart = (product) => {
        $scope.loading = true;
        addToCart(product);
        setTimeout(() => {
            $scope.$apply(() => {
                $scope.loading = false;
                $scope.carts = getCartFromLS();
            });
        }, 600);
    };
});
