<template>
  <q-page class="q-ma-lg">
    <h2 class="text-center text-h4">Watchlist</h2>
    <div class="row justify-center q-gutter-lg q-pb-lg">
      <MovieCard
        v-for="movie in moviesStorie.moviesWatchlist"
        :movie="movie"
        :key="movie.id"
        :watched="moviesStorie.watchedIds.includes(movie.id)"
        :watchlisted="moviesStorie.watchlistIds.includes(movie.id)"
        @toggle-watchlist="moviesStorie.toggleWatchlist"
        @toggle-watched="moviesStorie.toggleWatchedlist"
      />
    </div>
    <h2 class="text-center text-h4">Watched</h2>
    <div class="row justify-center q-gutter-lg q-pb-lg">
      <MovieCard
        v-for="movie in moviesStorie.moviesWatched"
        :movie="movie"
        :key="movie.id"
        :watched="moviesStorie.watchedIds.includes(movie.id)"
        :watchlisted="moviesStorie.watchlistIds.includes(movie.id)"
        @toggle-watchlist="moviesStorie.toggleWatchlist"
        @toggle-watched="moviesStorie.toggleWatchedlist"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMoviesStore } from 'stores/movies';
import MovieCard from 'components/MovieCard.vue';

const moviesStorie = useMoviesStore();

onMounted(() => {
  moviesStorie.loadWatchlistMovies();
  moviesStorie.loadWatchedMovies();
});
</script>

<style scoped></style>
