<script setup>
import { ref, watch, reactive } from 'vue'
import { makeUseInfiniteScroll } from 'vue-use-infinite-scroll'
import { RouterLink, RouterView } from "vue-router";

    // INTERSECTION OBSERVER

    // set the intersection options object
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const useInfiniteScroll = makeUseInfiniteScroll({}) // the argument is optional

    // create the template ref for the element that
    // will trigger the intersection observer
    const intersectionTrigger = ref(null) // as Ref<HTMLElement>

    // useInfiniteScroll returns a pageRef, starting from page 1,
    // which changes we should listen to fetch more data
    const pageRef = useInfiniteScroll(intersectionTrigger)

    watch(
        pageRef,
        (page) => {
            fetchItems(page)
        },
        { immediate: true }
    )

    // DATA

    const itemsRef = ref([])
    const errorMessageRef = ref('')
    
    async function fetchItems(page) {
        fetch(`https://akasha.genshin-tech.com/api/explore?page=${page}`)
            .then((res) => res.json())
            .then((data) => itemsRef.value.push(...data.data.data))
            .catch((error) => (errorMessageRef.value = error.message))
    }
    const form = reactive({
        uid: '',
    })
</script>
  <template>
  <div>
    <span>{{ errorMessageRef }}</span>
    <form @submit.prevent="searchUID(uid)">
        <div class="flex flex-row space-x-4 mt-5">
            <input v-model="form.uid" type="text" placeholder="Search uid" class="input input-bordered w-full max-w-xs "><br>
            <router-link :to="`/showcase/${form.uid}`" class="btn btn-success">Search</router-link>
        </div>
    </form>
    <ul class="space-y-2 mt-5">
        <li v-for="item in itemsRef" :key="item.id" class="card shadow-xl">
            <div class="flex flex-col">
                <div class="card ">
                    <div id="potraitData" class="w-[368px] md:w-[399px] h-[400px] card " >
                        <router-link :to="`/build/${item.id}`">
                            <figure>
                                <img :src="`https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/${item.character.avatar}.png`" >
                            </figure> 
                            <div class="drop-shadow-lg shadow-black font-bold text-white absolute ml-4 top-0 mt-1">
                            <h1 class="text-lg font-bold">{{item.nickname}}</h1>
                            <pre class="text-warning">Level {{ item.level}}/{{( item.ascendsion * 10) + ( item.ascendsion>0?10:0) + 20}}</pre>
                            </div>
                            <!-- <Equip :build="build" />
                            <Conste :build="build" />
                            <Talent :build="build" />  -->
                        </router-link>
                    </div>
                </div>
            </div>    
        </li>
        <!-- DOM element used as trigger -->
        <div ref="intersectionTrigger"></div>
    </ul>
</div>
  </template>