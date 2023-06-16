var app = angular.module('app', []);
app.controller('cartController', function ($scope, $http) {
    $scope.products = getCartFromLS();
    $scope.user = JSON.parse(localStorage.getItem('user')) || null;
    $scope.signOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        $scope.user = null;
        window.open('http://localhost:8080/', '_self');
    };

    $scope.loading = false;
    $scope.submit = () => {
        const shipFee = $scope.getTax();
        const orderItemDTOS = $scope.products.map((product) => ({
            quantity: product.quantity,
            product,
        }));
        const address = 'HCM';
        const formData = { shipFee, orderItemDTOS, address };
        $scope.loading = true;
        $http
            .post('/api/order', formData, {
                headers: {
                    Authorization:
                        'Bearer ' + localStorage.getItem('access_token') || '',
                },
            })
            .then((res) => {
                const data = res.data;
                if (data.success) {
                    $scope.products = [];
                    setCartToLS([]);
                }
            })
            .catch((err) => {
                Promise.reject(err);
            })
            .finally(() => ($scope.loading = false));
    };

    $scope.getTotalPrice = () => {
        return $scope.products.reduce(
            (acc, curr) => acc + curr.quantity * curr.price,
            0,
        );
    };

    $scope.getTotalQuantity = () => {
        return $scope.products.reduce((acc, curr) => acc + curr.quantity, 0);
    };

    $scope.getShippingFee = () => {
        if ($scope.getTotalPrice() > 100) {
            return 0;
        } else {
            return 34;
        }
    };

    $scope.getTax = () => {
        return Math.floor($scope.getTotalPrice() * 0.02);
    };

    $scope.getTotalCartPrice = () => {
        return (
            $scope.getTotalPrice() + $scope.getShippingFee() + $scope.getTax()
        );
    };

    $scope.increaseQuantity = (product) => {
        product = { ...product, quantity: product.quantity++ };
        setCartToLS($scope.products);
    };

    $scope.decreaseQuantity = (product) => {
        if (product.quantity === 1) {
            $scope.removeProduct(product);
        } else {
            product = { ...product, quantity: product.quantity-- };
        }
        setCartToLS($scope.products);
    };

    $scope.removeProduct = (product) => {
        $scope.products = $scope.products.filter(
            (item) => item.id !== product.id,
        );
        setCartToLS($scope.products);
    };
});
