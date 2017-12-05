import createStore from 'modules/danju/create-store'
const scope = {}
const store = createStore(scope)

describe('export correctly', () => {
})

describe('call actions correctly', () => {
  it('actions correctly', () => {

  })
})

describe('call mutations correctly', () => {
  const mutations = store.mutations
  const state = store.state
  it('getdanju', () => {
    const getdanju = mutations.GET_danju
    getdanju(state, {
      __status__: 'success',
      __payload__: [{
        id: 14,
        title: '补贴申请表',
        status: '未审批',
        cont: '',
        my: 'false'
    })
    const keys = Object.keys(state.danju)
    expect(keys.length).to.equal(1)
  })
  it('postDanju', () => {
    const postDanju = mutations.POST_DANJU
    postDanju(state, {
      __status__: 'success',
      __payload__: [{
      }
      }]
    })
    expect(state.curdanju.my).to.equal('true')
  })
  it('approvalDanju', () => {
    constapprovalDanju = mutations.APPROVAL_DANJU
    approvalDanju(state, {
      __status__: 'success',
      __payload__: [{
      }]
    })
    expect(state.curdanju.status).to.equal('单据完成'|| '审批不通过')
  })
  it('getdanjuById', () => {
    const getdanjuById = mutations.GET_danju_BY_ID
    getdanjuById(state, {
      __status__: 'success',
      __payload__: [{
        id: 15,
        title: '一个表',
        status: '未审批',
        cont: '',
        my: 'false'
      }]
    })
    const keys = Object.keys(state.curdanju)
    // expect(state.weibos[keys[0]].praise).to.equal(undefined)
    expect(keys.length).to.equal(1)
  })
})
