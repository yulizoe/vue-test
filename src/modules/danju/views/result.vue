<template>
  <div class="wrapper comment">
    <div class="index-bar">
      <a href="javascript:;" class="ui-btn index-bar-left-btn" @click="back">首页</a>
      <span>审批结果</span>
    </div>
    <div class="head">
      <h1 class="title">{{curdanju.title}}</h1>
    </div>
    <div class="question-wrapper">
      <!--<p class="result-wrapper">领导意见：{{curdanju.cont}}</p>-->
      <p class="result-wrapper">单据{{curdanju.status === '单据完成'? '审批通过': '审批不通过'}}</p>
    </div>
  </div>
</template>

<script>
import('../js/flexible')

export default {
  mapGetters: ['comment', 'commentLoaded', 'curdanju'],
  mapActions: ['getdanjuById'],

  created () {
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
      tip: '展开'
    }
  },

  methods: {
    back () {
      this.$redirect('/')
    }
  },
  computed: {
  },
  components: {
  }
}
</script>

<style src="../css/comment"></style>
<style src="../css/style"></style>
