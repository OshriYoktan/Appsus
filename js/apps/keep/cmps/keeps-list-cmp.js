

import keepService from '../services/keep-service.js';
import {eventBus} from '../../../services/event-bus-service.js';
import keep from './keep-cmp.js';

export default {
    template: `
        <section class="keeps-list">
            <keep class="keep clickable"  v-for="keep in keepsToShow" :keepData="keep"></keep> 
            <!-- Dynamic Componenet -->
        </section>
    `,

    data() {
        return {
            allKeeps: [],
            keepsToShow: [],
        };
    },

    created() {
        this.getKeeps();
        eventBus.$on('newKeepMade', this.getKeeps);
        eventBus.$on('keepDeleted', this.getKeeps);
        eventBus.$on('sortByChanged',this.updtFilter);
   
    },
    
    methods: {
        getKeeps() {
            keepService.getKeeps().then(res => {
                this.allKeeps = res;
                this.keepsToShow = res;
            });
        },
        updtFilter(updtdFilter) {
            this.doFilter(updtdFilter.filterBy);
            this.doSort(updtdFilter.sortBy);
        },
        doSort(sortBy) {
            let cmprFn;
            if (sortBy === 'name') cmprFn = (firstEl, secEl) => firstEl.title.localeCompare(secEl.title);
            if (sortBy === 'date') cmprFn = (firstEl, secEl) => (firstEl.id < secEl.id) ? 1 : -1;
            this.keepsToShow.sort(cmprFn);
        },
        doFilter(filterBy) {
            let filterType = 'all';
            filterType = filterBy;
            if (filterType === 'all') this.keepsToShow = this.allKeeps;
            else this.keepsToShow = this.allKeeps.filter((keep) => keep.type === filterType);
        },
        doLabelFilter(labels) {
            this.keepsToShow = this.allKeeps.filter(keep => {
                let isToBeShown = false;
                labels.forEach(label => {
                    if (keep.labels.includes(label)) isToBeShown = true;
                });
                return isToBeShown;
            });
        },
    },

    components: {
        keep,
    },
}