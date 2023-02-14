import { createRouter, createWebHistory } from 'vue-router';
import AppComponent from '../App.vue'
import ShoppingList from "../pages/ShoppingList.vue";
import ShoppingItemEdit from "@/components/ShoppingItemEdit.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
                {
                    path: '',
                    name: 'Shopping-list',
                    component: ShoppingList,
                    children: [
                        {
                            path: '/edit/:id?',
                            name: 'Shopping-item edit',
                            component: ShoppingItemEdit,
                        }
                    ]
                }
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
