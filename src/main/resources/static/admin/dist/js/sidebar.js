var template = ` <!-- Brand Logo -->
<a href="/product" class="brand-link ">
    <i class="fas fa-angle-left mx-1"></i>
    <span class="brand-text font-weight-light">Back to the Shop</span>

</a>

<!-- Sidebar -->
<div class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
            <img src="https://lh3.googleusercontent.com/fife/APg5EObedurXVRhuCASTzIxg5XMKo6BGUiEC8mevXbyK4I1XfiGF-scMYiyUT7SvdL2jennurSSsNVVVcaLWWlTcXUyj8hzUu7Pj940g8tnHPKZmHzcaQoUOD6s7OtGHTFPrfSr2HLfsWV__7l8nAahwQR5Tk5RnULj_g7ZOXEDpzzCv3gPPGq2-6l89SdrimNBL9zLiTI_nojYWwpKf-RmoD19JiV1WvUA3yK5cQJb2dRV6Kpse7upvl22cgQ_AS5MRXfTZ-6lOG6xxJmZkHXsj3eCuceFVDPlIwahmuhTjWKkQTxSN4HOWDsGVwT1rLBucrxiivXPn6jTvLA1dkgmCrEGMwEVBRHEFC78mz_5xe7nNFUwtmOvczFE2yM2zefsAQukGkIOfiFg5myYhBfrx8Up36FWS6cSYA33HnCCWl9jM3NKOrgM81InqkmVikBxqCy9-1mY8A7xxoYsFrWZEDa7YXRhPpsYXMfSNcix6hcjjjhOY3gdzYIpMVw-Ipwg2c1vlAZqf0jC7qOl4vsJr3iuDzqYUevc0HmuHydRkZwEueNcf20IRCeboCT55pU1YgwmRbpxqSZJRSmkLdd37NeXrGny4zsmeGoqFTZFh10ItITq5wFlP3h64xEjMCXlQ1uLRdz5jdJWYOgua_bQzxeTtpuuYgAVaR8upq_yXQuROogAnO_VjOMlLPTmqHiW4A2_urfsf4FirRpNlYK0KF9nlLOsuf-3IYrAwAoO8Bb09f9CuwrtgwAXpIhIzcGXT-ThGg_AmtSbElP3LhODeBz9sWUOH9ta7bxpiEIxXYNHWrspDDBHpgB2YNLTc-WVQTVmjcb1zoOvFwDKtXh7kANT2DeyhYerR77DILc6K5_2ldAlMudKw0pkHJKSFYU5cvXlE7xuHyg54z32CFK9TTaVb0-NYYYxTvbKavQJx66NSpZRExxa-01x4uj2ex0x8wykExz-G8T1YKQ4sQ3E-rMVtPKgBuvwGqR85a99esJEC3n8-YDUSlos8TMSP6GED41G4LxB47XGQugAdIqBvhMe7rxEPcFCxd2Hh1Om0f_ny3aUkoWFvAbis2X2Lk7aFZLDswfEQSt4Me_GUyBp_e898wEcUmls4g2V2A332nR4wOG6UxyDJm0Opy3MpXmolbGhD3FTjb7osLn2d7QKJjcojG4gaEB43yOavYh3eESyq75_TyYx4-6a_neg7fDdTsKdqlkZRv0B52VuGAmL_NQXfxpZ3iBXr1zGLDdwwUG8gUXw_qkqz476XC50GD6UDULPsZP5mM4Wj59Exq6e0H1F_Tiff8HuooYEvzLEt3Jh2_s1sC0_Nkm08NAREpLkSbTV6tgi6iuhGSlaWUK28NlR-0qBpWYCzI_Flh3zxVeKEgJr_ggaz=s32-c" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
            <a href="#" class="d-block">An Phuc</a>
        </div>
    </div>

    <!-- SidebarSearch Form -->
    <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
            <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
                <button class="btn btn-sidebar">
                    <i class="fas fa-search fa-fw"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Sidebar Menu -->
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
                <a href="/admin" class="nav-link" data-active-sidebar=1>
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                        HOME
                    </p>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" data-active-sidebar=2>
                    <i class="nav-icon fas fa-table"></i>
                    <p>
                        MANAGER
                        <i class="fas fa-angle-left right"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <a data-active-sidebar=2 href="/admin/order-manager" class="nav-link">
                            <i class="far fa-circle nav-icon"></i>
                            <p>Order Manager</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a data-active-sidebar=3 href="/admin/category-manager" class="nav-link">
                            <i class="far fa-circle nav-icon"></i>
                            <p>Categories</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a data-active-sidebar=4 href="pages/data.html" class="nav-link">
                            <i class="far fa-circle nav-icon"></i>
                            <p>Accounts</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a data-active-sidebar=5 href="/admin/product-manager" class="nav-link">
                            <i class="far fa-circle nav-icon"></i>
                            <p>Product</p>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
    <!-- /.sidebar-menu -->
</div>
<!-- /.sidebar -->`;

var renderSidebar = (id = '', activeItem = 1) => {
    document.getElementById(id).innerHTML = template;
    var sidebarItems = document.querySelectorAll('[data-active-sidebar]');
    sidebarItems.forEach((item) => {
        if (item.dataset.activeSidebar == activeItem) {
            item.classList.add('active');
        }
    });
};
