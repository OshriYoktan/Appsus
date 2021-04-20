
import keepService from '../services/keep-service.js';

export default {
    props: ['keepData'],

    template: `
        <section class="labels">
            Labels:
            <div v-for="label in allLabels">
                    <input type="checkbox" :value="label" v-model="checkedLabels.includes(label)" @change="updateLabel">{{label}}
            </div>
        </section>
    `,

    data() {
        return {
            checkedLabels: [],
            allLabels: [],
        };
    },

    created() {
        this.getLabelsFromService();
        this.checkedLabels = this.keepData.labels;
    },

    methods: {
        updateLabel(ev) {
            if (ev.target.checked) this.checkedLabels.push(ev.target.value);
        },
        updateAtParentCmp() {
            this.$emit('labelsChanged', this.checkedLabels);
        },
        getLabelsFromService() {
            this.allLabels = keepService.getLabels();
        },
    },
};