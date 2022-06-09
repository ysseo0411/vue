<template>
  <HeaderCont />
  <main id="main">
    <section class="movie__cont">
      <TitleCont name1="Movie" name2="reference" />
      <div class="container">
        <div class="movie__inner">
          <h2 class="topmovie__title">Top 10 컨텐츠</h2>
          <div class="swiper">
            <swiper
              ref="{swiperRef}"
              :slidesPerView="5"
              :centeredSlides="true"
              :spaceBetween="30"
              :navigation="false"
              :modules="modules"
              class="mySwiper"
            >
              <swiper-slide
                v-for="(movie, index) in topmovies.slice(0, 20)"
                :key="movie.id"
                v-on:click="handleClick"
                ><div class="movie__num">{{ index + 1 }}</div>
                <img
                  :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
                  :alt="movie.title"
              /></swiper-slide>
            </swiper>

            <p class="append-buttons"></p>
          </div>
          <div class="movie__search">
            <form @submit.prevent="SearchMovies()">
              <label for="search" class="sr-only">검색하기</label>
              <input
                type="search"
                id="search"
                placeholder="검색하기"
                v-model="search"
              />
              <button type="submit">검색</button>
            </form>
          </div>
          <div class="movie__list" v-if="movies.length !== 0">
            <ul>
              <li v-for="movie in movies" :key="movie.id">
                <img
                  :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
                  @error="replaceByDefault"
                  :alt="movie.title"
                />
                <span class="title">{{ movie.title }}</span>
              </li>
            </ul>
          </div>
          <div class="null__title" v-else>검색 결과가 없습니다.</div>
        </div>
      </div>
      <ContactCont />
    </section>
  </main>
  <FooterCont />
</template>

<script>
import HeaderCont from "@/components/HeaderCont.vue";
import FooterCont from "@/components/FooterCont.vue";
import TitleCont from "@/components/TitleCont.vue";
import ContactCont from "@/components/ContactCont.vue";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ReplaceImg from "../assets/img/basic.jpg";

export default {
  components: {
    HeaderCont,
    FooterCont,
    TitleCont,
    Swiper,
    SwiperSlide,
    ContactCont,
  },
  setup() {
    // topmovie 받아오기
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    const topmovies = ref([]);
    const movies = ref([]);
    const search = ref("spiderman");

    const TopMovies = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=9278d13f704ad0fe53c2263b692efd89&language=en-US&page=1`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          topmovies.value = data.results;
        })
        .catch((error) => console.log("error", error));
    };
    TopMovies();
    console.log(topmovies);

    const SearchMovies = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      // movies 받아오기
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=9278d13f704ad0fe53c2263b692efd89&query=${search.value}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          movies.value = data.results;
          search.value = "";
        })
        .catch((error) => console.log("error", error));
    };
    SearchMovies();

    return {
      topmovies,
      movies,
      search,
      SearchMovies,
      onSwiper,
      onSlideChange,
      modules: [Navigation],
    };
  },
  methods: {
    replaceByDefault(e) {
      e.target.src = ReplaceImg;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
}
.movie__top {
  margin-bottom: 10%;

  .num {
    font-size: 10vw;
    line-height: 1;
    position: absolute;
    color: #ccc;
    margin-top: -140px;
    z-index: 6;
  }

  .title {
    font-family: var(--subKor_font);
    font-size: 2vw;
  }
}
// .swiper-slide {
//   padding-top: 130px;
//   img {
//     position: relative;
//     z-index: 10;
//   }
// }

.topmovie__title {
  font-size: 3vw;
  font-family: var(--subKor_font);
  margin-bottom: 150px;
}
.movie__search {
  position: relative;

  input {
    border: 2px solid var(--light_border);
    width: 100%;
    background: var(--black);
    border-radius: 50px;
    padding: 1rem 3rem 1rem 2rem;
    color: var(--light_bg);
    font-family: var(--subKor_font);
    margin-bottom: 3%;
  }
  button {
    position: absolute;
    right: 10px;
    top: 9px;
    background: transparent;
    border: 0;
    color: var(--black);
    background: var(--white);
    font-family: var(--subKor_font);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 12px;
    transition: opacity 0.3 ease;

    &:active {
      opacity: 0.7;
    }
  }
}
.movie__cont {
  background: var(--dark_bg);
}
.movie__list {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1%;

    li {
      width: 24%;

      .title {
        font-size: 16px;
        font-family: var(--subKor_font);
        display: block;
        padding: 2% 0;
        margin-bottom: 3%;
      }
    }
  }
}

.null__title {
  font-size: 1.7vw;
  font-family: var(--subKor_font);
  text-align: center;
  color: rgb(120, 120, 120);
}

// swiper
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  position: relative;
  height: 100%;
  text-align: left;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.movie__num {
  font-size: 120px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: -43%;
  left: 0;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
  overflow: initial;
}
.append-buttons {
  text-align: center;
  margin-top: 20px;
}

.append-buttons button {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #007aff;
  color: #007aff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 4px;
  margin: 0 10px;
  font-size: 13px;
}
</style>
