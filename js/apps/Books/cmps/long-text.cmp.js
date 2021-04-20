export default {
    props: ['description'],
    template: `
    <section>
        <p @click="toggle=!toggle">Description: {{showText}}</p>
    </section>    
    `,
    data() {
        return {
            toggle: false,
        };
    },
    methods: {},
    computed: {
        showText() {
            return this.toggle
                ? this.description
                : this.description.substring(0, 100);
        },
    },
};
