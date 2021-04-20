import EmailService from '../services/EmailService.js'

export default {
    template: `
        <section class="emailMenu">
            <div class="menuContainer">
                <ul>
                    <li href="#popup1" @click="routeToCompose"><i class="fa fa-plus-circle" aria-hidden="true"></i></li>
                    <li @click="inboxClicked"><span>Inbox</span></li>
                    <li @click="sentClicked"><span>Sent</span></li>
                </ul>
            </div>
        </section>
    `,
    data() {
        return {
            
        }
    },
    methods: {
        inboxClicked(){
            this.$emit('inboxClick')
        },
        sentClicked(){
            this.$emit('sentClick')
        },
        routeToCompose(){
            this.$router.push('/email/compose')
        },        
        sortByDate(){
            EmailService.sortByDate()
            .then(emails => {
                this.emails = emails;
            })
        },

    },
    created() {
        
    }
}