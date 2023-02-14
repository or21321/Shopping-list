import { createApp } from 'vue'
import './styles/styles.scss'
import App from './App.vue'
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';


const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus);

app.directive('click-outside', {
    mounted(el, binding) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
});

app.mount('#app')
