import { createApp } from 'vue';
// Components
import App from './App.vue';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

/**
 * Vuetifyのインスタンスを作成
 */
const vuetify = createVuetify({
    components,
    directives,
});

/**
 * Vueアプリケーションを作成
 */
createApp(App)
    .use(vuetify)
    .mount('#app');
