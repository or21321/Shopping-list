import {createRouter, createWebHistory} from 'vue-router';
import AppComponent from '@/App.vue'
import ShoppingList from "@/pages/ShoppingList.vue";
import ShoppingItemEdit from "@/components/ShoppingItemEdit.vue";
import ShoppingPage from '@/pages/ItemPage.vue'

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
        },
        {
            path: '/:id',
            name: 'Item page',
            component: ShoppingPage
        }
    ],
});

export default router;
