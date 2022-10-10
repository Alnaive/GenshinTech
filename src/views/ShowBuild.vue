<template>
    <metainfo>
    <template v-slot:title="{content}">{{ content }} </template>
</metainfo>
<div class="flex justify-center">
        <div class="alert alert-info shadow-lg w-full mt-5 flex justify-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Build by {{build.nickname}}</span>
            </div>
        </div>
   </div>
    <div class="overflow-auto md:overflow-hidden rounded-xl mt-5" >
        <div id="newLayout" class="flex ">
            <section class="bg-cover p-1" :style="{ backgroundImage: 'url(' + bgElementImg() + ')'}">
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
            </section>
        </div>
    </div>

<div class="flex mt-2 space-x-2">
    <button class="btn vld-parent bg-green-500 text-white hover:bg-green-400" @click.prevent="exportNewImg"><VueFeather type="image" size="24" class="mr-1" ></VueFeather> 
    <loading v-model:active="isLoading" :is-full-page="fullPage" width="24" height="24"/> Export</button>
</div>
<div id="canvasNew" class="mt-2 mb-2">
</div>

</template>
<script setup>
import { defineComponent, defineProps, ref, computed,} from 'vue';
    import axios from 'axios';
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
    import domtoimage from 'dom-to-image';
    import VueFeather from 'vue-feather';
    defineComponent({
        Tab, Tabs, TabPanels, TabPanel
    })

    const props = defineProps({
        id: String,
    })
    const active = ref()
    const activeTab = ref();
    const isLoading = ref(false);
    const build = ref([]);
    const Element = ref();
    const metaChar = ref();
    const metaNickname = ref();
    const metaImage = ref();
    const metaDesc = ref();
     axios.get(`https://akasha.genshin-tech.com/api/build/${props.id}`).then(response => {
            build.value = response.data.build
            Element.value = response.data.build.character.element
            metaChar.value = response.data.build.character.name
            metaNickname.value = response.data.build.nickname
            metaImage.value = response.data.build.character.splashArt
            metaDesc.value = response.data.build.status
        })
        
    const { meta } = useMeta(
    computed(() => ({
        title: `${metaChar.value} `,
        description:  `${metaDesc.value} build by ${metaNickname.value} ` ,
        htmlAttrs: {
            lang: 'en',
            amp: true
        },
        og: {
            title: `${metaChar.value} `,
            description:  `${metaDesc.value} build by ${metaNickname.value}`,
            image: `https://res.cloudinary.com/genshin/image/upload/sprites/${metaImage.value}.png`,
        },
        }))
    );
    function exportNewImg(){
        isLoading.value = true
        setTimeout(() => {
            isLoading.value = false
            var node = document.getElementById("newLayout");
        var node1 = document.getElementById("canvasNew");
        domtoimage
        .toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            node1.appendChild(img);
        })
        .catch(function (error) {
            console.error("oops, something went wrong!", error);
        });
        }, 3500)
    }
    function bgElementImg(){
    const ele = Element.value;
        if(ele == "Ice"){
            return "/src/assets/images/element/bgCryo.jpg"
        } else if(ele == "Rock"){
            return "/src/assets/images/element/bgGeo.jpg"
        } else if(ele == "Dendro"){
            return "/src/assets/images/element/bgDendro.jpg"
        } else if(ele == "Wind"){
            return "/src/assets/images/element/bgAnemo.jpg"
        } else if(ele == "Electric"){
            return "/src/assets/images/element/bgElectro.jpg"
        } else if(ele == "Water"){
            return "/src/assets/images/element/bgHydro.jpg"
        } else if(ele == "Fire"){
            return "/src/assets/images/element/bgPyro.jpg"
        } 
    }
    
</script>