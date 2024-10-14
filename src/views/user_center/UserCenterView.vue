<template>
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'userAccount'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input
              v-model:value="editableData[record.key].userAccount"
              @pressEnter="save(record.key)"
            />
            <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-popconfirm v-if="dataSource.length" title="删除该用户?" @confirm="onDelete(record.key)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, onMounted } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { TableData } from '@/types'
import { useUserStore } from '@/store/stores/user'
import { message } from 'ant-design-vue'
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '5%'
  },
  {
    title: '账号',
    dataIndex: 'userAccount'
  },

  {
    title: '权限',
    dataIndex: 'userRole',
    width: '10%',
    customRender: ({ text }: { text: number }) => {
      return text === 0 ? '普通用户' : '管理员'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: ({ text }: { text: string }) => {
      if (!text) return ''
      const date = new Date(text)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    }
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    width: '10%',
    customRender: ({ text }: { text: number }) => {
      return text === 0 ? '正常' : '异常'
    }
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]
const dataSource: Ref<TableData[]> = ref([
  {
    key: '0',
    id: '1',
    userAccount: 'test',
    userStatus: 0,
    userRole: '0',
    createTime: '2024-01-01'
  },
  {
    key: '1',
    id: '2',
    userAccount: 'test2',
    userStatus: 1,
    userRole: '0',
    createTime: '2024-01-02'
  },
  {
    key: '2',
    id: '3',
    userAccount: 'test3',
    userStatus: 0,
    userRole: '0',
    createTime: '2024-01-03'
  },
  {
    key: '3',
    id: '4',
    userAccount: 'test4',
    userStatus: 1,
    userRole: '0',
    createTime: '2024-01-04'
  }
])
onMounted(() => {
  const userStore = useUserStore()
  const p = userStore.listUser()
  p.then((res) => {
    dataSource.value = res.map((item) => ({ ...item, key: item.id.toString() }))
  }).catch((error) => {
    message.error(error)
    message.error('为您展示mock用户数据')
  })
})
const count = computed(() => dataSource.value.length + 1)
const editableData: UnwrapRef<Record<string, TableData>> = reactive({})

const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0])
}
const save = (key: string) => {
  Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key])
  delete editableData[key]
}

const onDelete = (key: string) => {
  const userToDelete = dataSource.value.find((item) => item.key === key)
  if (!userToDelete) {
    message.error('未找到要删除的用户')
    return
  }

  const userStore = useUserStore()
  userStore
    .deleteUser(userToDelete.id)
    .then(() => {
      message.success('删除成功')
      dataSource.value = dataSource.value.filter((item) => item.key !== key)
    })
    .catch((error) => {
      message.error(error)
    })
}
</script>
<style lang="less" scoped>
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
