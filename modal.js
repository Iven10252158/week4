export default {
    template:`<div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="exampleModalLabel" class="modal-title">
          <span>新增產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="imageUrl">輸入圖片網址</label>
              <input id="imageUrl" v-model="tempProduct.imageUrl[0]" type="text" class="form-control"
                placeholder="請輸入圖片連結">
            </div>
      <div class = "form-group">
        <label for = "customFile">或上傳圖片
        </label>
        <input id="customFile" ref="file" type="file" class="form-control" @change="uploadFile">        
      </div>
            <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt>
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">商品名稱</label>
              <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                  placeholder="請輸入分類" >
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control"
                  placeholder="請輸入單位">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
                  placeholder="請輸入原價">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input id="price" v-model="tempProduct.price" type="number" class="form-control"
                  placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                placeholder="請輸入產品描述" >
              </textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea id="description" v-model="tempProduct.content" type="text" class="form-control"
                placeholder="請輸入說明內容" >
              </textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input id="is_enabled" v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                  :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateProduct">
          確認
        </button>
      </div>
    </div>
    </div>
    </div>`,
    
  data(){
    return{
     
    }
  },
  props:['products','tempProduct','api'],
  methods:{
    updateProduct(){  
      if(this.tempProduct.id){
        this.products.forEach((item,i)=>{
          if(item.id === this.tempProduct.id){
            const patchApi =  `${this.api.apiPath}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
              axios.patch(patchApi,this.tempProduct) 
              .then((res)=>{
                console.log(res);
                // this.tempProduct = res.data.data;
                this.$emit('update');
              })
          }
        })
    }else{
      const id = new Date().getTime();
      const postApi = `${this.api.apiPath}${this.api.uuid}/admin/ec/product`;
      axios.post(postApi,this.tempProduct)
        .then((res)=>{
          console.log(res);
          this.$emit('update');
          })
      }
    },
    uploadFile(){
      // const vm = this;
      console.log(this); //在 uploadFile 方法中，我們可以先透過 console.log(this) 查看上傳的檔案有哪些資料格式
       const uploadedFile = this.$refs.file.files[0]; //仔細尋找後，可以發現我們想要的圖檔就放在 $refs → file → files[0] 這個地方，
       console.log(uploadedFile);
      const formData=new FormData();
      formData.append('file',uploadedFile);
     //POST api/{uuid}/admin/storage
     const url = `${this.api.apiPath}${this.api.uuid}/admin/storage`;
      axios.post(url,formData,{
        headers:{
          'Content-Type':'multipart/form-data',
        },
      }).then((res)=>{
        //  console.log(res);
        if (res.data.success) {
          this.$set(this.tempProduct, "imageUrl", res.data.data.imageUrl[0]); // 雙向綁定
        }
        //  this.tempProduct.imageUrl.push(res.data.data.path);
      })
    }
  }
}
