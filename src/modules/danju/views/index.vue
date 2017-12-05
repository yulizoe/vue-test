<template>
    <div class="wrapper" ref="indicator">
      <div class="index-bar">
        <span>首页</span>
      </div>
      <div class="choose-bar">
        <span class="left-tab" @click="refresh">单据申请</span>
        <span class="right-tab" @click="mydanju">我的单据</span>
      </div>
        <div class="cont">
            <div class="loading" v-show="!loaded">
                <span><i></i>更新中...</span>
            </div>
            <div v-if="getTime !== 0" class="dj-list">
                <template v-if="keyList && keyList.length">
                    <div v-if="!mydanjuShow"
                        v-for="key in keyList"
                        class="dj-item"
                        :id="danju[key].id"
                        v-show="loaded"
                        @click="toEdit(danju[key].id)">
                        <div class="dj-item-hd">
                            <div class="dj-item-danju-info">
                                <div class="dj-item-tit">{{danju[key].title}}</div>
                            </div>
                        </div>
                    </div>
                  <div v-if="mydanjuShow"
                       v-for="key in keyList"
                       class="dj-item"
                       :id="danju[key].id"
                       v-show="loaded"
                       @click="toApproval(danju[key].id,danju[key])"
                       >
                    <div class="dj-item-hd" v-if="danju[key].my === 'true'">
                      <div class="dj-item-danju-info">
                        <div class="dj-item-tit">{{danju[key].title}}</div>
                      </div>
                      <div class="dj-item-danju-status">
                        <div class="dj-item-status">{{danju[key].status}}</div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                    <div class="dj-item dj-item-tips" v-show="loaded">
                        <p>无更多单据</p>
                    </div>
                </template>
            </div>
            <!--<div v-show="canLoadMore && !loadingMore && loaded"-->
                 <!--class="m-load"-->
                 <!--@click="loadMoredanju">点击加载</div>-->
            <!--<div class="loading loading-more" v-show="loadingMore">-->
                <!--<i></i><span>正在加载更多</span>-->
            <!--</div>-->
            <!--<div style="display: none" class="m-load" v-show="!canLoadMore">无更多单据</div>-->
        </div>
    </div>
</template>

<script>
import('../js/flexible')

export default {
  mapGetters: ['danju', 'loaded', 'getTime', 'result', 'canLoadMore', 'loadingMore'],
  mapActions: ['getdanju', 'loadMore'],

  created () {
    this.getdanju({
      page: 0,
      size: 6
    })
    this.page ++
    console.log('get问答成功', this)
  },

  data () {
    return {
      deleteId: 0,
      showModal: false,
      page: 0,
      showLoadMore: true,
      mydanjuShow: false
    }
  },

  methods: {

    // 点击进入编辑页
    toEdit (id) {
      this.$router.push(`/danju/${id}`)
    },
    // 点击进入审批页面
    toApproval (id, item) {
      if (item.status === '单据完成' || item.status === '审批不通过') {
        this.$router.push(`/result/${id}`)
        return false
      }
      this.$router.push(`/approval/${id}`)
    },
    refresh () {
      this.mydanjuShow = false
      this.getdanju({
        page: 0,
        size: 6
      })
      this.page ++
    },
    // 我的单据
    mydanju () {
      this.mydanjuShow = true
      this.getdanju({
        page: 0,
        size: 6
      })
      this.page ++
      console.log('this.mydanjuShow', this.mydanjuShow)
    },
    // 加载更多，手动点击触发
    loadMoredanju () {
      this.loadMore({
        page: this.page,
        size: 6
      })
      this.page ++
    }
  },
  computed: {
    'keyList' () {
      return this.danju && Object.keys(this.danju)
    }
  },
  components: {
  }
}
</script>

<style src="../css/danju"></style>
<style src="../css/style"></style>
