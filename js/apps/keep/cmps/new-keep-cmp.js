
import keepService from '../services/keep-service.js';
import {eventBus} from '../../../services/event-bus-service.js';
import {utilService} from '../../../services/util.service.js';

export default {
    props: ['type'],

    template: `
        <section class="new-keep">
            <form class="new-keep-creator above">
                <input type="text" placeholder="Title" required v-model="keepData.title">
                <input v-if="type === 'image' || type === 'audio' || type === 'video'" type="text" placeholder="File URL" required v-model="keepData.extra">
                <textarea v-if="type === 'text'" rows="4" cols="50" required v-model="keepData.extra"></textarea>
                <input type="submit" value="Submit" @click="addKeep">
                <button @click="cancel">Cancel</button>
            </form>


            <div class="screen new-keep-screen" @click="cancel"></div>
        </section>
    `,

    data() {
        return {
            keepData: {
                title: '',
                extra: '',
                color: '',
                id: currId++,
            },
        };
    },

    created() {
        this.setColor();
            // .$el.focus();
    },

    methods: {
        addKeep(ev) {
            this.keepData.type = this.type;
            keepService.addKeep({...this.keepData});
            eventBus.$emit('newKeepMade', {...this.keepData});
        },
        setColor() {
            this.keepData.color = utilService.getRandomColor();
        },
        cancel() {
            eventBus.$emit('cancel');
        },
    },
};