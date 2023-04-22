<template>
  <q-page class="q-ma-lg">
    <h2 class="text-center text-h4">Watchlist</h2>
    <div class="row justify-center q-gutter-lg">
      <MovieCard
        v-for="movie in moviesWatchlist"
        :movie="movie"
        :key="movie.id"
        :watched="watchedIds.includes(movie.id)"
        :watchlisted="watchlistIds.includes(movie.id)"
        @toggle-watchlist="toggleWatchlist"
        @toggle-watched="toggleWatchedlist"
      />
      <!-- Show skeletons while fetching -->
      <template v-if="watchlistIds.length && !moviesWatchlist.length">
        <q-card v-for="id in watchlistIds" :key="id">
          <q-skeleton style="width: 250px; aspect-ratio: 2/3" />
        </q-card>
      </template>
      <!-- No movies added -->
      <div v-if="!watchlistIds.length" class="q-pa-lg">
        <p class="text-grey q-ma-none">No movies have been added yet.</p>
      </div>
    </div>
    <h2 class="text-center text-h4">Watched</h2>
    <div class="row justify-center q-gutter-lg q-pb-lg">
      <MovieCard
        v-for="movie in moviesWatched"
        :movie="movie"
        :key="movie.id"
        :watched="watchedIds.includes(movie.id)"
        :watchlisted="watchlistIds.includes(movie.id)"
        @toggle-watchlist="toggleWatchlist"
        @toggle-watched="toggleWatchedlist"
      />
      <!-- Show skeletons while fetching -->
      <template v-if="watchedIds.length && !moviesWatched.length">
        <q-card v-for="id in watchedIds" :key="id">
          <q-skeleton style="width: 250px; aspect-ratio: 2/3" />
        </q-card>
      </template>
      <!-- No movies added -->
      <div v-if="!watchedIds.length" class="q-pa-lg">
        <p class="text-grey q-ma-none">
          No movies have been marked as watched yet
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMoviesStore } from 'stores/movies';
import MovieCard from 'components/MovieCard.vue';

const moviesStore = useMoviesStore();

const { watchlistIds, watchedIds, moviesWatchlist, moviesWatched } =
  storeToRefs(moviesStore);

const {
  loadWatchlistMovies,
  loadWatchedMovies,
  toggleWatchedlist,
  toggleWatchlist,
} = moviesStore;

onMounted(() => {
  loadWatchlistMovies();
  loadWatchedMovies();
});
</script>

<style scoped></style>
