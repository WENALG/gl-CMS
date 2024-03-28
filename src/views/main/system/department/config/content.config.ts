const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表'
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
      label: '部门名称',
      align: 'center',
      width: '190'
    },
    {
      type: 'customied',
      prop: 'leader',
      label: '领导人',
      align: 'center',
      width: '190',
      slotName: 'leader'
    },
    {
      type: 'normal',
      prop: 'parentId',
      label: '上级部门',
      align: 'center',
      width: '150'
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
