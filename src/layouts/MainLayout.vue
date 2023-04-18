<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-white bg-black">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Filmox
        </q-toolbar-title>
        <q-tabs>
          <q-route-tab to="/" label="Discover" />
          <q-route-tab to="/watchlist" label="Watchlist" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-10 text-white q-pa-lg text-center vertical-middle">
      <a href="https://www.themoviedb.org/" target="_blank">
        <q-img src="src/assets/tmdb-logo.svg" width="90px" />
      </a>
      This product uses the TMDb API but is not endorsed or certified by TMDb
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts"></script>
