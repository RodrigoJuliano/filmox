<template>
  <q-page class="q-my-lg q-mx-auto" style="max-width: 1440px">
    <MovieCardGrid>
      <template #header>
        <h2 class="text-h4 q-my-md">Discover</h2>
        <q-btn flat dense :label="sortOptions[sort]" icon-right="sort" no-caps align="left">
          <q-menu auto-close>
            <q-list>
              <template v-for="(option, key, index) in sortOptions" :key="key">
                <q-item clickable @click="$router.replace({ path: '/', query: { sort: key } })">
                  <q-item-section>{{ option }}</q-item-section>
                </q-item>
                <!-- Separtator every 2 items -->
                <q-separator v-if="index % 2 !== 0" />
              </template>
            </q-list>
          </q-menu>
        </q-btn>
      </template>
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
        <MovieCardSkeleton v-for="i in 20" :key="i" />
      </template>
    </MovieCardGrid>
    <q-btn outline class="flex q-mx-auto" @click="fetchMoreMovies">Load more</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { useWatchlistStore, useWatchedlistStore } from 'stores/movies';
import { useFetchMoveis } from '../composables/useFetchMovies';
import MovieCard from 'components/MovieCard.vue';
import MovieCardGrid from 'components/MovieCardGrid.vue';
import MovieCardSkeleton from 'components/MovieCardSkeleton.vue';

const sortOptions = {
  'popularity.asc': 'Popularity Asc.',
  'popularity.desc': 'Popularity Desc.',
  'release_date.asc': 'Release Date Asc.',
  'release_date.desc': 'Release Date Desc.',
  'vote_average.asc': 'Vote Average Asc.',
  'vote_average.desc': 'Vote Average Desc.',
  'revenue.asc': 'Revenue Asc.',
  'revenue.desc': 'Revenue Desc.',
};

const props = withDefaults(
  defineProps<{
    sort: keyof typeof sortOptions;
  }>(),
  { sort: 'popularity.desc' }
);

const watchlistStore = useWatchlistStore();
const watchedlistStore = useWatchedlistStore();

const { movies, loading, error, fetchMoreMovies } = useFetchMoveis('/discover/movie', {
  include_adult: 'false',
  'vote_count.gte': '100',
  // 'release_date.lte': new Date().toUTCString().split('T')[0], // get only the date
  sort_by: props.sort,
});
</script>
