import EmailService from '../services/EmailService.js';
import MailsList from '../cmps/MailsList.js';
import MailMenu from '../cmps/MailMenu.js';
import MailToolbar from '../cmps/MailToolBar.js';
import MailCompose from './MailCompose.js';
// import utilService from '../util.service.js';

export default {
    template: `
        <section class="emailContainer">

            <mail-menu   @sentClick="filterBySent" @inboxClick="sortByDate"></mail-menu>
            <div class="emailRightSection">
                <mail-toolbar  
                @clickedRead="filterRead"
                @clickedUnread="filterUnread"
                @clickedMarked="filterMarked"
                @clickedAll="sortByDate"
                @searchEvent="startSearching">
                </mail-toolbar>
                
                <mails-list 
                @dateClicked="sortByDateEndRevrse" 
                @mailClicked="readMail" 
                @fromClicked="sortBySender" 
                @subjectClicked="SortBySubject"
                :emails="emails" >
                </mails-list>
            </div>

            
            <mail-compose v-if="showMailCompose"  @newMail="sendEmail" :selectedMail="selectedMail"></mail-compose>
        </section>
    `,
    data() {
        return {
            emails: [],
            sortedBySender: false,
            sortedByDate: true,
            sortedBySubject: false,
            showMailCompose: false,
            selectedMail: null,
        };
    },
    methods: {
        sortByDate() {
            console.log('DONE');
            EmailService.sortByDate().then((emails) => {
                this.emails = emails;
            });
        },
        sortByDateEndRevrse() {
            this.sortedByDate = !this.sortedByDate;
            if (this.sortedByDate) {
                EmailService.sortByDate(this.emails).then((emails) => {
                    this.emails = emails;
                });
            } else {
                EmailService.sortByLateDate(this.emails).then((emails) => {
                    this.emails = emails;
                });
            }
        },
        sortBySender() {
            this.sortedBySender = !this.sortedBySender;
            if (this.sortedBySender) {
                EmailService.sortBySender(this.emails).then((emails) => {
                    this.emails = emails;
                });
            } else {
                this.sortByDateEndRevrse(this.emails);
            }
        },

        SortBySubject() {
            this.sortedBySubject = !this.sortedBySubject;
            if (this.sortedBySubject) {
                EmailService.sortBySubject(this.emails).then(
                    (emails) => (this.emails = emails)
                );
            } else {
                EmailService.reverseSortBySubject(this.emails).then(
                    (emails) => (this.emails = emails)
                );
            }
        },
        readMail(id) {
            // debugger;
            EmailService.showMail(id);
            EmailService.getMail(id).then(
                (email) => (this.selectedMail = email)
            );
            this.showMailCompose = true;
            this.$router.push('/email/' + id);
        },
        filterBySent() {
            EmailService.getSentEmails().then((emails) => {
                this.emails = emails;
                console.log('emails: ', emails);
            });
        },
        startSearching(valueToSearch) {
            EmailService.search(valueToSearch)
                .then((refinedEmails) => (this.emails = refinedEmails))
                .catch((err) => console.log('SERVICE ERROR: ', err));
        },
        filterRead() {
            EmailService.getReadEmails().then((emails) => {
                this.emails = emails;
            });
        },
        filterUnread() {
            EmailService.getUnreadEmails().then((emails) => {
                this.emails = emails;
            });
        },
        filterMarked() {
            EmailService.getMarkedEmails().then((emails) => {
                this.emails = emails;
            });
        },
        sendEmail(newMail) {
            EmailService.emptyMail()
                .then((emptyMailObj) => {
                    emptyMailObj.to = newMail.composeTo;
                    emptyMailObj.subject = newMail.composeSubject;
                    emptyMailObj.text = newMail.composeText;
                    EmailService.addMail(emptyMailObj)
                        .then(console.log('Success Indeed'))
                        .catch(console.log('What a Failure'));
                }).then((res)=>{
                    EmailService.getEmails().then(mails=>this.emails=mails);
                })
                .catch(() => console.log('Service failed to Get New Mail Obj'));
        },
        getEmailsFromService() {
            EmailService.getEmails().then(
                (serviceEmails) => (this.emails = serviceEmails)  
            );
        },
    },
    watch: {
        $route(to, from) {
            var id = this.$route.params.id;
            var isCompose = this.$route.path === '/email/compose';
            var id = this.$route.params.id;
            if (id || isCompose) {
                this.showMailCompose = true;
            } else this.showMailCompose = false;
        },
    },

    created() {
        this.getEmailsFromService();
    },
    components: {
        MailsList,
        MailMenu,
        MailToolbar,
        MailCompose,
    },
};
