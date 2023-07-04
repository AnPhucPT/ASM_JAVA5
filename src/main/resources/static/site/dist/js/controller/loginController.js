var app = angular.module('app', []);
app.controller('LoginController', function ($scope, $http) {
    $scope.products = getCartFromLS();
    $scope.getTotalQuantity = () => {
        return $scope.products.reduce((acc, curr) => acc + curr.quantity, 0);
    };
    $scope.user = JSON.parse(localStorage.getItem('user')) || null;
    $scope.form = {
        email: '',
        password: '',
    };
    $scope.login = () => {
        console.log(1);
        $http
            .post('/api/public/accounts', { ...$scope.form })
            .then((res) => {
                const data = res.data;
                console.log(data);
                if (data.success) {
                    localStorage.setItem('access_token', data.message);
                    localStorage.setItem('user', JSON.stringify(data.data));
                    $scope.user = data.data;
                    window.open('http://localhost:8080/', '_self');
                }
            })
            .catch((err) => {
                Promise.reject(err);
            });
    };
});
