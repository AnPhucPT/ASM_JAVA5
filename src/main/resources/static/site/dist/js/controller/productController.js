var app = angular.module('app', []);
const initialPagination = { page: 0, pageSize: 8 };
var range = document.getElementById('progress');
var priceGap = 20;
app.controller(
    'productController',
    function ($scope, $http, $timeout, $location) {
        $scope.searchParams = { ...initialPagination };
        $scope.search = '';
        $scope.resetProduct = () => {
            $scope.searchParams = { ...initialPagination };
            $scope.search = '';
        };
        $scope.getAllProduct = () => {
            $scope.loading = true;
            $http
                .get('http://localhost:8080/api/public/products/filter', {
                    params: $scope.searchParams,
                })
                .then((res) => {
                    console.log(res.data);
                    $scope.products = res.data.data.datas;
                    $scope.totalPage = res.data.data.totalPage;
                    $scope.totalItems = res.data.data.totalItems;
                    $scope.getTotalPage = () => {
                        return Array.from(
                            { length: $scope.totalPage },
                            (_, index) => index + 1,
                        );
                    };
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
                    ...$scope.searchParams,
                    page: 0,
                    pageSize: $scope.searchParams.pageSize,
                    keyword: $scope.search,
                };
            } else {
                if ($scope.searchParams.keyword) {
                    delete $scope.searchParams.keyword;
                    $scope.searchParams = { ...$scope.searchParams };
                }
            }
        });

        $scope.$watch('max', function () {
            if ($scope.max - $scope.min < priceGap) {
                $scope.max = $scope.min + priceGap;
            }
            range.style.right =
                100 - ($scope.max / $scope.maxValue) * 100 + '%';
        });

        $scope.$watch('min', function () {
            if ($scope.max - $scope.min < priceGap) {
                $scope.min = $scope.max - priceGap;
            }
            range.style.left = ($scope.min / $scope.maxValue) * 100 + '%';
        });

        $scope.nextPage = () => {
            if ($scope.searchParams.page < $scope.totalPage - 1) {
                $scope.searchParams = {
                    ...$scope.searchParams,
                    page: ($scope.searchParams.page += 1),
                };
            }
        };
        $scope.prevPage = () => {
            if ($scope.searchParams.page > 0) {
                $scope.searchParams = {
                    ...$scope.searchParams,
                    page: ($scope.searchParams.page -= 1),
                };
            }
        };

        $scope.changePage = (index) => {
            $scope.searchParams = {
                ...$scope.searchParams,
                page: index - 1,
            };
        };

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
                console.log(res.data);
                $scope.categories = res.data;
            });

        $http
            .get('http://localhost:8080/api/public/product/min-max')
            .then((res) => {
                console.log(res.data);
                $scope.minValue = 0;
                $scope.maxValue = res.data.data.max + 30;
                $scope.min = res.data.data.min;
                $scope.max = res.data.data.max;
                range.style.left = ($scope.min / $scope.maxValue) * 100 + '%';
                range.style.right =
                    100 - ($scope.max / $scope.maxValue) * 100 + '%';
            });

        $scope.addToCart = (product) => {
            $scope.loading = true;
            addToCart(product);
            $scope.carts = getCartFromLS();
            $timeout(function () {
                $scope.loading = false;
            }, 500);
            $timeout(function () {
                showSuccessToast();
            }, 700);
        };
    },
);
