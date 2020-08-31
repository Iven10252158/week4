import pagination from './pagination.js';
import modal from './modal.js';
import deleteProduct from './deleteProduct.js';
Vue.component('pagination',pagination);
Vue.component('modal',modal);
Vue.component('deleteProduct',deleteProduct);
Vue.component('loading',VueLoading);

new Vue({
el:'#app',
data:{
    products:[],
    pagination:{},
    tempProduct:{
      imageUrl: [],
    },
    isLoading:false,
    api: {
    uuid:'35e5ec2f-4b81-4496-9634-fef29022b381',
    apiPath:'https://course-ec-api.hexschool.io/api/'
},
    token:'weZhtAxBDMk4MlAVb3yBYdGH7AVXjQrAXmn4HktxoKKd2BfUVLQE2ueGl8vK',
    isNew:''
},
methods:{
    getProducts(num=1){
        // console.log(num);
        this.isLoading=true;
        const url = `${this.api.apiPath}${this.api.uuid}/admin/ec/products?page=${num}`;
        axios.get(url)
            .then((res)=>{
            this.isLoading=false;
            console.log(res);
            this.products = res.data.data; //把遠端的資料套到products上
            this.pagination = res.data.meta.pagination;
            }).catch((error)=>{
              this.isLoading=false;
            });
    },
    openModal(isNew, item) {
        switch (isNew) {
          case 'new':
              this.tempProduct={
                imageUrl: [],
              };
             $(this.$refs.productModal).modal('show');
            break;
          case 'edit':
            const url = `${this.api.apiPath}${this.api.uuid}/admin/ec/product/${item.id}`;
            axios.get(url)
            .then((res)=>{
              this.tempProduct = res.data.data;
              $(this.$refs.productModal).modal('show');
            })
            break;
          case 'delete':
            $(this.$refs.deleteProduct).modal('show');
             this.tempProduct = Object.assign({}, item);
            break;
          default:
            break;
        }
},

},
mounted(){
    // document.cookie = `weekfourToken=${token}; expires=${new Date(expired * 1000)}; path=/`;
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)weekfourToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    this.getProducts();
}
})
