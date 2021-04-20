import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
    <section>
        
        <ul class="book-list-container">
            <li v-for="book in books" :key="book.id" class="book-list">
                <book-preview :book="book" @click.native="selectBook(book.id)"/>
            <button @click.stop="removeBook(book.id)" class="list-btn">x</button>
            </li>
            
        </ul>
    </section>
    `,
    // data() {
    //     return {};
    // },
    methods: {
        removeBook(bookId) {
            this.$emit('removeBook', bookId);
        },
        selectBook(id) {
            this.$router.push(`/book/${id}`);
        },
    },
    computed: {},
    components: {
        bookPreview,
    },
    created() {
        console.log(this.books);
    },
};
