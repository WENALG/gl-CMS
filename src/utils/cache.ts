enum CacheType {
  Local, // 使用localStorage
  Session // 使用sessionStorage
}
// 定义一个Cache类，用于封装localStorage和sessionStorage的操作
class Cache {
  storage: Storage // 用于保存localStorage或sessionStorage的引用
  // 构造函数，接受一个CacheType类型的参数，根据参数来决定使用localStorage还是sessionStorage
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  // 定义一个setCache方法，用于向localStorage或sessionStorage中保存数据
  // key是要保存的数据的键，value是要保存的值
  setCache(key: string, value: any) {
    if (value) {
      // 使用JSON.stringify将value转换为字符串，然后保存到localStorage或sessionStorage中
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  // 定义一个getCache方法，用于从localStorage或sessionStorage中获取数据
  // key是要获取的数据的键
  getCache(key: string) {
    const value = this.storage.getItem(key) // 从localStorage或sessionStorage中获取key对应的值
    if (value) {
      // 如果获取到的值不是null，使用JSON.parse将其转换为原始的数据类型，然后返回
      return JSON.parse(value)
    }
  }
  // 定义一个removeCache方法，用于从localStorage或sessionStorage中删除数据
  // key是要删除的数据的键
  removeCache(key: string) {
    this.storage.removeItem(key) // 从localStorage或sessionStorage中删除key对应的值
  }
  // 定义一个clear方法，用于清除localStorage或sessionStorage中的所有数据
  clear() {
    this.storage.clear() // 清除localStorage或sessionStorage中的所有数据
  }
}
// 创建一个使用localStorage的Cache对象
const localCache = new Cache(CacheType.Local)
// 创建一个使用sessionStorage的Cache对象
const sessionCache = new Cache(CacheType.Session)
// 导出localCache和sessionCache对象
export { localCache, sessionCache }
