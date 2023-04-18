<template>
  <q-page class="q-ma-lg">
    <h2 class="text-center text-h4">Discover</h2>
    <div class="row justify-center q-gutter-lg q-pb-lg">
      <MovieCard
        v-for="movie in moviesStorie.movies"
        :movie="movie"
        :key="movie.id"
      />
    </div>
    <q-btn outline class="flex q-mx-auto" @click="moviesStorie.loadMoreMovies"
      >Load more</q-btn
    >
  </q-page>
</template>

<script setup lang="ts">
import { useMoviesStore } from 'stores/movies';
import { Movie } from 'components/models';
import MovieCard from 'components/MovieCard.vue';
import data from 'api/movie.json';

const _data = data.results as Movie[];

const moviesStorie = useMoviesStore();
</script>

<style scoped></style>
