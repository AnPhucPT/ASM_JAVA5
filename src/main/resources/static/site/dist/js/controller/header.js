app.controller('headerController', function ($scope) {
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
});
