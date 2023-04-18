import { ref, watch, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { useFetch } from '@vueuse/core';
import { Movie } from 'components/models';

const BASE_URL =
  'https://api.themoviedb.org/3/discover/movie?api_key=cd0ff970215f6575ac47e1a07dc0fee6';

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([]);
  const watchlist_ids = ref<number[]>([]);
  const watched_ids = ref<number[]>([]);
  const pagesLoaded = ref<number>(0);
  const url = ref(BASE_URL);

  const { execute, data, error } = useFetch(url).json();

  watch(data, (data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(data);
    }
    movies.value = movies.value.concat(data.results);
    pagesLoaded.value += 1;
  });

  function loadMoreMovies() {
    url.value = BASE_URL + `&page=${pagesLoaded.value + 1}`;
    execute();
  }

  function addToWatchlist(id: number) {
    watchlist_ids.value.push(id);
  }

  function markAsWatched(id: number) {
    watched_ids.value.push(id);
  }

  return { movies, loadMoreMovies, addToWatchlist, markAsWatched };
});
