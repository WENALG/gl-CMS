const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表'
  },
  tableList: [
    {
      type: 'selection',
      label: '选择',
      align: 'center',
      width: '60'
    },
    {
      type: 'index',
      label: '序号',
      align: 'center',
      width: '80'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '角色名称',
      align: 'center',
      width: '180'
    },
    {
      type: 'normal',
      prop: 'intro',
      label: '角色权限',
      align: 'center',
      width: '180'
    },
    {
      type: 'date',
      prop: 'createAt',
      label: '创建时间',
      align: 'center',
      width: '256'
    },
    {
      type: 'date',
      prop: 'updateAt',
      label: '更新时间',
      align: 'center',
      width: '256'
    },
    {
      type: 'control',
      label: '操作',
      align: 'center'
    }
  ]
}
export default contentConfig
