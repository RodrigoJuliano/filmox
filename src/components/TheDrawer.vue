<template>
  <q-drawer
    :model-value="open"
    @update:model-value="(v) => $emit('update:open', v)"
    :width="200"
    overlay
    elevated
    behavior="desktop"
    class=""
    side="right"
  >
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            :active="menuItem.route === $route.path"
            active-class="drawer-item-ative"
            class="text-grey-5"
            v-ripple
            @click="$router.push(menuItem.route)"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
const menuList = [
  {
    icon: 'explore',
    label: 'Discover',
    route: '/',
    separator: true,
  },
  {
    icon: 'playlist_add_check_circle',
    label: 'Watchlist',
    route: '/watchlist',
    separator: true,
  },
];

defineProps<{
  open: boolean;
}>();

defineEmits<{
  (e: 'update:open', value: boolean): void;
}>();
</script>

<style scoped>
.drawer-item-ative {
  color: white !important;
}
</style>
