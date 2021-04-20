

import myFilter from '../cmps/filter-cmp.js';


export default {
    template: `
        <section class="keep-app">
      
            <my-filter></my-filter>

            <router-view></router-view>
        </section>
    `,

    components: {
        myFilter,
        
    },
};