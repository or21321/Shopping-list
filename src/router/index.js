import { createRouter, createWebHistory } from 'vue-router';
import AppComponent from '../App.vue'
import ShoppingList from "../pages/ShoppingList.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'App',
            component: AppComponent,
            children: [
                {
                    path: '',
                    name: 'Shopping-list',
                    component: ShoppingList,
                }
            ]
        },
    ],
});
// const router = createRouter({
//     history: createWebHistory(import.meta.env.BASE_URL),
//     routes: [
//         {
//             path: '/',
//             name: 'Home',
//             component: Home,
//         },
//         {
//             path: '/About',
//             name: 'About',
//             component: About,
//         },
//         {
//             path: '/toy/:label?',
//             name: 'ToyApp',
//             component: ToyApp,
//             children:[
//                 {
//                     path: '/toy/:label?/edit/:id?',
//                     name: 'ToyEdit',
//                     component: ToyEdit,
//                   },
//             ]
//         },
//
//     ],
// });

export default router;
