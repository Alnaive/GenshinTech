<template>
<metainfo>
    <template v-slot:title="{content}">{{ content }} </template>
</metainfo>
<div class="vld-parent">
        <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="loader" metaIcon/>
        
</div>
   <div class="flex justify-center">
        <div class="alert alert-info shadow-lg w-72 mt-5 flex justify-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Showcase's From {{nickname}}</span>
            </div>
            
        </div>
        
   </div>
   <div class="flex flex-row flex-wrap space-x-4 w-[850px] overflow-x-auto">
        <div class="avatar" v-for="data in builds" :key="data.id">
            <div :class="showChar == data[0].character.id ? 'w-20 border  rounded-full hover:cursor-pointer':'w-20  rounded-full hover:cursor-pointer'" @click="showCharacter(data[0].character_id)" v-on:click="element(data[0].character.element)">
                <img class="" :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${data[0].character.sideIcon}`" />
            </div>
        </div>
   </div>
   <div class="  mt-5 " >
        <div v-for="data in builds" :key="data" class="flex space-x-4">
            <div class="menu menu-horizontal " v-for="build in data" :key="build">
                <button :class="showBuild == build.id ? 'btn bg-gray-500 border-2 border-white ' : 'btn bg-gray-500 border-none'" @click="show(build.id)"  v-if="build.character_id == showChar" >
                    <span v-if="!build.buildName">{{build.status}}</span>
                    <span v-else>{{build.buildName}}</span>
                </button>
            </div>
        </div>
   </div>
   <div class="relative overflow-x-auto md:overflow-hidden rounded-lg mt-2" v-if="showBuild && showChar">
      <div class="flex flex-row w-[1275px] h-[550px] " >
            <div class="flex absolute z-30" v-for="dataVal in builds" :key="dataVal">
            <div v-for="build in dataVal" :key="build">
                <ul  v-if="build.id == showBuild && showChar == build.character_id">
                    <li >
                        <div class="flex flex-nowrap " >
                            <div class="flex flex-nowrap ">
                                <div class="card rounded-none w-[414px] h-[550px]" style="">
                                    <figure class="">
                                        <img :src="`https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/${build.character.avatar}.png`" >
                                    </figure> 
                                    <NewConste :build="build"/>
                                    <NewTalent :build="build" /> 
                                    <h1 class="text-lg text-white font-bold absolute right-0 " >{{build.nickname}}</h1>
                                    <h1 class="text-md text-white  absolute right-0 top-6" >{{build.uid}}</h1>
                                    <h1 class="text-lg text-white font-bold absolute left-3 whitespace-nowrap">{{build.character.name}} - {{build.status}}</h1>
                                    <h1 class="text-md text-white absolute left-3 top-6 " >Level {{build.level}}/{{(build.ascendsion * 10) + (build.ascendsion>0?10:0) + 20}}</h1> 
                                    <div class="flex items-center space-x-1 absolute left-3 top-12">
                                        <img src="/src/assets/images/svg/Friendship.svg" class="w-6 h-6">
                                        <h1 class="text-md text-white">{{build.friendship}}</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="w-[414px] relative">
                            <NewWeapon :build="build"/>
                            <div class="flex">
                                <div class="avatar flex flex-row ">
                                    <div class="w-24 rounded-full" >
                                        <img :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${build.character.sideIcon}.png`"  class="object-cover"/> 
                                    </div>
                                </div>
                                <div class="avatar flex flex-row "  v-for="data in build.party" :key="data.id" >
                                    <div class="w-24 rounded-full" >
                                        <img :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${data.sideIcon}.png`"  class="object-cover"/> 
                                    </div>
                                </div>
                            </div>
                                <div class="absolute inset-x-0 bottom-0  ">
                                    <section class="px-2 py-2 text-white " >
                                        <Stats :build="build" />
                                        <div  class="flex space-x-3 " >
                                            <div class="flex-none ...">
                                                <div class="flex flex-col">
                                                    <div  v-if="build.two_pcs_art">
                                                        <div v-for="data in build.two_pcs_art" :key="data" class="font-bold text-md text-md ml-3">2</div>
                                                    </div>
                                                    <div v-if="build.one_pcs_art">
                                                        <div class="font-bold text-md text-md ml-3">3</div>
                                                    </div>
                                                    <div v-if="build.four_pcs_art">
                                                        <div class="font-bold text-md text-md ml-3 ">4</div>
                                                    </div>
                                                        
                                                </div>
                                            </div>
                                            <div class="flex-none ...">
                                                <div class="flex flex-col " >
                                                    <div  v-if="build.two_pcs_art">
                                                            <div v-for="data in build.two_pcs_art" :key="data" class="font-bold whitespace-nowrap text-md ml-[5.55px]">
                                                                {{data}}
                                                            </div>
                                                        </div>
                                                        <div v-if="build.one_pcs_art">
                                                            <div class="font-bold whitespace-nowrap text-md ml-[5.55px]">{{build.one_pcs_art}}</div>
                                                        </div>
                                                        <div v-if="build.four_pcs_art">
                                                            <div class="font-bold whitespace-nowrap text-md ml-[5.55px] ">{{build.four_pcs_art}}</div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div class="mt-1 ">
                                <div class="space-y-1  mr-2 text-white">
                                    <Flower :build="build"/>
                                    <Plume :build="build"/>
                                    <Sands :build="build"/>
                                    <Goblet :build="build"/>
                                    <Circlet :build="build"/>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            </div>
        <video autoplay loop muted class="absolute z-0" :key="backgroundVid">
        <source :src="backgroundVid" type="video/webm" />
        </video>
        </div>
    </div>
    <div class="flex mt-2" v-if="showBuild">
        <router-link :to="`/build/${showBuild}`" class="btn btn-primary">Export Page</router-link>
    </div>
</template>
<script setup>
    import {onMounted, defineComponent, defineProps, ref, watch, computed} from 'vue';
    import axios from 'axios';
    import Characters from '@/components/builds/Characters.vue';
    import { useMeta } from 'vue-meta'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import Tabs from '@/components/Tabs.vue';
    import Tab from '@/components/Tab.vue';
    import TabPanels from '@/components/TabPanels.vue';
    import TabPanel from '@/components/TabPanel.vue';
    import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
    import NewConste from '@/components/builds/NewConste.vue';
    import Talent from '@/components/builds/Talent.vue';
    import NewTalent from '@/components/builds/NewTalent.vue';
    import Stats from '@/components/builds/Stats.vue';
    import Weapon from '@/components/builds/Weapon.vue';
    import NewWeapon from '@/components/builds/NewWeapon.vue';
    import Flower from '@/components/builds/Flower.vue';
    import Plume from '@/components/builds/Plume.vue';
    import Sands from '@/components/builds/Sands.vue';
    import Goblet from '@/components/builds/Goblet.vue';
    import Circlet from '@/components/builds/Circlet.vue';
    defineComponent({
        Tab, Tabs, TabPanels, TabPanel
    })
    const props = defineProps({
        uid: String,
    })
    const showBuild = ref();
    const showChar = ref();
    const backgroundVid = ref();
    function showCharacter(id){
            showChar.value = id;
        }
    function show(id){
            showBuild.value = id;
        }
    function element(id){
        if(id == "Ice"){
            backgroundVid.value = "https://wiki.hoyolab.com/_nuxt/videos/bg_cryo.895bc11.webm"
        } else if(id == "Rock"){
            backgroundVid.value = "https://wiki.hoyolab.com/_nuxt/videos/bg_geo.30f1b13.webm"
        } else if(id == "Dendro"){
            backgroundVid.value = "https://wiki.hoyolab.com/_nuxt/videos/bg_dendro.e006ad0.webm"
        } else if(id == "Wind"){
            backgroundVid.value = "https://wiki.hoyolab.com/_nuxt/videos/bg_anemo.c91ba8c.webm"
        } else if(id == "Electric"){
            backgroundVid.value = "https://wiki.hoyolab.com/_nuxt/videos/bg_electro.31803e5.webm"
        } else if(id == "Water"){
            backgroundVid.value = "https://wiki.hoyolab.com/_nuxt/videos/bg_hydro.553f0b8.webm"
        } else if(id == "Fire"){
            backgroundVid.value = "https://wiki.hoyolab.com/_nuxt/videos/bg_pyro.848109d.webm"
        }  
    }
   
    function bg5(){
            return "/src/assets/imagesrarity/Background_Item_5_Star.png"
        }
     function bg4(){
            return "/src/assets/imagesrarity/Background_Item_4_Star.png"
        }
    const active = ref()
    const isLoading = ref(true)
    const fullPage = ref(true)
    const loader = 'bars'
    const builds = ref();
    const profile = ref([]);
    onMounted( async () => {
       const {data} = await axios.get(`https://akasha.genshin-tech.com/api/showcase/${props.uid}`);
       builds.value = data.data;
       isLoading.value = false;
    })

    const nickname = ref('')
    const signature = ref()

      axios.get(`https://enka.network/u/${props.uid}/__data.json`).then(response => {
        profile.value = response.data.playerInfo;
        nickname.value = response.data.playerInfo.nickname
        signature.value = response.data.playerInfo.signature
       });
    
    const { meta } = useMeta(
    computed(() => ({
        title: `Showcase's by ${nickname.value}`,
        description: signature.value,
        htmlAttrs: {
            lang: 'en',
            amp: true
        },
        og: {
            title: `Showcase's by ${nickname.value}` ,
            description: signature.value,
        },
        }))
    );
</script>
<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>
<style>
    .card.image-full:before {
        --tw-bg-opacity: 0;
        opacity: 0;
        border-radius: 0;
    }
</style>