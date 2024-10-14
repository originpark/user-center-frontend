<template>
  <div>
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      style="width: 256px"
      mode="inline"
      :open-keys="state.openKeys"
      :items="items"
      @openChange="onOpenChange"
      @click="handleClick"
    ></a-menu>
  </div>
</template>
<script lang="ts" setup>
import { VueElement, h, reactive } from 'vue'
import { AppstoreOutlined } from '@ant-design/icons-vue'
import type { ItemType } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type
  } as ItemType
}

const items: ItemType[] = reactive([
  getItem('用户管理', 'user-management', () => h(AppstoreOutlined)),
  getItem('测试选项1', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4')
  ]),
  getItem('测试选项2', 'sub3', () => h(AppstoreOutlined), [
    getItem('Option 1', '5'),
    getItem('Option 2', '6'),
    getItem('Option 3', '7'),
    getItem('Option 4', '8')
  ])
])

const handleClick = (menuInfo: { key: string }) => {
  router.push(menuInfo.key)
}

const state = reactive({
  rootSubmenuKeys: ['user-management', 'sub2', 'sub3'],
  openKeys: ['user-management'],
  selectedKeys: ['user-management']
})
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  if (state.rootSubmenuKeys.indexOf(latestOpenKey ?? '') === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}
</script>
