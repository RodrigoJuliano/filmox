<template>
  <q-page class="q-my-lg q-mx-auto" style="max-width: 1440px">
    <MovieCardGrid>
      <template #header>
        <h2 class="text-h4 q-my-md">Search results for '{{ query }}'</h2>
      </template>
      <MovieCard
        v-for="movie in movies"
        :movie="movie"
        :key="movie.id"
        :watched="watchedlistStore.moviesIds.includes(movie.id)"
        :watchlisted="watchlistStore.moviesIds.includes(movie.id)"
        @toggle-watchlist="watchlistStore.toggle(movie)"
        @toggle-watched="watchedlistStore.toggle(movie)"
      />
      <!-- Show skeletons while fetching -->
      <template v-if="loading">
        <MovieCardSkeleton v-for="i in 20" :key="i" />
      </template>
    </MovieCardGrid>
    <q-btn outline class="flex q-mx-auto" @click="fetchMoreMovies">Load more</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useQuasar } from 'quasar';
import { useWatchedlistStore, useWatchlistStore } from 'stores/movies';
import { useFetchMoveis } from '../composables/useFetchMovies';
import MovieCard from 'components/MovieCard.vue';
import MovieCardGrid from 'components/MovieCardGrid.vue';
import MovieCardSkeleton from 'components/MovieCardSkeleton.vue';

const props = defineProps<{
  query: string;
}>();

const $q = useQuasar();
const watchlistStore = useWatchlistStore();
const watchedlistStore = useWatchedlistStore();
const { movies, loading, error, fetchMoreMovies } = useFetchMoveis('/search/movie', {
  include_adult: 'false',
  query: props.query,
});

watch(error, (error) => {
  if (error) {
    $q.notify({
      type: 'negative',
      position: 'top',
      message: 'Could not load movies',
      caption: error,
    });
  }
});
</script>
