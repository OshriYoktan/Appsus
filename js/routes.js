import homePage from './pages/home-page.cmp.js';
import bookApp from './apps/Books/pages/book-app.cmp.js';
import bookDetails from './apps/Books/pages/book-details.cmp.js';
import keepApp from './apps/keep/pages/keep-app.js';
import keepEditCmp from './apps/keep/cmps/keep-edit-cmp.js';
import keepMain from './apps/keep/cmps/keep-main-cmp.js';
import emailApp from './apps/email/pages/MailPage.js';
import about from './pages/about.cmp.js';

const aboutTeam = {
    template: `
        <section>
            <h2 class="about-title">Our Team is Amazing!</h2>
            <div class="team">
            <div class ="team-avi">
            <img src="../../img/avi.jpg"/>
            <p class="about-description">  Avi Lugassi , 31 From Merom-Golan...
               Talia's Husband , Father Of Geva
               , For More Projects...
               <a href="mailto:avilugassi23@gmail.com">Send Email</a>
               </p>
               
            </div>
            <div class="team-oshri">
            <img src="../../img/oshri.png"/>
            <p class="about-description"> 
            I’m oshri yoktan,23 years old. I live in ramle and Im studing at coding academy a FullStack Devaloper Course , For More Projects... 
               <a href="mailto:Oshriyok1@gmail.com">Send Email</a>
            </p>
           
            </div>
            </div>
        </section>
    `,
};
const aboutServices = {
    template: `
        <section>
            <h2 class="about-title">Our Services are Awesome</h2>
            <p class="about-description">Services are Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, porro odit minima vitae aspernatur, dolore explicabo eius ut ducimus numquam laborum repudiandae assumenda suscipit non perferendis obcaecati inventore vel est!</p>
            <!-- <h4>We are everywhere</h4>
            <input type="text" ref="loc" placeholder="Your location" /> -->
        </section>
    `,
    mounted() {
        // const el = this.$refs.loc;
        // el.focus();
        // el.scrollIntoView();
    },
};

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/book',
        component: bookApp,
    },
    {
        path: '/about',
        component: about,
        children: [
            {
                path: 'team',
                component: aboutTeam,
            },
            {
                path: 'services',
                component: aboutServices,
            },
        ],
    },
    {
        path: '/book/:bookId',
        component: bookDetails,
    },
    {
        path: '/keep-app',
        component: keepApp,
        children: [
            {
                path: 'edit/:id',
                component: keepEditCmp,
            },
            {
                path: 'main',
                component: keepMain,
            },
        ],
    },

    {
        path: '/email',
        component: emailApp,
    },
    {
        path: '/email/compose',
        component: emailApp,
    },
    {
        path: '/email/:id',
        component: emailApp,
    },
];

export const myRouter = new VueRouter({ routes });
