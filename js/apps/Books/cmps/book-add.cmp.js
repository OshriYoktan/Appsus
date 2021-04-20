import { bookService } from '../services/book-service.js';

export default {
    template: `
        <section >
        <input type="text" @change="searchBook" v-model="term"  class="book-add">
        <ul class="book-add-list">
            <li v-for="book in books">{{book.volumeInfo.title}} <button @click="addBook(book)">+</button></li>
        </ul>
        </section>
    `,
    data() {
        return {
            term: '',
            books: [],
        };
    },

    methods: {
        searchBook() {
            const newBook = bookService
                .ask(
                    `https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.term}`
                )
                .then((res) => {
                    this.books = res.items;
                });
        },
        addBook(book) {
            bookService.addGoogleBook(book).then((book) => {
                this.$emit('addbook', book)
                this.books = [];
            });
        },
    },
    computed: {},
    components: {},
    created() {},
};
