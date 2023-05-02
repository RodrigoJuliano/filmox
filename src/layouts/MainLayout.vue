<template>
  <q-layout view="hHh lpR fff">
    <TheHeader />
    <q-page-container>
      <!--Using key for reacting to query changes -->
      <router-view :key="$route.fullPath" />
    </q-page-container>

    <q-footer class="bg-grey-10 text-white q-pa-lg text-center vertical-middle">
      <a href="https://www.themoviedb.org/" target="_blank">
        <q-img src="~assets/tmdb-logo.svg" width="90px" />
      </a>
      This product uses the TMDb API but is not endorsed or certified by TMDb
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import TheHeader from 'components/TheHeader.vue';
</script>
