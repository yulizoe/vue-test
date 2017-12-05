export default () => {
  return [{
    path: '/',
    title: '单据列表',
    component: () => import('./views/index')
  }, {
    path: '/danju/:id',
    title: '编辑',
    component: () => import('./views/edit')
  }, {
    path: '/approval/:id',
    title: '审批',
    component: () => import('./views/approval')
  },
  {
    path: '/result/:id',
    title: '结果',
    component: () => import('./views/result')
  }]
}
