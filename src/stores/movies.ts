import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { Movie } from 'components/models';
import { BASE_URL, API_KEY } from 'api/index';

const createMovieListStore = (name: string) =>
  defineStore(name, () => {
    const movies = ref<Movie[]>([]);
    const loading = ref(false);
    const error = ref<string>();

    // Persisted lists on localStorage
    const moviesIds = useLocalStorage(`${name}Ids`, [] as number[]);

    async function fetchMovies(): Promise<void> {
      loading.value = true;
      const moviesToFetch = moviesIds.value.filter(
        // Dont fetch if its already cached
        (id) => !movies.value.some((v) => v.id === id)
      );

      // Make one fetch promise for eache movie
      const promises = moviesToFetch.map((id) => {
        return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((response) => {
            movies.value.push(response);
          });
      });

      return Promise.allSettled(promises)
        .then((values) => {
          const rejecteds = values.filter(
            (v) => v.status === 'rejected'
          ) as PromiseRejectedResult[];
          if (rejecteds.length > 0) {
            error.value = rejecteds[0].reason;
            console.error(`Fail to fetch ${rejecteds.length} movies`, rejecteds);
            throw new Error('Could not fetch all movies', { cause: rejecteds[0].reason });
          }
        })
        .finally(() => {
          loading.value = false;
        });
    }

    function add(movie: Movie) {
      moviesIds.value.push(movie.id);
      movies.value.push(movie);
    }

    function remove(id: number) {
      const indexId = moviesIds.value.indexOf(id);
      // Remove if included
      if (indexId > -1) {
        moviesIds.value.splice(indexId, 1);
        // Remove the cached movie details
        const indexMovie = movies.value.findIndex((v) => {
          return v.id === id;
        });
        if (indexMovie > -1) {
          movies.value.splice(indexMovie, 1);
        }
      }
    }

    function toggle(movie: Movie) {
      const index = moviesIds.value.indexOf(movie.id);
      // Remove if included
      if (index > -1) {
        remove(movie.id);
      }
      // Add if not included
      else {
        add(movie);
      }
    }

    return {
      movies,
      moviesIds,
      loading,
      error,
      add,
      remove,
      toggle,
      fetchMovies,
    };
  });

export const useWatchlistStore = createMovieListStore('watchlist');
export const useWatchedlistStore = createMovieListStore('watchedlist');
