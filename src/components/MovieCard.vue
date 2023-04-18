<template>
  <q-card bordered ref="cardRef">
    <q-img
      :ratio="2 / 3"
      width="250px"
      :src="'https://image.tmdb.org/t/p/w342' + props.movie.poster_path"
    >
      <a
        href="#undefined"
        class="all-pointer-events block full-height full-width"
      ></a>
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <q-card-section
          v-if="hovering || focused"
          class="card-info-section absolute-bottom"
        >
          <div
            class="row no-wrap justify-between items-center q-gutter-sm text-subtitle2"
          >
            <span>{{ props.movie.title }}</span>
            <div class="row no-wrap q-gutter-sm">
              <q-btn size="10px" round color="grey-9" icon="visibility">
                <q-tooltip :delay="700">Mark as watched </q-tooltip>
              </q-btn>
              <q-btn size="10px" round color="grey-9" icon="add">
                <q-tooltip :delay="700">Add to watchlist </q-tooltip>
              </q-btn>
            </div>
          </div>
          <div class="row justify-between q-py-sm">
            <!-- <q-badge class="bg-grey-9"> Action </q-badge> -->
            <q-badge class="bg-grey-9" style="font-size: 14px">
              <q-icon name="star" style="margin-right: 5px" />
              {{ props.movie.vote_average }}
            </q-badge>
            <div class="text-grey-3" style="">
              {{ new Date(props.movie.release_date).getFullYear() }}
            </div>
          </div>
          <div class="overview-text text-grey-5 overflow-hidden">
            {{ props.movie.overview }}
          </div>
        </q-card-section>
      </transition>
    </q-img>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useElementHover, useFocusWithin } from '@vueuse/core';
import { Movie } from './models';

const props = defineProps<{ movie: Movie }>();

const cardRef = ref<HTMLDivElement>();

const hovering = useElementHover(cardRef, { delayLeave: 150 });
const { focused } = useFocusWithin(cardRef);
</script>

<style scoped>
.card-info-section {
  background: rgba(0, 0, 0, 0.932);
}

a {
  /* reduce the outline because q-img was hiding it with overflow-hidden */
  outline-offset: -2px;
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
