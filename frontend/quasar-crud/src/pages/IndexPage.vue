<template>
  <q-page padding>
    <q-table
      title="Posts"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-actions="props">
      <q-dt :props="props">
        <q-btn icon="delete" color="negative" dense size="sm" @click="handleDelete(props.row.id)"/>
      </q-dt>
    </template>
  </q-table>
  </q-page>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';
import postsService from 'src/services/post'

export default defineComponent({
  name: 'IndexPage',
  setup(){
    const posts = ref([])
    const {list, remove } = postsService()
    const columns = [

    { name: 'id',  label: 'ID', field: 'id', sortable: true },
    { name: 'title',  label: 'Title', field: 'title', sortable: true },
    { name: 'author',  label: 'Author', field: 'author', sortable: true },
    { name: 'actions',  label: 'Actions', field: 'actions', align: 'right' }

  ]
    onMounted(()=>{
      getPosts()
    })

    const getPosts = async () => {
      try {
        const data = await list()
        console.log(data)
        posts.value = data
      } catch (error) {
        console.log(error)
      }
    }

    const handleDelete = async (id) =>{
      try {
        await remove(id)
        alert('Apagado com sucesso')
        getPosts()
      } catch (error) {
        alert(error)
      }
    }
    return {
      posts,
      columns,
      handleDelete
    }

  }
});
</script>
