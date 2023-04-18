<template>
  <q-page class="q-ma-lg">
    <h2 class="text-center text-h4">Discover</h2>
    <div class="row justify-center q-gutter-lg q-pb-lg">
      <MovieCard
        v-for="movie in moviesStorie.moviesDiscover"
        :movie="movie"
        :key="movie.id"
        :watched="moviesStorie.watchedIds.includes(movie.id)"
        :watchlisted="moviesStorie.watchlistIds.includes(movie.id)"
        @toggle-watchlist="moviesStorie.toggleWatchlist"
        @toggle-watched="moviesStorie.toggleWatchedlist"
      />
    </div>
    <q-btn
      outline
      class="flex q-mx-auto"
      @click="moviesStorie.loadMoreDicoverMovies"
      >Load more</q-btn
    >
  </q-page>
</template>

<script setup lang="ts">
import { useMoviesStore } from 'stores/movies';
import MovieCard from 'components/MovieCard.vue';

const moviesStorie = useMoviesStore();
</script>

<style scoped></style>
