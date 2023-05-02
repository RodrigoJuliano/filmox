<template>
  <q-page class="q-my-lg q-mx-auto" style="max-width: 1440px">
    <MovieCardGrid>
      <template #header>
        <h2 class="text-h4 q-my-md">Watchlist</h2>
      </template>
      <MovieCard
        v-for="movie in moviesWatchlist"
        :movie="movie"
        :key="movie.id"
        :watched="watchedlistStore.moviesIds.includes(movie.id)"
        :watchlisted="watchlistStore.moviesIds.includes(movie.id)"
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
    </MovieCardGrid>
    <MovieCardGrid>
      <template #header>
        <h2 class="text-h4 q-my-md">Watched</h2>
      </template>
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
        <MovieCardSkeleton v-for="i in 20" :key="i" />
      </template>
      <!-- No movies added -->
      <div v-if="!watchedIds.length" class="q-pa-lg">
        <p class="text-grey q-ma-none">No movies have been marked as watched yet</p>
      </div>
    </MovieCardGrid>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useWatchedlistStore, useWatchlistStore } from 'stores/movies';
import MovieCard from 'components/MovieCard.vue';
import MovieCardGrid from 'components/MovieCardGrid.vue';
import MovieCardSkeleton from 'components/MovieCardSkeleton.vue';

const watchlistStore = useWatchlistStore();
const watchedlistStore = useWatchedlistStore();

const { moviesIds: watchlistIds, movies: moviesWatchlist } = storeToRefs(watchlistStore);
const { moviesIds: watchedIds, movies: moviesWatched } = storeToRefs(watchedlistStore);

const { fetchMovies: loadWatchlistMovies, toggle: toggleWatchlist } = watchlistStore;
const { fetchMovies: loadWatchedMovies, toggle: toggleWatchedlist } = watchedlistStore;

onMounted(() => {
  loadWatchlistMovies();
  loadWatchedMovies();
});
</script>
