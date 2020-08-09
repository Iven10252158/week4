export default {
    template:`<nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
            </a>
        </li>
        <li class="page-item" v-for = 'i in pages.total_pages' :key='i'>
        <a class="page-link" href="#" @click.prevent='clickPage(i)'> {{i}} </a></li>
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
            </a>
        </li>
        </ul>
    </nav>`,
    props:['pages'],
    methods:{
        clickPage(num){
            this.$emit('updatepage',num)
        },
    }
}