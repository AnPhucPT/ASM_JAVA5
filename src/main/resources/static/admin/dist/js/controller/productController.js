var app = angular.module('app', []);
app.controller('productController', function ($scope, $http, $timeout) {
    $scope.loading = false;
    $scope.isEdit = false;

    $scope.handleUploadImage = (e) => {
        if (e.target.files.length) {
            $scope.avatar = URL.createObjectURL(e.target.files[0]);
            $scope.$apply();
        }
    };

    // Create Product
    $scope.submit = () => {
        $('#modal-default').modal('toggle');
        $scope.loading = true;
        var formData = $scope.formDataForCreateProduct();
        $http
            .post('/api/public/products', formData, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
            })
            .then(
                (res) => {
                    $('#example1').DataTable().destroy();
                    $scope.products = [...$scope.products, { ...res.data }];
                    $scope.initDataTable();
                },
                (err) => {
                    Promise.reject(err);
                },
            )
            .finally(() => {
                $timeout(function () {
                    $scope.loading = false;
                }, 1000);
                $timeout(function () {
                    $scope.createToast(
                        'Create Product',
                        'bg-light',
                        5000,
                        'Your Product has been Created Successfully!!!',
                    );
                }, 1500);
            });
    };
    //Update Product
    $scope.update = function (product) {
        $('#modal-default').modal('toggle');
        $scope.loading = true;
        var formData = $scope.formDataForUpdateProduct();
        $http
            .put('/api/public/products', formData, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
            })
            .then(
                (res) => {
                    $('#example1').DataTable().destroy();
                    $scope.products = res.data;
                    $scope.initDataTable();
                },
                (err) => {
                    Promise.reject(err);
                },
            )
            .finally(() => {
                $timeout(function () {
                    $scope.loading = false;
                }, 1000);
                $timeout(function () {
                    $scope.createToast({
                        title: 'Update Product',
                        class: 'bg-light',
                        autohide: true,
                        delay: 5000,
                        body: 'Your Product has been Updated Successfully!!!',
                    });
                }, 1500);
            });
    };

    $scope.delete = () => {
        $scope.loading = true;
        $http
            .delete('/api/public/products/' + $scope.deleteProductId)
            .then((res) => {
                console.log(res.data.message);
                $('#example1').DataTable().destroy();
                $scope.products = $scope.products.filter(
                    (item) => item.id !== $scope.deleteProductId,
                );
                $scope.initDataTable();
            })
            .catch((err) => {
                Promise.reject(err);
            })
            .finally(() => {
                $timeout(function () {
                    $scope.loading = false;
                }, 1000);
                $timeout(function () {
                    $scope.createToast({
                        title: 'Delete Product',
                        class: 'bg-light',
                        autohide: true,
                        delay: 5000,
                        body: 'Your Product has been Deleted Successfully!!!',
                    });
                }, 1500);
            });
    };

    //Show Product to modal
    $scope.edit = (product) => {
        $scope.isEdit = true;
        $scope.avatar = '/images/product/' + product.image;
        $scope.formProduct = { ...product };
        $('#modal-default').modal('toggle');
    };

    $scope.openModalCreateProduct = () => {
        $scope.isEdit = false;
        $scope.avatarPreview = null;
        $scope.avatar = null;
        $scope.resetFormProduct();
        $('#modal-default').modal('toggle');
    };

    $scope.openModalDeleteProduct = (id) => {
        $scope.deleteProductId = id;
        $('#modal-delete-confirm').modal('toggle');
    };

    // =============================================== //

    $scope.createToast = (options) => {
        $(document).Toasts('create', options);
    };

    $scope.resetFormProduct = () => {
        $scope.formProduct = {
            id: '',
            name: '',
            price: 100,
            image: '',
            category: {
                id: 1,
            },
        };
    };

    $scope.formDataForUpdateProduct = () => {
        var formData = new FormData();
        formData.append('id', $scope.formProduct.id);
        formData.append('name', $scope.formProduct.name);
        formData.append('price', $scope.formProduct.price);
        formData.append('categoryId', $scope.formProduct.category.id);
        if (document.getElementById('imageInput').files.length > 0) {
            formData.append(
                'file',
                document.getElementById('imageInput').files[0],
            );
        }
        return formData;
    };

    $scope.formDataForCreateProduct = () => {
        var formData = new FormData();
        formData.append('name', $scope.formProduct.name);
        formData.append('price', $scope.formProduct.price);
        formData.append('categoryId', $scope.formProduct.category.id);
        formData.append('file', document.getElementById('imageInput').files[0]);
        return formData;
    };

    $http
        .get('/api/public/products')
        .then((res) => {
            $scope.products = res.data;
            $scope.initDataTable();
        })
        .catch((err) => {
            Promise.reject(err);
        });

    $http
        .get('/api/public/categories')
        .then((res) => {
            $scope.categories = res.data;
        })
        .catch((err) => {
            Promise.reject(err);
        });

    $scope.initDataTable = () => {
        return $(document).ready(function () {
            $('#example1')
                .DataTable({
                    destroy: true,
                    responsive: true,
                    lengthChange: false,
                    autoWidth: true,
                    pageLength: 4,
                    order: [0, 'desc'],
                    buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
                })
                .buttons()
                .container()
                .appendTo('#example1_wrapper .col-md-6:eq(0)');
        });
    };
});

app.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.on('change', onChangeHandler);
            element.on('$destroy', function () {
                element.off();
            });
        },
    };
});
