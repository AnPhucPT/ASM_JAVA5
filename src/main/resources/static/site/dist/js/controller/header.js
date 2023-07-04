const defaultOptions = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
};
app.run(function ($rootScope) {
    $rootScope.initDropDown = (target, trigger, options) => {
        const $targetEl = document.querySelector(target);
        if ($targetEl) {
            const $triggerEl = document.querySelector(trigger);
            const dropDown = new Dropdown($targetEl, $triggerEl, {
                ...defaultOptions,
                ...options,
            });
            return dropDown;
        }
        return null;
    };
});
/*
    Java. JVM: main(): Main thread
    task: 
    HDH: 4core 8 thread
    Thread Pools: 20 thread, 
    executor.setCorePoolSize(2);
    executor.setMaxPoolSize(4);
    executor.setQueueCapacity(100);
    results[]
    ThreadPoolTaskExecutor 
    return success;
*/
app.controller('headerController', function ($scope, $rootScope, $timeout) {
    $timeout(function () {
        console.log(document.getElementById('userDropDown'));
        $scope.dropDown = $rootScope.initDropDown('#userDropDown', '#trigger');
    });

    $scope.toggleDropDown = () => {
        if ($scope.dropDown.isVisible()) {
            $scope.dropDown.show();
        } else {
            $scope.dropDown.hide();
        }
    };

    $scope.isDarkTheme = false;
    // Change the icons inside the button based on previous settings
    if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        $scope.isDarkTheme = true;
    } else {
        $scope.isDarkTheme = false;
    }

    $scope.toggleTheme = () => {
        $scope.isDarkTheme = !$scope.isDarkTheme;
        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }

            // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    };

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
