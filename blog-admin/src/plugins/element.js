import Vue from 'vue'
import {
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Aside,
  Main,
  Menu,
  MenuItem,
  Header,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Switch,
  Select,
  Option,
  PageHeader
} from 'element-ui'

Vue.use(Button)
Vue.use(Card)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)

Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Pagination)

Vue.use(Dialog)

Vue.use(Switch)

Vue.use(Select)
Vue.use(Option)

Vue.use(PageHeader)

Vue.prototype.$message = Message
Vue.prototype.$error = msg => {
  Vue.prototype.$message({ message: msg, type: 'error' })
}
Vue.prototype.$warning = msg => {
  Vue.prototype.$message({ message: msg, type: 'warning' })
}
Vue.prototype.$success = msg => {
  if (!msg) {
    Vue.prototype.$message({ message: '成功', type: 'success' })
  } else {
    Vue.prototype.$message({ message: msg, type: 'success' })
  }
}
