const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表'
  },
  tableList: [
    {
      prop: 'name',
      label: '菜单名称',
      align: 'center',
      width: '180'
    },
    {
      prop: 'type',
      label: '级别',
      align: 'center',
      width: '80'
    },
    {
      prop: 'url',
      label: '菜单url',
      align: 'center',
      width: '180'
    },
    {
      prop: 'icon',
      label: '菜单图标',
      align: 'center',
      width: '180'
    },
    {
      prop: 'sort',
      label: '排序',
      align: 'center',
      width: '80'
    },
    {
      type: 'date',
      prop: 'createAt',
      label: '创建时间',
      align: 'center',
      width: '250'
    },
    {
      type: 'date',
      prop: 'updateAt',
      label: '更新时间',
      align: 'center',
      width: '250'
    },
    {
      type: 'control',
      label: '操作',
      align: 'center'
    }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}
export default contentConfig
