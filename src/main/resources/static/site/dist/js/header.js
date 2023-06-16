var template = ` <nav class="bg-white border-gray-200 dark:bg-gray-900 fixed w-full z-20 top-0 left-0">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

            <a href="#" class="flex items-center ">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Logo_Tiki.png" class="h-8"
                    alt="Flowbite Logo"/>
            </a>


            <div class="flex items-center md:order-2">


                <button id="theme-toggle" type="button"
                        class="text-gray-500 duration-300 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z">
                        </path>
                    </svg>
                    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                </button>

                <button type="button"
                        class="relative text-gray-500 duration-300 mr-2.5 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                    <a href="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <span ng-hide="getTotalQuantity() == 0" id="total-cart-item"
                              ng-bind="getTotalQuantity()"
                              class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-red-500 border-2 border-gray-100 rounded-full top-0 right-[-1] dark:border-gray-900">
                        </span>
                    </a>
                </button>

                <!-- When login -->
                <button ng-if="!!user" type="button"
                        class="flex mr-1 text-sm bg-gray-800 rounded-full md:mr-0 duration-200 hover:ring-4 hover:ring-gray-300 dark:hover:ring-gray-600"
                        id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full  bg-white dark:bg-gray-900"
                         src="https://png.pngtree.com/png-vector/20220917/ourmid/pngtree-letter-p-icon-png-image_6187497.png"
                         alt="user photo">
                </button>
                <!-- When not login-->
                <button ng-if="!user" type="button"
                        class="flex mr-1 text-sm dark:bg-gray-800 rounded-lg md:mr-0 duration-200  hover:bg-gray-100 dark:hover:bg-gray-700 ">
                    <a href="/login" class="text-sky-500 dark:text-gray-200 py-2.5 px-3">Login Now</a>
                </button>
                <!-- Dropdown menu -->
                <div ng-if="!!user" class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                     id="user-dropdown">
                    <div class="px-4 py-3">
                        <span class="block text-sm text-gray-900 dark:text-white">{{user.name}}</span>
                        <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{user.email}}</span>
                    </div>
                    <ul class="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a href="/admin" ng-if="user.admin"
                               class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Admin</a>
                        </li>
                        <li>
                            <a href="/cart"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Cart</a>
                        </li>
                        <li>
                            <a href="/order"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Order</a>
                        </li>
                        <li>
                            <button data-dropdown-placement="left-start" data-dropdown-offset-distance="5" type="button"
                                    data-dropdown-toggle="language-dropdown-menu"
                                    class="w-full cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                <div class="flex justify-between">
                                    <span class="md:block hidden mr-1"> English (US)</span>
                                    <img class="h-5 w-5 rounded-full"
                                         src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
                                         alt="">
                                </div>
                            </button>
                            <!-- Dropdown -->
                            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                                 id="language-dropdown-menu">
                                <ul class=" font-medium" role="none">
                                    <li>
                                        <a href="#"
                                           class="block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                           role="menuitem">
                                            <div class="inline-flex items-center">
                                                <img class="h-3.5 w-3.5 rounded-full mr-2"
                                                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png"
                                                     alt="">
                                                <span>Viet Nam</span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <hr class="mt-2">
                        <li>
                            <a href="#" ng-click="signOut()"
                               class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Sign out</a>
                        </li>
                    </ul>
                </div>


                <button data-collapse-toggle="mobile-menu-2" type="button"
                        class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <a href="/"
                           class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-700 md:p-0 dark:text-white md:dark:hover:text-sky-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
                    </li>
                    <li>
                        <a href="/product"
                           class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-700 md:p-0 dark:text-white md:dark:hover:text-sky-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Shop</a>
                    </li>
                    <li>
                        <a href="#"
                           class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-700 md:p-0 dark:text-white md:dark:hover:text-sky-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                    </li>
                    <li>
                        <a href="#"
                           class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-700 md:p-0 dark:text-white md:dark:hover:text-sky-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;

var renderHeader = (id = '', activeItem = 1) => {
    document.getElementById(id).innerHTML = template;
    var sidebarItems = document.querySelectorAll('[data-active-sidebar]');
    sidebarItems.forEach((item) => {
        if (item.dataset.activeSidebar == activeItem) {
            item.classList.add('active');
        }
    });
};
