
export const PAGES_MENU = [
{
path: 'pages',
children: [
{
path: 'Administrar Datos',
data: {
menu: {
title: 'Administrar Datos',
icon: 'ion-home',
selected: false,
expanded: false,
order: 100,
}
},
children: [
{
path: 'Crear',
data: {
menu: {
title: 'Crear',
icon: 'ion-android-add-circle',
}
}
},
{
path: 'Editar',
data: {
menu: {
title: 'Editar',
icon: 'ion-edit',
}
}
},
{
path: 'Eliminar',
data: {
menu: {
title: 'Eliminar',
icon: 'ion-trash-b',
}
}
},
{
path: 'Consultar',
data: {
menu: {
title: 'Consultar',
icon: 'ion-eye',

}
}
}
]
},
{
path: 'charts',
data: {
menu: {
title: 'Analizar',
icon: 'ion-stats-bars',
selected: false,
expanded: false,
order: 250,
}
}
},
{
path: 'Manual de Usuario',
data: {
menu: {
title: 'Manual de Usuario',
icon: 'ion-ios-book',
selected: false,
expanded: false,
order: 200,
}
}
},
{
path: 'Acerca de',
data: {
menu: {
title: 'Acerca de',
icon: 'ion-information-circled',
selected: false,
expanded: false,
order: 300,
}
},
}
]
}
];

