# 后台管理系统

### 1.1 项目介绍

Vue3 + TypeScript 的后台管理系统

完成的功能如下：

1、登录：

- 账号：lily
- 密码：123456

![image-20240328160642062](C:\Users\zgl\AppData\Roaming\Typora\typora-user-images\image-20240328160642062.png)

2、系统管理：

- 用户管理
- 部门管理
- 菜单管理
- 角色管理

三个模块：搜索/重置、内容列表、新建内容

![image-20240328155725804](C:\Users\zgl\AppData\Roaming\Typora\typora-user-images\image-20240328155725804.png)

![image-20240328155822788](C:\Users\zgl\AppData\Roaming\Typora\typora-user-images\image-20240328155822788.png)

![image-20240328155959905](C:\Users\zgl\AppData\Roaming\Typora\typora-user-images\image-20240328155959905.png)

3、商品统计：

- 使用 echarts 图表

![image-20240328160410605](C:\Users\zgl\AppData\Roaming\Typora\typora-user-images\image-20240328160410605.png)



### 1.2. 项目规范

**项目规范：项目中有一些开发规范和代码风格**

- 1.文件夹、文件名称统一小写、多个单词以连接符（-）连接；
- 2.JavaScript变量名称采用小驼峰标识，常量全部使用大写字母，组件采用大驼峰；
- 3.CSS采用 Less 来编写
- 4.整个项目全部使用函数式组件，并且全面使用Hooks；
- 5.业务数据全部放在pinia中管理；
- 6.网络请求采用axios
  - 对axios进行二次封装；
  - 所有的模块请求会放到一个请求文件中单独管理；
- 7.项目使用 Element Plus 组件库
  - 使用了Element Plus 中的 菜单、面包屑等待；

### 1.3 项目运行

clone项目：

```
git clone https://github.com/WENALG/gl-CMS.git
```



安装项目依赖：

```
npm install
```



项目运行：

```
npm run dev
```
