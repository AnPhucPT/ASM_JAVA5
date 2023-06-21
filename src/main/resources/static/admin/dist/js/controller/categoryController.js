var app = angular.module('app', []);
app.controller('categoryController', function ($scope, $http, $timeout) {
    $scope.loading = false;
    $scope.isEdit = false;

    $scope.edit = (category) => {
        $scope.isEdit = true;
        $scope.category = { ...category };
        $('#modal-default').modal('toggle');
    };

    $scope.category = {
        id: '',
        name: '',
    };

    // Create Product
    $scope.submit = () => {
        $('#modal-default').modal('toggle');
        $scope.loading = true;
        $http
            .post('/api/public/categories', { ...$scope.category })
            .then(
                (res) => {
                    $('#example1').DataTable().destroy();
                    $scope.categories = [...$scope.categories, { ...res.data }];
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
                        title: 'Create Category',
                        class: 'bg-light',
                        autohide: true,
                        delay: 5000,
                        body: 'Your Category has been Created Successfully!!!',
                    });
                }, 1500);
            });
    };
    //Update Category
    $scope.update = function () {
        $('#modal-default').modal('toggle');
        $scope.loading = true;

        $http
            .put('/api/public/categories', { ...$scope.category })
            .then(
                (res) => {
                    $scope.categories = res.data;
                    $('#example1').DataTable().destroy();
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
            .delete('/api/public/categories/' + $scope.deleteProductId)
            .then((res) => {
                console.log(res.data.message);
                $('#example1').DataTable().destroy();
                $scope.categories = $scope.categories.filter(
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

    $http
        .get('/api/public/categories')
        .then((res) => {
            console.log(res.data);
            $scope.categories = res.data;
            $scope.initDataTable();
        })
        .catch((err) => {
            Promise.reject(err);
        });

    $scope.createToast = (options) => {
        $(document).Toasts('create', options);
    };

    $scope.openModalCreateProduct = () => {
        $scope.isEdit = false;
        $scope.resetFormCategory();
        $('#modal-default').modal('toggle');
    };

    $scope.openModalDeleteProduct = (id) => {
        $scope.deleteProductId = id;
        $('#modal-delete-confirm').modal('toggle');
    };

    $scope.resetFormCategory = () => {
        $scope.category = {
            id: '',
            name: '',
        };
    };

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
