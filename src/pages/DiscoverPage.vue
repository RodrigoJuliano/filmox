<template>
  <q-page class="q-ma-lg">
    <h2 class="text-center text-h4">Discover</h2>
    <div class="row justify-center q-gutter-lg q-pb-lg">
      <MovieCard
        v-for="movie in moviesDiscover"
        :movie="movie"
        :key="movie.id"
        :watched="watchedIds.includes(movie.id)"
        :watchlisted="watchlistIds.includes(movie.id)"
        @toggle-watchlist="toggleWatchlist"
        @toggle-watched="toggleWatchedlist"
      />
      <!-- Show skeletons while fetching -->
      <template v-if="!moviesDiscover.length">
        <q-card v-for="i in 20" :key="i">
          <q-skeleton style="width: 250px; aspect-ratio: 2/3" />
        </q-card>
      </template>
    </div>
    <q-btn outline class="flex q-mx-auto" @click="loadMoreDicoverMovies">
      Load more
    </q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { useMoviesStore } from 'stores/movies';
import { storeToRefs } from 'pinia';
import MovieCard from 'components/MovieCard.vue';

const moviesStore = useMoviesStore();

const { watchlistIds, watchedIds, moviesDiscover } = storeToRefs(moviesStore);
const { loadMoreDicoverMovies, toggleWatchedlist, toggleWatchlist } =
  moviesStore;
</script>

<style scoped></style>
