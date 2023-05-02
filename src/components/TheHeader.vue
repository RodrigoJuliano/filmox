<template>
  <q-header elevated class="bg-primary text-white bg-black">
    <q-toolbar class="toolbar q-py-sm">
      <q-toolbar-title class="col-grow col-sm-auto col-md-4 q-pr-md">
        <q-icon name="fa-solid fa-film" class="q-pa-sm" color="white" size="24px" />
        <span class="vertical-middle">Filmox</span>
      </q-toolbar-title>
      <q-btn icon="menu" class="xs" />
      <q-form class="col-12 col-sm-grow col-md-4" @submit="onSubmit">
        <q-input
          v-model="searchText"
          dense
          standout
          placeholder="Search..."
          ref="searchElementRef"
          class="input"
        >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" @click="searchElementRef?.focus" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="onClickClear" />
          </template>
        </q-input>
      </q-form>
      <!-- Could be done using cssAddon (order-xs) insted of duplicating the button -->
      <q-btn icon="menu" class="sm" />
      <q-tabs align="right" :breakpoint="0" class="col-md-4 q-pl-md gt-sm">
        <q-route-tab to="/" label="Discover" />
        <q-route-tab to="/watchlist" label="Watchlist" />
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QInput } from 'quasar';
import { useRouter } from 'vue-router';

const searchElementRef = ref<QInput | null>(null);
const searchText = ref('');
const router = useRouter();

const onClickClear = () => {
  searchText.value = '';
  searchElementRef.value?.focus();
};

const onSubmit = () => {
  console.log('Submit search');
  router.push({ path: '/search', query: { q: searchText.value } });
};
</script>

<style scoped>
.toolbar {
  /* Using directly the class 'wrap' wont work */
  flex-wrap: wrap;
}

.input {
  cursor: text;
}
</style>
