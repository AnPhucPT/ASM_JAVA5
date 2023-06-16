var app = angular.module('app', []);
app.controller('orderController', function ($scope, $http) {
    $scope.products = getCartFromLS();
    $scope.loading = false;
    $scope.getTotalQuantity = () => {
        return $scope.products.reduce((acc, curr) => acc + curr.quantity, 0);
    };
    $scope.user = JSON.parse(localStorage.getItem('user')) || null;
    $scope.signOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        $scope.user = null;
        window.open('http://localhost:8080/', '_self');
    };

    $scope.cancelOrder = (id) => {
        $scope.loading = true;
        $http
            .delete('/api/order/' + id, {
                headers: {
                    Authorization:
                        'Bearer ' + localStorage.getItem('access_token') || '',
                },
            })
            .then((res) => {
                setTimeout(() => {
                    $scope.$apply(() => {
                        $scope.orders = $scope.orders.filter(
                            (item) => item.id !== id,
                        );
                        $scope.loading = false;
                    });
                }, 900);
            })
            .catch((err) => {
                Promise.reject(err);
            });
    };

    $http
        .get('/api/order/account-' + $scope.user.id, {
            headers: {
                Authorization:
                    'Bearer ' + localStorage.getItem('access_token') || '',
            },
        })
        .then((res) => {
            $scope.orders = res.data;
            console.log($scope.orders);
        })
        .catch((err) => {
            Promise.reject(err);
        })
        .finally(() => {});
});
