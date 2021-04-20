
import { utilService } from '../services/util.service.js';

export default {
    props: ['reviews'],
    template: ` <section>
     <form @submit.prevent="addReview"  class="book-review">
<label >Enter Yor Name</label>
<input ref="nameInput" type="text" placeholder="Books Reader" v-model="review.bookReader"/>
<label >Review Rate</label>
<input type="range" min="0" max="5" step="1" v-model="review.rate"/>
<span v-text="review.rate"></span>
<input type="date" v-model="review.readAt" value="2021-02-22" placeholder="2021-02-22"> 
<textarea placeholder="Write What You Think" maxlength="50" v-model="review.comment"></textarea>
<button>Submit</button>
</form>
<div class="reviews-section">
<table class="review-list">
    <thead><th>Name</th>
    <th>Rate</th>
    <th>Read Date</th>
    <th>Comment</th>
    <th>Remove Review</th>
</thead>
    <tbody>
    <tr v-for="review in reviews">
        <td> {{review.bookReader}}</td>
    <td> {{review.rate}}</td><td> {{review.readAt}}</td> <td>{{review.comment}}</td>
<td><button @click="removeReview(review.id)">X</button></td>
</tr>
<!-- <tr><p>comment: {{review.comment}}</p></tr> -->
</tbody></table>
</div>
</section>      
    `,
    data() {
        return {
            review: {
                bookReader: '',
                rate: 5,
                readAt: null,
                comment: '',
                id: utilService.makeId(),
            },
        };
    },
    methods: {
        addReview() {
            this.$emit('review', this.review);
            this.review = {
                bookReader: '',
                rate: 5,
                readAt: null,
                comment: '',
                id: utilService.makeId(),
            };
        },
        removeReview(id) {
            this.$emit('removeReview', id);
        },
    },
    computed: {
        rate: function () {
            return this.value;
        },
    },
    mounted() {
        // console.log('mounted');
        this.$refs.nameInput.focus();
    },
};
