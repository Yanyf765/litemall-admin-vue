<template>
<div class="app-container">

  <el-card class="box-card">
    <h3>商品介绍</h3>
    <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
      <el-form-item label="商品编号" prop="goodsSn">
        <el-input v-model="goods.goodsSn"/>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="goods.name"/>
      </el-form-item>
      <el-form-item label="专柜价格" prop="counterPrice">
        <el-input v-model="goods.counterPrice" placeholder="0.00">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="当前价格" prop="retailPrice">
        <el-input v-model="goods.retailPrice" placeholder="0.00">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="是否新品" prop="isNew">
        <el-radio-group v-model="goods.isNew">
          <el-radio :label="true">新品</el-radio>
          <el-radio :label="false">非新品</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否热卖" prop="isHot">
        <el-radio-group v-model="goods.isHot">
          <el-radio :label="false">普通</el-radio>
          <el-radio :label="true">热卖</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否在售" prop="isOnSale">
        <el-radio-group v-model="goods.isOnSale">
          <el-radio :label="true">在售</el-radio>
          <el-radio :label="false">未售</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="商品图片">
        <el-upload
          :headers="headers"
          :action="uploadPath"
          :show-file-list="false"
          :on-success="uploadPicUrl"
          class="avatar-uploader"
          accept=".jpg,.jpeg,.png,.gif">
          <img v-if="goods.picUrl" :src="goods.picUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>

      <el-form-item label="宣传画廊">

      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import {detailGoods} from '@/api/goods'
import {createStorage, uploadPath} from '@/api/storage'

export default {
  name: 'edit',
  data () {
    return {
      uploadPath,
      newKeywordVisible: false,
      newKeyword: '',
      keywords: [],
      galleryFileList: [],
      categoryList: [],
      brandList: [],
      categoryIds: [],
      goods: { gallery: [] },
      specVisiable: false,
      specForm: { specification: '', value: '', picUrl: '' },
      specifications: [{ specification: '规格', value: '标准', picUrl: '' }],
      productVisiable: false,
      productForm: {
        id: 0,
        specifications: [],
        price: 0.0,
        number: 0,
        url: ''
      },
      products: [
        { id: 0, specifications: ['标准'], price: 0.0, number: 0, url: '' }
      ],
      attributeVisiable: false,
      attributeForm: { attribute: '', value: '' },
      attributes: [],
      rules: {
        goodsSn: [
          { required: true, message: '商品编号不能为空', trigger: 'blur' }
        ],
        name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }]
      },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        plugins: [
          'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
        ],
        toolbar: [
          'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
          'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
        ],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createStorage(formData)
            .then(res => {
              success(res.data.data.url)
            })
            .catch(() => {
              failure('上传失败，请重新上传')
            })
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      if (this.$route.query.id == null) {
        return
      }
      const goodsId = this.$route.query.id
      detailGoods(goodsId).then(response => {
        this.goods = response.data.data.goods
        this.specfications = response.data.data.specifications
        this.products = response.data.data.products
        this.attributes = response.data.data.attributes
      })
    },
    uploadPicUrl () {}
  }
}
</script>

<style>
  .el-card {
    margin-bottom: 10px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 145px;
    height: 145px;
    display: block;
  }
</style>
