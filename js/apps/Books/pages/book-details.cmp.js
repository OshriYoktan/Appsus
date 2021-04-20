import longText from '../cmps/long-text.cmp.js';
import bookReview from '../cmps/book-review.cmp.js';
import { bookService } from '../services/book-service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    template: ` 
   
    <section v-if="book" class="modal-details">
        <div class="book-details">
        <table><thead><th>Book Image</th><th>Author</th><th>price</th><th>Page Count</th><th>Publish Date</th><th>For Sale</th></thead>
        <tbody><tr>
            <td><img :src="book.thumbnail" class="table-img"></td>
            <td>{{book.authors[0]}}</td>
        <td :class="toggleColor" > {{book.listPrice.amount}}{{book.listPrice.currencyCode}}</td>
        <td>{{pageCount}}</td>
        <td>{{publishDate}}</td>
        <td v-if="isOnSale">For Sale: You Can Buy It!!!</td>
        </tr></tbody></table>
        <long-text  :description="book.description"/>
        <div class ="details-btn">
        <router-link :to="nextBookLink" class="back">Next Book</router-link>
        <router-link to="/book" class="back">Back To Book List</router-link>
</div>
        </div>
        <book-review :reviews="book.reviews" @review="addReview" @removeReview="removeReview"/>
        <!-- <router-link to="/book">Back</router-link> -->
      
    </section>    
    `,
    data() {
        return {
            currYear: new Date().getFullYear(),
            book: null,
            nextBookId: '',
        };
    },
    methods: {
        addReview(review) {
            this.book.reviews.push(review);

            bookService
                .save(this.book)
                .then((book) => {
                    this.book = book;
                })
                .then((book) => {
                    const msg = {
                        txt: 'Review saved succesfully',
                        type: 'success',
                    };
                    eventBus.$emit('show-msg', msg);
                })
                .catch((err) => {
                    console.log(err);
                    const msg = {
                        txt: err.message,
                        type: 'error',
                    };
                    eventBus.$emit('show-msg', msg);
                });
            this.$router.push('/book');
        },
        removeReview(id) {
            console.log('id:', id);

            console.log('book:', this.book);
            this.book.reviews = this.book.reviews.filter((review) => {
                console.log('review:', review);
                return review.id !== id;
            });
            bookService.save(this.book).then((book) => {
                this.book = book;
            });
        },
        loadBook() {
            const id = this.$route.params.bookId;
            bookService.getById(id).then((book) => {
                this.book = book;
                this.nextBookId = bookService.getNextBookId(this.book.id);
            });
        },
    },
    computed: {
        pageCount() {
            if (this.book.pageCount > 500) return 'Long';
            else if (this.book.pageCount > 200) return 'Decent';
            else return 'Short';
        },
        publishDate() {
            if (this.currYear - this.book.publishedDate > 10) {
                return ' Veteran Book';
            } else return 'New Book';
        },
        toggleColor() {
            return {
                red: this.book.listPrice.amount > 150,
                green: this.book.listPrice.amount < 100,
            };
        },
        isOnSale() {
            return this.book.listPrice.isOnSale;
        },
        nextBookLink() {
            const nextId = bookService.getNextBookId(this.book.id);
            console.log('nextId:', nextId);
            return '/book/' + nextId;
        },
    },
    components: {
        longText,
        bookReview,
    },
    created() {
        const id = this.$route.params.bookId;
        // console.log('id:', id);
        bookService.getById(id).then((book) => (this.book = book));
    },
    watch: {
        '$route.params.bookId'() {
            this.loadBook();
        },
    },
};
