<template>
  <q-page class="q-ma-lg">
    <h2 class="text-center text-h4">Search results for '{{ query }}'</h2>
    <div class="row justify-center q-gutter-lg q-pb-lg">
      <MovieCard
        v-for="movie in movies"
        :movie="movie"
        :key="movie.id"
        :watched="watchedlistStore.moviesIds.includes(movie.id)"
        :watchlisted="watchlistStore.moviesIds.includes(movie.id)"
        @toggle-watchlist="watchlistStore.toggle"
        @toggle-watched="watchedlistStore.toggle"
      />
      <!-- Show skeletons while fetching -->
      <template v-if="loading">
        <q-card v-for="i in 20" :key="i">
          <q-skeleton class="skeleton" />
        </q-card>
      </template>
    </div>
    <q-btn outline class="flex q-mx-auto" @click="fetchMoreMovies">Load more</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { useWatchedlistStore, useWatchlistStore } from 'stores/movies';
import { useFetchMoveis } from '../composables/useFetchMovies';
import MovieCard from 'components/MovieCard.vue';

const props = defineProps<{
  query: string;
}>();

const watchlistStore = useWatchlistStore();
const watchedlistStore = useWatchedlistStore();

const { movies, loading, error, fetchMoreMovies } = useFetchMoveis('/search/movie', {
  include_adult: 'false',
  query: props.query,
});
</script>

<style scoped>
.skeleton {
  width: 250px;
  aspect-ratio: 2/3;
}
</style>
