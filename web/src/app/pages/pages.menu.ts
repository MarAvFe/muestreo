export const PAGES_MENU = [
    {
        path: 'pages',
        children: [
            {
                path: 'profile',
                data: {
                    menu: {
                        title: 'general.menu.profile',
                        icon: 'ion-android-person',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'mySamplings',
                data: {
                    menu: {
                        title: 'general.menu.mySamplings',
                        icon: 'ion-ios-list-outline',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'admin',
                data: {
                    menu: {
                        title: 'general.menu.adminData',
                        icon: 'ion-android-apps',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                // children: [
                //     {
                //         path: 'edit',
                //         data: {
                //             menu: {
                //                 title: 'general.menu.edit',
                //                 icon: 'ion-android-create'
                //             }
                //         }
                //     },
                //
                //     {
                //         path: 'consult',
                //         data: {
                //             menu: {
                //                 title: 'general.menu.consult',
                //                 icon: 'ion-ios-eye'
                //             }
                //         }
                //     },
                // ]
            },
            {
                path: 'analyze',
                data: {
                    menu: {
                        title: 'general.menu.analyze',
                        icon: 'ion-ios-pie',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: '',
                data: {
                    menu: {
                        title: 'general.menu.userManual',
                        url: 'https://github.com/MarAvFe/muestreo/tree/master/documentos/usuario',
                        icon: 'ion-ios-book',
                        order: 800,
                        target: '_blank'
                    }
                }
            },
            {
                path: 'about',
                data: {
                    menu: {
                        title: 'general.menu.about',
                        icon: 'ion-information-circled',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
        ]
    }
];
