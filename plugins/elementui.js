import Vue from 'vue'
import Collapse from 'element-ui/lib/collapse'
import CollapseItem from 'element-ui/lib/collapse-item'
import Popover from 'element-ui/lib/popover'
import Dropdown from 'element-ui/lib/dropdown'
import DropdownMenu from 'element-ui/lib/dropdown-menu'
import DropdownItem from 'element-ui/lib/dropdown-item'
import 'element-ui/lib/theme-chalk/collapse.css'
import 'element-ui/lib/theme-chalk/collapse-item.css'
import 'element-ui/lib/theme-chalk/popover.css'
import 'element-ui/lib/theme-chalk/dropdown.css'
import 'element-ui/lib/theme-chalk/dropdown-menu.css'
import 'element-ui/lib/theme-chalk/dropdown-item.css'

Vue.component(Collapse.name, Collapse)
Vue.component(CollapseItem.name, CollapseItem)
Vue.component(Popover.name, Popover)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
