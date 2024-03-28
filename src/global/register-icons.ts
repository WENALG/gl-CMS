import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcon(app: App<Element>) {
  for (const [key, compoent] of Object.entries(ElementPlusIconsVue)) app.component(key, compoent)
}

export default registerIcon
