<template>
  <q-card ref="cardRef" bordered>
    <a
      href="#"
      @click.prevent="onClickDetails"
      class="block full-height full-width rounded-borders overflow-hidden"
    >
      <q-img
        :ratio="2 / 3"
        class="image"
        :src="movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'error'"
        :alt="movie.title"
      >
        <template #loading>
          <MovieCardSkeleton />
        </template>
        <template #error>
          <div class="full-height flex flex-center text-h6">
            {{ movie.title }}
          </div>
        </template>
      </q-img>
    </a>

    <div class="absolute-bottom rounded-borders overflow-hidden">
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <q-card-section v-if="hovering || focused" class="card-info-section">
          <div class="row no-wrap justify-between items-center q-gutter-sm text-subtitle2">
            <span>{{ movie.title }}</span>
            <div class="row no-wrap q-gutter-sm">
              <q-btn
                size="10px"
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
                size="10px"
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
          <div class="row justify-between q-py-sm">
            <!-- <q-badge class="bg-grey-9"> Action </q-badge> -->
            <q-badge class="bg-grey-9" style="font-size: 14px">
              <q-icon name="star" style="margin-right: 5px" />
              {{ movie.vote_average.toFixed(1) }}
            </q-badge>
            <div class="text-grey-3" style="">
              {{ new Date(movie.release_date).getFullYear() }}
            </div>
          </div>
          <div class="overview-text text-grey-5 overflow-hidden">
            {{ movie.overview }}
          </div>
        </q-card-section>
      </transition>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useElementHover, useFocusWithin } from '@vueuse/core';
import { Movie } from './models';
import MovieCardSkeleton from 'components/MovieCardSkeleton.vue';
import MovieDetailsDialog from '../components/MovieDetailsDialog.vue';

const $q = useQuasar();

const props = defineProps<{
  movie: Movie;
  watched: boolean;
  watchlisted: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggleWatched'): void;
  (e: 'toggleWatchlist'): void;
}>();

const cardRef = ref<HTMLElement | null>(null);

const hovering = useElementHover(cardRef, { delayLeave: 150 });
const { focused } = useFocusWithin(cardRef);

const onClickToggleWatched = () => {
  emit('toggleWatched');
};

const onClickToggleWatchlist = () => {
  emit('toggleWatchlist');
};

const onClickDetails = () => {
  $q.dialog({
    component: MovieDetailsDialog,
    componentProps: { movie: props.movie },
  });
};
</script>

<style lang="scss">
:root {
  --card_width: 250px;
  @media (max-width: $breakpoint-xs-max) {
    --card_width: 145px;
  }
  @media (max-width: 340px) {
    --card_width: calc(100vw - 16px); // 16px margin
  }
}
</style>

<style scoped lang="scss">
.image {
  width: var(--card_width);
}

.card-info-section {
  background: rgba(0, 0, 0, 0.932);
  // Wont show info card info on small screens
  @media (max-width: $breakpoint-xs-max) {
    display: none;
  }
}

a {
  outline-offset: 3px;
}

.overview-text {
  /* Clamp the texto to max of 4 lines adding '...' to the end*/
  --max-lines: 4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--max-lines);
  line-clamp: var(--max-lines);
  display: -webkit-box;
  line-height: 1.1rem;
  max-height: calc(var(--max-lines) * 1.1rem);
}
</style>
