import pagination from './pagination.js';
Vue.component('pagination',pagination);

new Vue({
el:'#app',
data:{
    products:{},
    pagination:{},
    tempProduct:{
        imageUrl: []
    },
    api: {
    uuid:'35e5ec2f-4b81-4496-9634-fef29022b381',
    apiPath:'https://course-ec-api.hexschool.io/api/'
},
    token:'Z2V7AZOtKD42nl1p60maemg7nVFZHrSTaIfdRkqCZOKuKWtPABfcu2Z5pgja',
    isNew:''
},
methods:{
    getProducts(num=1){
        console.log(num);
        const url = `${this.api.apiPath}${this.api.uuid}/admin/ec/products?page${num}=`;
        axios.get(url)
            .then((res)=>{
                console.log(res);
            this.products = res.data.data;
            this.pagination = res.data.meta.pagination;
            });
    },
    openModal(isNew, item) {
        switch (isNew) {
          case 'new':
            this.tempProduct = {};
            $('#productModal').modal('show');
            break;
          case 'edit':
            this.tempProduct = Object.assign({}, item);
            $('#productModal').modal('show');
            break;
          case 'delete':
            $('#delProductModal').modal('show');
            this.tempProduct = Object.assign({}, item);
            break;
          default:
            break;
        }
},
},
created(){
    // document.cookie = `weekfourToken=${token}; expires=${new Date(expired * 1000)}; path=/`;
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)weekfourToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    this.getProducts();
}
})
