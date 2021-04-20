import { bookService } from '../services/book-service.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';
import bookAdd from '../cmps/book-add.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js';
 

export default {
    template: `
        <section class="book-app">

            <book-filter @filtered="setFilter"/>
            <book-add @addbook="addBook"/> 
            <book-details v-if="selectedBook" :book="selectedBook" @close="selectedBook = null" /> 
            <book-list  @selected="selectBook" @removeBook="removeBook" :books="booksToShow"/> 
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
            selectedBook: null,
        };
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
                
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        removeBook(id) {
            console.log('id:', id)
            bookService.remove(id)
            .then(this.loadBooks)
        },
        selectBook(book) {
            this.selectedBook = book;
            console.log(book);
        },
        addBook(newBook){
            this.books.push(newBook);
            bookService.save(newBook)
                
                .then((book) => {
                    const msg = {
                        txt: 'Book saved succesfully',
                        type: 'success',
                    };
                    eventBus.$emit('show-msg', msg);
                }).catch(err=>{
                    console.log(err);
                    const msg = {
                        txt: err.message,
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg)
                })
            


        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.byTitle.toLowerCase();
            const searchByPrice = this.filterBy.byPrice;
            if (!searchByPrice && !searchStr) return this.books;
            const booksToDisplay = this.books.filter((book) => {
                if (
                    book.title.toLowerCase().includes(searchStr) &&
                    searchByPrice === ''
                ) {
                    console.log('hello');
                    return this.books;
                }

                return (
                    book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount <= searchByPrice
                );
            });
            this.filterBy = null;
            return booksToDisplay;
        },
    },
    components: {
        bookFilter,
        bookList,
        bookDetails,
        bookAdd
    },
    created() {
        this.loadBooks();
    },
};
