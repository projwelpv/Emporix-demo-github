/**
 *  header-menu and sidebar menu data
 */
export default [
  {
    menu_title: "Home",
    //  "type": "subMenu",
    path: "/",
    icon: "home",
    child_routes: null,

    // "child_routes": [
    //    {
    //       "path": "/",
    //       "menu_title": "Home Default",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    //    {
    //       "path": "/index-new-fashion",
    //       "menu_title": "Home New Fashion",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    //    {
    //       "path": "/index-modern",
    //       "menu_title": "Home Modern",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    //    {
    //       "path": "/index-home-classic",
    //       "menu_title": "Home Classic",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    // ]
  },
  {
    menu_title: "Shop",
    path: "/products",
    mega: true,
    icon: "party_mode",
    child_routes: null,
    // "type": "subMenu",
    // "child_routes": [
    //    {
    //       "path": "/sidebar-with-load-more",
    //       "menu_title": "Sidebar With Load More",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    //    {
    //       "path": "/topbar-with-load-more",
    //       "menu_title": "Topbar  With Load More",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    //    {
    //       "path": "/sidebar-without-lazyload",
    //       "menu_title": "Sidebar Without Lazyload",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    //    {
    //       "path": "/topbar-without-lazyload",
    //       "menu_title": "Topbar Without Lazyload",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    //    {
    //       "path": "/sidebar-with-lazyload",
    //       "menu_title": "Sidebar With Lazyload",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    //    {
    //       "path": "/shop/clothing/29",
    //       "menu_title": "Product Detail",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    // ],
  },
  {
    // menu_title: "Blog",
    // path: "/Blogfullwidth",
    // mega: true,
    // icon: "party_mode",
    // "type": "subMenu",
    // "child_routes": [
    //    {
    //       "path": "/Blogfullwidth",
    //       "menu_title": "Blog Full Width",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    //    {
    //       "path": "/Blogsinglepage",
    //       "menu_title": "Blog Post Single",
    //       "icon": "arrow_right_alt",
    //       "child_routes": null
    //    },
    // ]
  },

  // {
  //    "menu_title": "Pages",
  //    "type": "subMenu",
  //    "path": "",
  //    "icon": "home",
  //    "child_routes": [
  //       {
  //          "path": "/Aboutus",
  //          "menu_title": "About Us",
  //          "icon": "arrow_right_alt",
  //          "child_routes": null
  //       },

  //       // {
  //       //    "path": "/ComingSoon",
  //       //    "menu_title": "Coming Soon",
  //       //    "icon": "arrow_right_alt",
  //       //    "child_routes": null
  //       // },
  //       //   {
  //       //    "path": "/Maintenance",
  //       //    "menu_title": "Maintenance",
  //       //    "icon": "arrow_right_alt",
  //       //    "child_routes": null
  //       // },
  //       // {
  //       //    "path": "/404",
  //       //    "menu_title": "Page Not Found",
  //       //    "icon": "arrow_right_alt",
  //       //    "child_routes": null
  //       // }
  //    ]
  // },
  {
    path: "/Aboutus",
    menu_title: "About Us",
    icon: "arrow_right_alt",
    child_routes: null,
  },
  // {
  //   path: "/Contactus",
  //   menu_title: "Contact Us",
  //   icon: "arrow_right_alt",
  //   child_routes: null,
  // },
  // {
  //    "menu_title": "Admin Panel",
  //    "path": "/admin-panel/Reports",
  //    "icon": "perm_identity",
  //    "child_routes": null
  // }
];
