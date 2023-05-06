import { onMounted, ref } from 'vue';
import { MovieDetails } from 'components/models';
import { API_KEY, BASE_URL } from 'api/index';

export const useFetchDetails = (movieId: number) => {
  const details = ref<MovieDetails>();
  const loading = ref(true);
  const error = ref<string>();

  async function fetchDetails() {
    return fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        details.value = data as MovieDetails;
      })
      .catch((err) => {
        error.value = err.message;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  onMounted(() => {
    fetchDetails();
  });

  return { details, loading, error };
};
