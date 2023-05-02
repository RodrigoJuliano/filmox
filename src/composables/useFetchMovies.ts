import { computed, onMounted, ref } from 'vue';
import { Movie } from 'components/models';
import { API_KEY, BASE_URL } from 'api/index';

type Params = Record<string, string>;

export const useFetchMoveis = (path: string, params: Params) => {
  const movies = ref<Movie[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const pages = ref(1);

  const url = computed<string>(() => {
    const _url = new URL(BASE_URL + path);
    const allParams = new URLSearchParams({
      api_key: API_KEY,
      page: pages.value.toString(),
      ...params,
    });
    _url.search = allParams.toString();
    return _url.toString();
  });

  async function fetchMovies(): Promise<Movie[]> {
    return fetch(url.value)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data.results as Movie[];
      })
      .catch((err) => {
        error.value = err.message;
        return [];
      });
  }

  async function fetchMoreMovies(): Promise<void> {
    pages.value++;
    const newMovies = await fetchMovies();
    movies.value = movies.value.concat(newMovies);
  }

  onMounted(async () => {
    movies.value = await fetchMovies();
    loading.value = false;
  });

  return { movies, loading, error, fetchMoreMovies };
};
