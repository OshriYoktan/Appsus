

import { eventBus } from "../../../services/event-bus-service.js";

export default {
    template: `
        <section>
            Sort: <select v-model="sortBy" @change="updtParentCmp">
                <option value="name">Name</option>
                <option value="date">Date</option>
            </select>
            Filter: <select v-model="filterBy" @change="updtParentCmp">
                <option value="all">All</option>
                <option value="task">Tasks</option>
                <option value="image">Images</option>
                <option value="text">Texts</option>
            </select>
        </section>
    `,

    data() {
        return {
            sortBy: 'name',
            filterBy: 'all',
        };
    },

    methods: {
        updtParentCmp() {
            eventBus.$emit('sortByChanged', {filterBy: this.filterBy, sortBy: this.sortBy});
        },
    },
};