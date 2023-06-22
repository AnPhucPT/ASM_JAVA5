var app = angular.module('app', []);
const initialPagination = { page: 0, pageSize: 10 };
app.controller(
    'productController',
    function ($scope, $http, $timeout, $location) {
        $scope.searchParams = { ...initialPagination };
        $scope.search = '';
        console.log($scope.search);
        $scope.getAllProduct = () => {
            $scope.loading = true;
            $http
                .get('http://localhost:8080/api/public/products/filter', {
                    params: $scope.searchParams,
                })
                .then((res) => {
                    $scope.products = res.data.datas;
                })
                .catch((err) => {
                    Promise.reject(err);
                })
                .finally(() => {
                    $timeout(function () {
                        $scope.loading = false;
                    }, 500);
                });
        };

        $scope.$watch('searchParams', function () {
            $scope.getAllProduct();
            $location.search($scope.searchParams);
        });

        $scope.$watch('search', function () {
            if ($scope.search) {
                $scope.searchParams = {
                    page: 0,
                    pageSize: $scope.searchParams.pageSize,
                    keyword: $scope.search,
                };
            } else {
                if ($scope.searchParams.keyword) {
                    $scope.searchParams = { ...initialPagination };
                }
            }
        });

        $scope.getProductByCategory_Id = (id) => {
            $scope.searchParams = { ...$scope.searchParams, categoryId: id };
        };
        $scope.getProductByPriceRange = () => {
            $scope.searchParams = {
                ...$scope.searchParams,
                minPrice: $scope.min,
                maxPrice: $scope.max,
            };
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
            $scope.carts = getCartFromLS();
            $timeout(function () {
                $scope.loading = false;
            }, 500);
            $timeout(function () {
                showSuccessToast();
            }, 1000);
        };
    },
);
