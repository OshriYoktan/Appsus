import keepService from '../services/keep-service.js';
import userMessage from '../global-cmps/user-msg.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    props: ['keepData'],
    template: `
        <section @click="hasBeenClicked = !hasBeenClicked" :style="{'background-color': keepData.color}">
            {{keepData.title}}
            
            <img v-if="keepData.type === 'image'" class="img" :src="keepData.extra">
            

            <div v-if="hasBeenClicked" class="CRUDIcons">
                <router-link :to="getEditCmpUrl">
                    <i class="CRUDIcon far fa-edit">+</i>
                </router-link>
                <i class="CRUDIcon far fa-trash-alt" @click="deleteKeep()">X</i>
               
            </div>
        </section>
    `,

    data() {
        return {
            keepService,
            hasBeenClicked: false,
        };
    },

    methods: {
        deleteKeep() {
            keepService.deleteKeep(this.keepData.id);
            eventBus.$emit('show-msg', {
                txt: 'Your Keep Has Been Successfully Deleted',
            });
        },
        sendEmail() {
            eventBus.$emit('keep-to-email', keepData);
        }, //not working properly
    },

    computed: {
        getEditCmpUrl() {
            return `edit/${this.keepData.id}`;
        },
        getAudioURL() {
            URL.createObjectURL('../audio/New Song Idea');
        }, //not working i decide to delete it
    },

    components: {
        userMessage,
    },
};
