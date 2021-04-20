

export default {
    template: `
        <section >

        <transition name="fade">   

        <div id="popup1" class="overlay">
            <div class="popup">
                <h2>{{headLine}}</h2>
                <a class="close" @click="closeCompose">&times;</a>

                <form class="content" @submit="submitClicked" v-if="isCompose" >
                        <input type="text" placeholder="To:" v-model="newMail.composeTo" >
                        <input type="text" placeholder="Subject" v-model="newMail.composeSubject" >
                        <textarea placeholder="Enter text" v-model="newMail.composeText"></textarea  >
                        <button @click="submitClicked">Submit</button>
                </form>

                <form class="content" @submit="submitClicked" v-else >
                <h1 class="">{{selectedMail.to}}</h1>
                <h3 class="">{{selectedMail.subject}}</h3>
                <h3 class="">{{selectedMail.text}}</h3>
                <h3 class="">{{selectedMail.dateToShow}}</h3>
            </form>

            </div>
        </div>

        </transition>
        </section>
    `,
    data() {
        return {
            isCompose: false,
            newMail: {
                composeTo: '',
                composeSubject: '',
                composeText: ''
            },
            mailToShow: {},
            headLine: 'Send A New Mail'
        }
    },
    props: {
        selectedMail: Object
    },
    methods: {
        closeCompose() {

            this.$router.push('/email')
        },
        submitClicked() {
            
            event.preventDefault()
            console.log(this.newMail);
            this.$emit('newMail', this.newMail)
            this.$router.push('/email')
        }


    },
    created() {
        this.isCompose = this.$route.path.match(/\/email\/+\d+/) === null;
        if (!this.isCompose) {
            this.headLine = this.selectedMail.from 
        }
        console.log('isCompose', this.isCompose);
    },

}