

import labels from './labels-cmp.js';
import keepService from '../services/keep-service.js';

export default {
    name: 'keep-edit-cmp',
    template: `
        <section class="keep-edit" :style="{'background-color': color}">
            Title: <input type="text" v-model="title">
            
            <div v-if="type === 'image' || type === 'audio'">
                File URL: <input type="text" v-model="extra">
            </div>
            
            <div v-if="type === 'text'">
                Text: <textarea cols="50" rows="4" v-model="extra"></textarea>
            </div>

            Color: <input type="color" v-model="color">

            <labels v-if="currKeep" :keepData="currKeep" @labelsChanged="updateLabels"></labels>
            <!-- Dynamic component -->

            <router-link to="/keep-app/main">
                <button @click="save">Done</button>
            </router-link>
        </section>
    `,

    data() {
        return {
            currKeep: '',
            id: null,
            currKeep: null,
            type: null,
            title: null,
            extra: null,
            labels: null,
            color: null,
        };
    },

    created() {
        this.getCurrKeep();
    },
    
    methods: {
        setTitle(keep) {
            this.title = keep.title;
        },
        setType(keep) {
            this.type = keep.type;
        },
        setExtra(keep) {
            this.extra = keep.extra;
            },
        setColor(keep) {
            this.color = keep.color;
        },
        setLabels(keep) {
            this.labels = keep.labels;
        },
        save() {
            let updtdKeepData = {
                title: this.title,
                id: this.getId,
                type: this.type,
                extra: this.extra,
                labels: this.labels,
                color: this.color,
            };
            keepService.updateKeep(updtdKeepData);
        },
        getCurrKeep() {
            keepService.getKeeps().then(keeps => {
                return keeps;
            }).then( keeps => {
                return keeps.find(keep => {
                    return keep.id === +this.getId;
                });
            }).then(currKeep => {
                this.setTitle(currKeep);
                this.setType(currKeep);
                this.setExtra(currKeep);
                this.setColor(currKeep);
                this.setLabels(currKeep);
                this.currKeep = currKeep
            });
        },
        updateLabels(updtdLabels) {
            this.labels = updtdLabels;
            console.log(updtdLabels);
        },
    },

    computed: { 
        getId() {
            return this.id = +this.$route.params.id;
        },
    },

    components: {
        labels,
    },
};