import { ref, watch, Ref } from 'vue';
import { defineStore } from 'pinia';
import { useFetch, useLocalStorage } from '@vueuse/core';
import { Movie } from 'components/models';
import { getUrlDetails, getUrlDiscover } from 'api/index';

export const useMoviesStore = defineStore('movies', () => {
  const moviesDiscover = ref<Movie[]>([]);
  const moviesWatchlist = ref<Movie[]>([]);
  const moviesWatched = ref<Movie[]>([]);
  const pagesLoaded = ref<number>(0);
  const urlDiscover = ref(getUrlDiscover(1));

  // Persisted lists on localStorage
  const watchlistIds = useLocalStorage('watchlistIds', [] as number[]);
  const watchedIds = useLocalStorage('watchedIds', [] as number[]);

  const {
    execute: executeDiscoverFetch,
    data: dataDiscover,
    error: errorDiscover,
  } = useFetch(urlDiscover).json();

  watch(dataDiscover, (data) => {
    console.log(data);
    moviesDiscover.value = moviesDiscover.value.concat(data.results);
    pagesLoaded.value += 1;
  });

  function loadMoreDicoverMovies() {
    urlDiscover.value = getUrlDiscover(pagesLoaded.value + 1);
    executeDiscoverFetch();
  }

  function loadWatchlistMovies() {
    watchlistIds.value.forEach((id) => {
      // Dont fetch if its already cached
      if (moviesWatchlist.value.find((v) => v.id === id)) {
        return;
      }
      fetch(getUrlDetails(id))
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          console.log(response);
          moviesWatchlist.value.push(response);
        });
    });
  }

  function loadWatchedMovies() {
    watchedIds.value.forEach((id) => {
      // Dont fetch if its already cached
      if (moviesWatched.value.find((v) => v.id === id)) {
        return;
      }
      fetch(getUrlDetails(id))
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          console.log(response);
          moviesWatched.value.push(response);
        });
    });
  }

  function toggleWatchlist(id: number) {
    toggleFromList(id, watchlistIds, moviesWatchlist);
  }

  function toggleWatchedlist(id: number) {
    toggleFromList(id, watchedIds, moviesWatched);
  }

  function toggleFromList(
    id: number,
    listIds: Ref<number[]>,
    listMovies: Ref<Movie[]>
  ) {
    const indexId = listIds.value.indexOf(id);
    // Remove if included
    if (indexId > -1) {
      listIds.value.splice(indexId, 1);
      // Remove the cached movie details
      const indexMovie = listMovies.value.findIndex((v) => {
        return v.id === id;
      });
      if (indexMovie > -1) {
        listMovies.value.splice(indexMovie, 1);
      }
    }
    // Add if not included
    else {
      listIds.value.push(id);
      // Copy movie details from discover list
      const movie = moviesDiscover.value.find((v) => {
        return v.id === id;
      });
      if (movie) {
        listMovies.value.push(movie);
      }
    }
  }

  return {
    moviesDiscover,
    moviesWatchlist,
    moviesWatched,
    watchlistIds,
    watchedIds,
    loadMoreDicoverMovies,
    loadWatchlistMovies,
    loadWatchedMovies,
    toggleWatchlist,
    toggleWatchedlist,
    errorDiscover,
  };
});
