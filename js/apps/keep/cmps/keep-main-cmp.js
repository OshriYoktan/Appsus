
import keepsList from './keeps-list-cmp.js';
import newKeep from './new-keep-cmp.js';
import addingBtns from './adding-btns-cmp.js';

export default {
    template: `
        <section class="keep-main">
            <keeps-list></keeps-list>
            <new-keep v-if="isCreatingNewKeep" :type="newKeepType"></new-keep>
            <adding-btns></adding-btns>
        </section>
    `,

    data() {
        return {
            newKeepType: null,
            isCreatingNewKeep: false,
        };
    },
    
    created() {
        eventBus.$on('addKeep', this.addKeep);
        eventBus.$on('newKeepMade', this.newKeepFinished);
        eventBus.$on('cancel', this.cancel);
    },

    methods: {
        addKeep(type) {
            this.isCreatingNewKeep = true;
            this.newKeepType = type;
        },
        newKeepFinished() {
            this.newKeepType = null;
            this.isCreatingNewKeep = false;
        },
        cancel() {
            this.newKeepType === null;
            this.isCreatingNewKeep = false;
        },
    },

    components: {
        keepsList,
        newKeep,
        addingBtns,
    },
};
