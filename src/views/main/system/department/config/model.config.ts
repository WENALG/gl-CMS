const modelConfig = {
  pageName: 'department',
  header: {
    editTitle: '修改部门',
    newTitle: '新建部门'
  },
  formDataC: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      label: '领导人',
      prop: 'leader',
      placeholder: '请输入领导人'
    },
    {
      type: 'select',
      label: '选择部门',
      prop: 'parentId',
      placeholder: '请选择部门',
      options: [] as any
    }
  ]
}
export default modelConfig
