export default {
    template: `
   <header class="app-header">
       <div class="logo">
           <img src="../../img/appsus3.svg"/>
       </div>
       <nav>
           <router-link active-class="active-link" to="/" exact>Home</router-link> |
           <router-link to="/book">Books</router-link> |
           <router-link to="/keep-app/main" >Keep</router-link> |
           <router-link to="/email" >Email</router-link> |
           <router-link to="/about">About</router-link>
       </nav>
    </header>
    `,
};
