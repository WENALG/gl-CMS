const comConfig = {
  pageName: 'role',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询的角色名称'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '角色权限',
      placeholder: '请输入查询的角色权限'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}
export default comConfig
