<template>
    <div class="question-wrapper">
      <div class="index-bar">
        <a href="javascript:;" class="ui-btn index-bar-left-btn" @click="back">首页</a>
      </div>
      <div class="head">
        <h1 class="title">{{curdanju.title}}</h1>
      </div>
      <div class="form-wrapper">
        <p>审批节点：XXX</p>
        <p>审批说明</p>
        <textarea class="ui-texta" placeholder="请输入审批说明" id="approval-content"></textarea>
      </div>
      <p class="approval-btn-wrap">
        <a href="javascript:;" class="ui-btn" @click="pass(curdanju.id)">通过</a>
        <a href="javascript:;" class="ui-btn" @click="notpass">不通过</a>
      </p>
    </div>
</template>

<script>
import('../js/flexible')

export default {
  mapGetters: ['danju', 'curdanju', 'loaded', 'getTime', 'result', 'canLoadMore', 'loadingMore'],
  mapActions: ['refreshdanju', 'loadMore', 'postQuestion', 'approvalDanju', 'getdanjuById'],

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
      deleteId: 0,
      showModal: false,
      page: 0,
      showLoadMore: true
    }
  },

  methods: {
    refresh () {
    //      this.refreshdanju()
    },
    back () {
      this.$redirect('/')
    },
    // 点击进入详情页
    toDetail (id) {
      this.$router.push(`/danju/${id}`)
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
    pass (id) {
      const cont = this.checkConts(document.getElementById('approval-content').value)
      if (!cont) {
        alert('请输入审批内容')
        return
      }
      const arr = ['单据完成', cont]
      this.approvalDanju(arr)
      this.$redirect(`/result/${id}`)
      document.getElementById('approval-content').value = ''
    },
    notpass (id) {
      const cont = this.checkConts(document.getElementById('approval-content').value)
      if (!cont) {
        alert('请输入审批内容')
        return
      }
      const arr = ['审批不通过', cont]
      this.approvalDanju(arr)
      this.$redirect(`/result/${id}`)
      document.getElementById('approval-content').value = ''
    },
    // 输入内容需要进行规则校验
    checkConts (data) {
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
    }

  },
  components: {
  }
}
</script>

<style src="../css/danju"></style>
<style src="../css/style"></style>
