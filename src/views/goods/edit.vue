<template>
<div class="app-container">

  <el-card class="box-card">
    <h3>商品介绍</h3>
    <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
      <el-form-item label="商品编号" prop="goodsSn">
        <el-input v-model="goods.goodsSn" style="font-size:14px;font-family:'Microsoft YaHei'"/>
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
        <el-upload
          :action="uploadPath"
          :headers="headers"
          :limit="5"
          :file-list="galleryFileList"
          :on-exceed="uploadOverrun"
          :on-success="handleGalleryUrl"
          :on-remove="handleRemove"
          multiple
          accept=".jpg,.jpeg,.png,.gif"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品单位">
        <el-input v-model="goods.unit" placeholder="件 / 个 / 盒"/>
      </el-form-item>

      <el-form-item label="关键字">
        <el-tag v-for="tag in keywords" :key="tag" closable type="primary" @close="handleClose">
          {{tag}}
        </el-tag>
        <el-input v-if="newKeywordVisible" ref="newKeywordInput" v-model="newKeyword" class="input-new-keyword" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
        <el-button v-else class="button-new-keyword" type="primary" @click="showInput">+ 增加</el-button>
      </el-form-item>

      <el-form-item label="所属分类">
        <el-cascader :options="categoryList" v-model="categoryIds" expand-trigger="hover" @change="handleCategoryChange"/>
      </el-form-item>

      <el-form-item label="所属品牌商">
        <el-select v-model="goods.brandList">
          <el-option v-for="item in brandList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品简介">
        <el-input v-model="goods.brief" />
      </el-form-item>

      <el-form-item label="商品详细介绍">
        <editor :init="editorInit" v-model="goods.detail" />
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="box-card">
    <h3>商品规格</h3>
    <el-button :plain="true" type="primary" @click="handleSpecificationShow">添加</el-button>

    <el-table :data="specifications">
      <el-table-column property="specification" label="规格名"/>
      <el-table-column property="value" label="规格值">
        <template slot-scope="scope">
          <el-tag type="primary">
            {{scope.row.value}}
          </el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column property="picUrl" label="规格图片">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag type="primary">-->
            <!--{{ scope.row.value }}-->
          <!--</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </el-card>
</div>
</template>

<script>
import {detailGoods, listCatAndBrand} from '@/api/goods'
import {createStorage, uploadPath} from '@/api/storage'
import {getToken} from '@/utils/auth'
import Editor from '@tinymce/tinymce-vue'
export default {
  name: 'edit',
  components: {Editor},
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
        images_upload_handler: function (blobInfo, success, failure) {
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
  computed: {
    headers () {
      return {
        'X-Litemall-Admin-Token': getToken()
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
        this.specifications = response.data.data.specifications
        this.products = response.data.data.products
        this.attributes = response.data.data.attributes
        this.categoryIds = response.data.data.categoryIds

        this.galleryFileList = []
        for (var i = 0; i < this.goods.gallery.length; i++) {
          this.galleryFileList.push({
            url: this.goods.gallery[i]
          })
        }
        const keywords = response.data.data.goods.keywords
        if (keywords !== null) {
          this.keywords = keywords.split(',')
        }
      })

      listCatAndBrand().then(response => {
        this.categoryList = response.data.data.categoryList
        this.brandList = response.data.data.brandList
      })
    },
    uploadPicUrl () {},
    handleRemove () {},
    uploadOverrun () {},
    handleGalleryUrl () {},
    handleClose () {},
    showInput () {},
    handleCategoryChange () {},
    handleSpecificationShow () {}
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
