import EmailService from '../services/EmailService.js';
// import Moment from '../../../node_modules/moment/moment.js';

export default {
    template: `
        <section class="emailList">
        
            <ul class="email emailListHeader">
                <li class="favorite"></li>
                <li @click="fromClicked">From</li>
                <li @click="subjectClicked">Subject</li>
                <li @click="dateClicked">Date</li>
            </ul>
            <ul @click="mailClicked(email.id)" class="email" :class="{'readed' : email.read}" v-for="(email, idx) in emails">
                <li @click.stop="mailMarked(email.id)" class="favorite" :class="{'marked' : email.marked}"><i class="fa fa-star" aria-hidden="true"></i></li>
                <li>{{email.from}}</li>
                <li>{{email.subject}}</li>
                <li>
                {{email.dateToShow}} 
                <div class="removeEmail" @click.stop="removeEmail(email.id)"><i class="fa fa-times" aria-hidden="true"></i></div>
                </li>
            </ul>
        

        </section>
    `,
    data() {
        return {

        }   
    },
    methods: {
        dateClicked() {
            this.$emit('dateClicked');
        },
        fromClicked() {
            this.$emit('fromClicked');            
        },
        subjectClicked(){
            this.$emit('subjectClicked');
        },
        mailClicked(id){
            this.$emit('mailClicked',id);
        },
        mailMarked(id){
            EmailService.changeMarked(id);
        },
        removeEmail(id){
            EmailService.deleteMail(id);
        },
    },
    created() {
        // this.sortByDate()
    },
    computed :{
        
    },
    props: {
        emails: Array,
        sortedBySender: Boolean,
        sortedByDate: Boolean
    }
}