var app = angular.module('app', []);
app.controller('productController', function ($scope, $http) {
    $http
        .get('/api/public/products')
        .then((res) => {
            console.log(res.data);
            $scope.products = res.data;
        })
        .catch((err) => {
            Promise.reject(err);
        })
        .finally(() => {
            $(document).ready(function () {
                $('#example1')
                    .DataTable({
                        responsive: true,
                        lengthChange: false,
                        autoWidth: true,
                        pageLength: 10,
                        order: [0, 'desc'],
                        buttons: [
                            'copy',
                            'csv',
                            'excel',
                            'pdf',
                            'print',
                            'colvis',
                        ],
                    })
                    .buttons()
                    .container()
                    .appendTo('#example1_wrapper .col-md-6:eq(0)');
            });
        });

    $http
        .get('/api/public/categories')
        .then((res) => {
            console.log(res.data);
            $scope.categories = res.data;
        })
        .catch((err) => {
            Promise.reject(err);
        });

    $scope.formProduct = {
        name: 'Test Product name',
        price: 100,
        createDate: new Date(),
        available: true,
        category: {
            id: 1,
        },
    };

    $scope.submit = function () {
        var formData = new FormData();
        formData.append('name', $scope.formProduct.name);
        formData.append('price', $scope.formProduct.price);
        formData.append('createDate', $scope.formProduct.createDate);
        formData.append('category', $scope.formProduct.category.id);
        formData.append('file', document.getElementById('file').files[0]);

        for (var entry of formData.entries()) {
            var key = entry[0];
            var value = entry[1];
            console.log(key, value);
        }

        $http
            .post('/api/public/products', formData, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
            })
            .then(
                (res) => {
                    console.log(res.data);
                },
                (err) => {
                    Promise.reject(err);
                },
            );
    };
});
