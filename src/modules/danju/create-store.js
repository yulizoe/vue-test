import { createAction, handleAction } from 'vuex-actions'
import Normalizer from 'platojs/util/normalizer'
const normalizer = new Normalizer()

const DEFAULT_danju = [{
  id: 1,
  title: '电脑维修单',
  status: '未审批',
  cont: '',
  my: 'true'
}, {
  id: 2,
  title: '年假申请表',
  status: '单据完成',
  cont: '同意',
  my: 'true'
}, {
  id: 3,
  title: '不关机权限申请表',
  status: '审批不通过',
  cont: '',
  my: 'true'
}, {
  id: 4,
  title: '盖章申请表（人力章）',
  status: '未审批',
  cont: '',
  my: 'true'
}, {
  id: 5,
  title: '工牌制作申请表',
  status: '未审批',
  cont: '',
  my: 'false'
}, {
  id: 6,
  title: '物品申请表',
  status: '未审批',
  cont: '',
  my: 'false'
}, {
  id: 7,
  title: '会议室申请表',
  status: '未审批',
  cont: '',
  my: 'false'
}, {
  id: 8,
  title: '电话会议申请表',
  status: '未审批',
  cont: '',
  my: 'false'
}, {
  id: 9,
  title: '软件安装申请表',
  status: '未审批',
  cont: '',
  my: 'false'
}, {
  id: 10,
  title: '资产入库单',
  status: '未审批',
  cont: '',
  my: 'false'
}, {
  id: 11,
  title: '资产转移申请表',
  status: '未审批',
  cont: '',
  my: 'false'
}, {
  id: 12,
  title: '资产出库单',
  status: '未审批',
  cont: '',
  my: 'false'
}, {
  id: 13,
  title: '外来人员住宿申请表',
  status: '未审批',
  cont: '',
  my: 'false'
}, {
  id: 14,
  title: '补贴申请表',
  status: '未审批',
  cont: '',
  my: 'false'
}]

const MOCK_danju = {
  id: 15,
  title: '一个表',
  status: '未审批',
  cont: '',
  my: 'false'
}

const getdanju = payload => {
  const page = parseInt(payload.page)
  const size = parseInt(payload.size)
  console.log('1')
  let res = []
  if (page * size < DEFAULT_danju.length) {
    res = DEFAULT_danju
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res)
    }, 500)
  })
}

const getdanjuById = payload => {
  const danju = DEFAULT_danju
  let res = danju.filter(item => {
    return payload.id && parseInt(payload.id) === item.id
  })
  // 如果是刷新新增的数据，不支持查询
  if (!res.length) {
    res = res.concat([MOCK_danju])
  }
  console.log('执行', res[0])
  return res[0]
}

export default ({ scope }) => {
  const GET_danju = 'GET_danju'
  const GET_danju_BY_ID = 'GET_danju_BY_ID'
  const APPROVAL_DANJU = 'APPROVAL_DANJU'
  const POST_DANJU = 'POST_DANJU'
  const LOAD_MORE = 'LOAD_MORE'

  const state = {
    danju: {},
    curdanju: {},
    getTime: 0,
    loaded: false,
    commentLoaded: false,
    canLoadMore: true,
    loadingMore: false,
    comment: [],
    result: []
  }

  const getters = {
    danju: state => state.danju,
    getTime: state => state.getTime,
    loaded: state => state.loaded,
    commentLoaded: state => state.commentLoaded,
    loadingMore: state => state.loadingMore,
    curdanju: state => state.curdanju,
    comment: state => state.comment,
    result: state => state.result
  }

  const actions = {
    getdanju: createAction(GET_danju, payload => getdanju(payload)),
    loadMore: createAction(LOAD_MORE, payload => getdanju(payload)),
    getdanjuById: createAction(GET_danju_BY_ID, payload => getdanjuById(payload)),
    approvalDanju: createAction(APPROVAL_DANJU, payload => payload),
    postDanju: createAction(POST_DANJU, payload => payload)
  }

  const mutations = {
    [GET_danju]: handleAction({
      pending (state) {
        state.loaded = false
      },
      success (state, mutation) {
        if (mutation && mutation.length > 0) {
          const { entities, result } = normalizer.normalize(mutation)
          state.danju = Object.assign({}, state.danju, { ...entities })
          state.getTime = Date.now()
          state.result = state.result.concat(result)
        } else {
          state.canLoadMore = false
        }
        state.loaded = true
      },
      error (state) { state.loaded = false }
    }),
    [LOAD_MORE]: handleAction({
      pending (state) {
        state.loadingMore = true
      },
      success (state, mutation) {
        if (mutation && mutation.length > 0) {
          const { entities, result } = normalizer.normalize(mutation)
          state.danju = Object.assign({}, state.danju, { ...entities })
          state.getTime = Date.now()
          state.result = state.result.concat(result)
        } else {
          state.canLoadMore = false
        }
        state.loadingMore = false
      },
      error (state) { state.loadingMore = false }
    }),
    [GET_danju_BY_ID]: handleAction((state, mutation) => {
      state.curdanju = { ...mutation }
    }),
    [APPROVAL_DANJU]: handleAction((state, mutation) => {
      console.log('审批成功', mutation)
      state.curdanju.status = mutation[0]
      state.curdanju.cont = mutation[1]
      for (let i = 0; i < DEFAULT_danju.length; i++) {
        if (DEFAULT_danju[i].id === state.curdanju.id) {
          DEFAULT_danju[i].status = mutation[0]
          DEFAULT_danju[i].cont = mutation[1]
        }
        console.log('item', DEFAULT_danju[i].status)
      }
    }),
    [POST_DANJU]: handleAction((state, mutation) => {
      console.log('post成功', state, mutation)
      for (let i = 0; i < DEFAULT_danju.length; i++) {
        if (DEFAULT_danju[i].id === state.curdanju.id) {
          DEFAULT_danju[i].my = 'true'
        }
        console.log('item', DEFAULT_danju[i].my)
      }
    })
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}
