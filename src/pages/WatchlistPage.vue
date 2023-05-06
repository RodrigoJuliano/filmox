<template>
  <q-page class="q-my-lg q-mx-auto" style="max-width: 1440px">
    <MovieCardGrid>
      <template #header>
        <h2 class="text-h4 q-my-md">Watchlist</h2>
      </template>
      <MovieCard
        v-for="movie in watchlistStore.movies"
        :movie="movie"
        :key="movie.id"
        :watched="watchedlistStore.moviesIds.includes(movie.id)"
        :watchlisted="watchlistStore.moviesIds.includes(movie.id)"
        @toggle-watchlist="watchlistStore.toggle(movie)"
        @toggle-watched="watchedlistStore.toggle(movie)"
      />
      <!-- Show skeletons while fetching -->
      <template v-if="watchlistStore.loading || watchlistStore.error">
        <MovieCardSkeleton v-for="id in watchlistStore.moviesIds" :key="id" />
      </template>
      <!-- No movies added -->
      <div v-if="!watchlistStore.moviesIds.length" class="q-pa-lg">
        <p class="text-grey q-ma-none">No movies have been added yet.</p>
      </div>
    </MovieCardGrid>
    <MovieCardGrid>
      <template #header>
        <h2 class="text-h4 q-my-md">Watched</h2>
      </template>
      <MovieCard
        v-for="movie in watchedlistStore.movies"
        :movie="movie"
        :key="movie.id"
        :watched="watchedlistStore.moviesIds.includes(movie.id)"
        :watchlisted="watchlistStore.moviesIds.includes(movie.id)"
        @toggle-watchlist="watchlistStore.toggle(movie)"
        @toggle-watched="watchedlistStore.toggle(movie)"
      />
      <!-- Show skeletons while fetching -->
      <template v-if="watchedlistStore.loading || watchlistStore.error">
        <MovieCardSkeleton v-for="id in watchedlistStore.moviesIds" :key="id" />
      </template>
      <!-- No movies added -->
      <div v-if="!watchedlistStore.moviesIds.length" class="q-pa-lg">
        <p class="text-grey q-ma-none">No movies have been marked as watched yet</p>
      </div>
    </MovieCardGrid>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useWatchedlistStore, useWatchlistStore } from 'stores/movies';
import MovieCard from 'components/MovieCard.vue';
import MovieCardGrid from 'components/MovieCardGrid.vue';
import MovieCardSkeleton from 'components/MovieCardSkeleton.vue';

const $q = useQuasar();
const watchlistStore = useWatchlistStore();
const watchedlistStore = useWatchedlistStore();

onMounted(() => {
  Promise.allSettled([watchlistStore.fetchMovies(), watchedlistStore.fetchMovies()]).then(
    (values) => {
      const rejecteds = values.filter((v) => v.status === 'rejected') as PromiseRejectedResult[];
      if (rejecteds.length > 0) {
        const error = rejecteds[0].reason as Error;
        $q.notify({
          type: 'negative',
          position: 'top',
          message: error.message,
          caption: error.cause as string,
        });
      }
    }
  );
});
</script>
