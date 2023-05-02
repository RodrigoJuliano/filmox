import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { Movie } from 'components/models';
import { BASE_URL, API_KEY } from 'api/index';

const createMovieListStore = (name: string) =>
  defineStore(name, () => {
    const movies = ref<Movie[]>([]);

    // Persisted lists on localStorage
    const moviesIds = useLocalStorage(`${name}Ids`, [] as number[]);

    function fetchMovies() {
      moviesIds.value.forEach((id) => {
        // Dont fetch if its already cached
        if (movies.value.find((v) => v.id === id)) {
          return;
        }
        fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((response) => {
            console.log(response);
            movies.value.push(response);
          });
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
      add,
      remove,
      toggle,
      fetchMovies,
    };
  });

export const useWatchlistStore = createMovieListStore('watchlist');
export const useWatchedlistStore = createMovieListStore('watchedlist');
