
import { myRouter } from './routes.js';
import userMsg from './cmps/user-msg.cmp.js'
import appHeader from './cmps/header.cmp.js';

const options = {
    el: '#app',
    router: myRouter,
    template: `<section> 
        <user-msg/>
        <app-header></app-header>
        <router-view/>
         </section>`,

    components: {
        appHeader,
        userMsg
    },
};

new Vue(options);
