import { eventBus } from '../../../services/event-bus-service.js';

export default {
    template: `
        <section class="user-msg" v-if="msg" :class="msg.type">
            <i  @click="close" class="far fa-times-circle"></i>
            <p>{{msg.txt}}</p>
        </section>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('show-msg', (msg) => {
            console.log('UserMsg got new Msg!');
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000)
        })
    },
    methods: {
        close() {
            this.msg = null;
        }
    },
    components: {
        eventBus,
    }
}