<template>
  <div class="wrapper detail">
    <div class="index-bar">
      <a href="javascript:;" class="ui-btn index-bar-left-btn" @click="back">首页</a>
      <span>单据编辑</span>
    </div>
    <!--<div class="top-bar-left top-bar">-->
      <!--<a href="javascript:;" class="top-bar-btn-back" @click="back"></a>-->
    <!--</div>-->
    <div class="head">
      <h1 class="title">{{curdanju.title}}</h1>
    </div>
    <div class="form-wrapper">
      <p>
        <span>
        姓名
        <input class="ui-input" type="text" placeholder="请输入姓名" id="name">
      </span>
        <span>工号
        <input class="ui-input" type="text" placeholder="请输入工号" id="number">
      </span>
      </p>
      <p>单据说明</p>
      <textarea class="ui-texta" placeholder="请输入单据说明" id="cont"></textarea>
      <p>
        <a class="ui-btn" href="javascript:;" @click="showpop">提交</a>
      </p>
    </div>
    <div class="pop-mask" v-if="popShow">
      <div class="conform-pop">
        <p>是否确认提交单据？</p>
        <p class="ui-btn-wrap">
          <a class="ui-btn" href="javascript:;" @click="submit(curdanju.id)">确认</a>
          <a class="ui-btn" href="javascript:;" @click="cancel">取消</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import('../js/flexible')

export default {
  mapGetters: ['curdanju', 'loaded', 'getTime', 'result'],
  mapActions: ['getdanjuById', 'postDanju'],

  created () {
    console.log(this.$route.params.id)
    this.getdanjuById({
      id: this.$route.params.id
    })
  },
  activated () {
    this.getdanjuById({
      id: this.$route.params.id
    })
  },

  data () {
    return {
      popShow: false
    }
  },

  methods: {
    back () {
      // this.$redirect('/')
      this.$redirect('/')
    },
    // 输入内容需要进行规则校验
    checkCont (data) {
      const regDoubleBreak = /((\r\n)|(\r)|(\n)){2}/g
      const regBreak = /(\r\n)|(\r)|(\n)/g
      const regLink = /((http(s)?|cmp):\/\/(\S)+)/g
      const regDoubleSpace = /\s{2}/g
      if (data) {
        data = data.replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(regLink, '<a href="$1">$1</a>')
          .replace(regDoubleBreak, '</p><p>')
          .replace(regBreak, '<br>')
          .replace(regDoubleSpace, ' &nbsp')
          .replace(/习近平/g, '***')
          .replace(/共产党/g, '***')
          .replace(/地域狗/g, '***')
          .replace(/MMP/g, '***')
      } else {
        data = ''
      }
      return data
    },
    showpop () {
      const name = this.checkCont(document.getElementById('name').value)
      const number = this.checkCont(document.getElementById('number').value)
      const cont = this.checkCont(document.getElementById('cont').value)
      if (!name) {
        alert('请输入姓名')
        return
      }
      if (!number) {
        alert('请输入工号')
        return
      }
      if (!cont) {
        alert('请输入单据说明')
        return
      }
      this.popShow = true
    },
    submit (id) {
      const self = this
      self.$nextTick(function () {
        self.postDanju()
      })
      document.getElementById('name').value = ''
      document.getElementById('number').value = ''
      document.getElementById('cont').value = ''
      this.popShow = false
      this.$redirect(`/approval/${id}`)
    },
    cancel () {
      this.popShow = false
    }
  },
  computed: {
  },
  components: {
  }
}
</script>

<style src="../css/danju"></style>
<style src="../css/style"></style>
