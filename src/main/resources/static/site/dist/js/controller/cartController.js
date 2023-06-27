var app = angular.module('app', []);
const defaultOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
};

app.run(function ($rootScope) {
    $rootScope.initModal = (selector, options) => {
        const $targetEl = document.querySelector(selector);
        const modal = new Modal($targetEl, { ...defaultOptions, ...options });
        return modal;
    };
});

app.controller('cartController', function ($scope, $http, $rootScope) {
    $scope.products = getCartFromLS();
    $scope.user = JSON.parse(localStorage.getItem('user')) || null;
    $scope.signOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        $scope.user = null;
        window.open('http://localhost:8080/', '_self');
    };

    $scope.modal = $rootScope.initModal('#deleteModal');

    $scope.removeProductItem = () => {
        if ($scope.removeProduct) {
            console.log($scope.removeProduct);
            $scope.products = $scope.products.filter(
                (item) => item.id !== $scope.removeProduct.id,
            );
        }
        setCartToLS($scope.products);
        $scope.hideModal();
    };

    $scope.showModal = () => {
        $scope.modal.show();
    };

    $scope.hideModal = () => {
        $scope.modal.hide();
    };

    $scope.setRemoveProduct = (product) => {
        $scope.showModal();
        $scope.removeProduct = product;
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
            $scope.setRemoveProduct(product);
        } else {
            product = { ...product, quantity: product.quantity-- };
        }
        setCartToLS($scope.products);
    };
});
