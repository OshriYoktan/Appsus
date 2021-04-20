import EmailService from '../services/EmailService.js'

export default {
    template: `
        <section class="emailToolBar">
        <form>
        <input class="mailSearch" type="text" placeholder="🔎 search" @keydown="checkIfSearch" v-model="searchedValue">
        <div id='cssmenu'>
        <ul>
           <li class='active has-sub'><a href='#'><span>Fliter</span></a>
              <ul>
                 <li class='has-sub'><a href='#' @click="clickedAll"><span>All</span></a></li>
                 <li class='has-sub'><a href='#' @click="clickedRead"><span>Read</span></a></li>
                 <li class='has-sub'><a href='#' @click="clickedUnread"><span>Unread</span></a></li>
                 <li class='has-sub'><a href='#' @click="clickedMarked"><span>Marked</span></a></li>
              </ul>
           </li>
           
        </ul>
        </div>
        </form>
        </section>
       

       
    `,
    data() {
        return {
            searchedValue: ''
        }   
    },
    methods: {
        checkIfSearch() {
            console.log('checkIfSearchFunc');
            if (event.keyCode === 13) {
            
                this.callSearch(this.searchedValue);
            }
        },
        callSearch(valueToSearch) {
            
            this.$emit('searchEvent', valueToSearch);
        },
        clickedRead(){
            this.$emit('clickedRead');
        },
        clickedUnread(){
            this.$emit('clickedUnread');
        },
        clickedAll(){
            this.$emit('clickedAll');
        },
        clickedMarked(){
            this.$emit('clickedMarked');
        }
    },
    created() {
        console.log('toolbar');
    },
    updated(){
        console.log(this.searchedValue)
    }
    
}