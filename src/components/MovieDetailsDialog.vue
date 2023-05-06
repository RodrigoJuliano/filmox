<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 780px; max-width: 90vw" class="">
      <q-img
        :ratio="780 / 439"
        :src="
          movie?.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : undefined
        "
        :alt="movie?.title"
        style="max-height: 40vh"
      >
        <template #loading>
          <q-skeleton class="skeleton" />
        </template>
        <div class="img-overlay absolute-bottom row justify-between items-end">
          <h3 class="text-h6 no-margin q-pa-xs">
            {{ movie?.title }}
          </h3>
          <div class="row no-wrap q-gutter-sm q-pa-xs">
            <q-btn
              size="12px"
              round
              color="grey-9"
              icon="visibility"
              :text-color="watched ? 'green-6' : 'white'"
              aria-label="Toggle from watched list"
              role="checkbox"
              :aria-checked="`${watched}`"
              @click="onClickToggleWatched"
            >
              <q-tooltip :delay="700">Toggle from watched list </q-tooltip>
            </q-btn>
            <q-btn
              size="12px"
              round
              color="grey-9"
              :icon="watchlisted ? 'done' : 'add'"
              :text-color="watchlisted ? 'green-6' : 'white'"
              aria-label="Toggle from watchlist"
              role="checkbox"
              :aria-checked="`${watchlisted}`"
              @click="onClickToggleWatchlist"
            >
              <q-tooltip :delay="700">Toggle from watchlist </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-img>
      <q-card-section tag="ul" class="info-list no-margin">
        <div class="text-grey-5">Rating</div>
        <div>
          <q-icon name="star" />
          {{ movie.vote_average.toFixed(1) }} / 10
        </div>
        <template v-if="details?.genres">
          <div class="text-grey-5">Genre</div>
          <div>
            <q-badge v-for="genre in details.genres" :key="genre.id" class="bg-grey-9 q-mr-xs">{{
              genre.name
            }}</q-badge>
          </div>
        </template>
        <template v-if="movie?.release_date">
          <div class="text-grey-5">Released</div>
          <div>{{ movie.release_date.replaceAll('-', '/') }}</div>
        </template>
        <template v-if="details?.runtime">
          <div class="text-grey-5">Runtime</div>
          <div v-if="details.runtime < 60">{{ details.runtime }}min</div>
          <div v-else>{{ Math.floor(details.runtime / 60) }}h {{ details.runtime % 60 }}min</div>
        </template>
        <template v-if="details?.budget">
          <div class="text-grey-5">Budget</div>
          <div>${{ details.budget.toLocaleString() }}</div>
        </template>
        <template v-if="details?.revenue">
          <div class="text-grey-5">Revenue</div>
          <div>${{ details.revenue.toLocaleString() }}</div>
        </template>
        <template v-if="details?.production_companies">
          <div class="text-grey-5">Production</div>
          <div>{{ details.production_companies.map((v) => v.name).join(', ') }}</div>
        </template>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ movie?.overview }}
      </q-card-section>

      <q-btn
        size="12px"
        class="absolute-top-right q-ma-sm"
        style="background-color: #00000033"
        round
        dense
        icon="close"
        text-color="grey-4"
        @click="onClickClose"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { Movie } from './models';
import { useFetchDetails } from '../composables/useFetchDetails';
import { useWatchlistStore, useWatchedlistStore } from 'stores/movies';

const props = defineProps<{
  movie: Movie;
}>();

defineEmits(useDialogPluginComponent.emits);

const $q = useQuasar();
const { details, error } = useFetchDetails(props.movie.id);
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
const watchlistStore = useWatchlistStore();
const watchedlistStore = useWatchedlistStore();

const watchlisted = computed(() => watchlistStore.moviesIds.includes(props.movie.id));
const watched = computed(() => watchedlistStore.moviesIds.includes(props.movie.id));

watch(error, (error) => {
  if (error) {
    $q.notify({
      type: 'negative',
      position: 'top',
      message: 'Could not load movie details',
      caption: error,
    });
  }
});

const onClickClose = () => {
  onDialogCancel();
};

const onClickToggleWatchlist = () => {
  watchlistStore.toggle(props.movie);
};

const onClickToggleWatched = () => {
  watchedlistStore.toggle(props.movie);
};
</script>

<style scoped lang="scss">
.skeleton {
  width: 780px;
  aspect-ratio: 780 / 439;
}

.img-overlay {
  background: linear-gradient(0deg, #000000e6 0% 0%, #0000 100%);
  min-height: 50%;
  @media (max-width: $breakpoint-xs-max) {
    h3 {
      font-size: 1em;
    }
  }
}

.info-list {
  list-style-type: none;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 10px;
  @media (min-width: $breakpoint-md-min) {
    grid-template-columns: repeat(2, max-content 1fr);
  }
}
</style>
