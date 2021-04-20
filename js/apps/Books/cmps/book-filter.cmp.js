export default {
    template: `
        <section class="book-filter">
       
        <form @submit.prevent="setFilter">
            <input type="text"  v-model="filterBy.byTitle" placeholder="Search By Name"/>
            <input type="number"  v-model.number="filterBy.byPrice" placeholder="Search By Price" />
            <button class="filter-btn">Check</button>
            </form>
        </section>
    `,
    data() {
        return {
            filterBy: { byTitle: '', byPrice: '' },
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy);
        },
    },
    computed: {},
    components: {},
    created() {},
};
