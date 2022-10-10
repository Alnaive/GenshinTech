<script setup>
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import homeInfo from "@/components/HomeInfo.vue"
import Equip from '@/components/builds/Equip.vue';
import Conste from '@/components/builds/Conste.vue';
import Talent from '@/components/builds/Talent.vue';
import Stats from '@/components/builds/Stats.vue';
import Weapon from '@/components/builds/Weapon.vue';
import Flower from '@/components/builds/Flower.vue';
import Plume from '@/components/builds/Plume.vue';
import Sands from '@/components/builds/Sands.vue';
import Goblet from '@/components/builds/Goblet.vue';
import Circlet from '@/components/builds/Circlet.vue';
import axios from 'axios'

import { useMeta } from 'vue-meta'
    const { meta } =  useMeta({
      title: 'Genshin Impact Build References',
      description: 'Provide you a references about build character',
      htmlAttrs: {
        lang: 'en',
        amp: true
      },
    })

  const form = reactive({
    uid: '',
  })
  function search(uid){
    const data = axios.get(`https://akasha.genshin-tech.com/api/u/${uid}`);
    router.$this.push({ name: 'userUID'})
  }
  const build = ref({})
  axios.get(`https://akasha.genshin-tech.com/api/home`).then(response => {
    Object.values(response.data).map((val) => {
      build.value = val[0]
      element.value = val[0].character.element
    })
  })
const element = ref('')
  function bgElement(){
    const ele = element.value;
        if(ele == "Ice"){
            return "https://wiki.hoyolab.com/_nuxt/videos/bg_cryo.895bc11.webm"
        } else if(ele == "Rock"){
            return "https://wiki.hoyolab.com/_nuxt/videos/bg_geo.30f1b13.webm"
        } else if(ele == "Dendro"){
            return "https://wiki.hoyolab.com/_nuxt/videos/bg_dendro.e006ad0.webm"
        } else if(ele == "Wind"){
            return "https://wiki.hoyolab.com/_nuxt/videos/bg_anemo.c91ba8c.webm"
        } else if(ele == "Electric"){
            return "https://wiki.hoyolab.com/_nuxt/videos/bg_electro.31803e5.webm"
        } else if(ele == "Water"){
            return "https://wiki.hoyolab.com/_nuxt/videos/bg_hydro.553f0b8.webm"
        } else if(ele == "Fire"){
            return "https://wiki.hoyolab.com/_nuxt/videos/bg_pyro.848109d.webm"
        } 
    }
</script>

<template>
    <metainfo>
      <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>
<div class="flex flex-col md:flex-row container mx-auto px-4 space-x-4 space-y-4 mt-5">
  <div class="space-y-4 mr-4 md:mt-[250px]">
        <h1 class="font-bold text-xl ">Create a Card and Store Your Build</h1>
        <p class="text-md">Fetch data from your Character Showcase and display a build card or store it, instantly.</p>
        <form @submit.prevent="searchUID(uid)">
            <div class="flex flex-row space-x-4">
                <input v-model="form.uid" type="text" placeholder="UID" class="input input-bordered w-full max-w-xs "><br>
                <router-link :to="`/u/${form.uid}`"  class="btn btn-primary">Search</router-link>
            </div>
            <pre class="mt-3 normal-case">Powered by Enka.Network</pre>
        </form>
    </div>
    <div class="relative overflow-x-auto md:overflow-hidden rounded-lg">
      <div class="flex flex-row  shadow-lg  h-[736px] w-[900px]" >
        <div class=" absolute z-30 ">
            <ul id="landscapeData" class="flex flex-row space-x-4 rounded-xl ">
            <li>
                <div id="potraitData" class="w-[414px] h-[736px] card " >
                <figure >
                    <img :src="`https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/${build.character.avatar}.png`" >
                </figure> 
                <div class="drop-shadow-lg shadow-black font-bold text-white absolute ml-4 top-0 mt-1">
                <pre data-prefix="$"><code>{{ build.character.name}}</code></pre> 
                <pre data-prefix=">" class="text-warning"><code>Level {{ build.level}}/{{( build.ascendsion * 10) + ( build.ascendsion>0?10:0) + 20}}</code></pre> 
                </div>
                <section class="visible md:invisible">
                <Equip :build="build" />
                </section>
                <Conste :build="build" />
                <Talent :build="build" /> 
                <div class="card absolute inset-x-0 bottom-0 mt-5">
                    <div class="bg-transparent" >
                        <section class="px-2 py-2 text-white" >
                            <Stats :build="build" />
                        </section>
                    </div>
                </div>
                </div>
            </li>
            <li>
            <div class="space-y-1 mt-3 mr-2 text-white">
                <Weapon :build="build" />
                <Flower :build="build"/>
                <Plume :build="build"/>
                <Sands :build="build"/>
                <Goblet :build="build"/>
                <Circlet :build="build"/>
                <div  class="flex space-x-3 justify-center" >
                    <div class="flex-none ...">
                    <div class="flex flex-col">
                            <div  v-if="build.two_pcs_art">
                                <div v-for="data in build.two_pcs_art" :key="data" class="font-bold whitespace-nowrap text-md">
                                    {{data}}
                                </div>
                            </div>
                            <div v-if="build.one_pcs_art">
                                <div class="font-bold whitespace-nowrap text-md mt-[12px]">{{build.one_pcs_art}}</div>
                            </div>
                            <div v-if="build.four_pcs_art">
                                <div class="font-bold whitespace-nowrap text-md mt-[12px]">{{build.four_pcs_art}}</div>
                            </div>
                    </div>
                    </div>
                    <div class="flex-none ...">
                        <div class="flex flex-col " >
                            <div  v-if="build.two_pcs_art">
                              <div v-for="data in build.two_pcs_art" :key="data" class="font-bold text-md">
                                <div class="font-bold text-md badge">2</div>
                                </div>
                            </div>
                            <div v-if="build.one_pcs_art">
                                <div class="font-bold text-md badge mt-[12px]">3</div>
                            </div>
                            <div v-if="build.four_pcs_art">
                                <div class="font-bold text-md badge mt-[15px]">4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </li>
        </ul>
    </div>
    <video autoplay loop muted class="object-cover z-10">
      <source :src="bgElement()" type="video/webm" />
    </video>
        </div>
    </div>
</div>
  
  <homeInfo/>

</template>