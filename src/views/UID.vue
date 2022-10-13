<script >
    import axios from 'axios'
    import { defineProps, reactive, ref } from "vue";
    import Tabs from '@/components/Tabs.vue';
    import Tab from '@/components/Tab.vue';
    import TabPanels from '@/components/TabPanels.vue';
    import TabPanel from '@/components/TabPanel.vue';
    import { EncryptStorage } from 'encrypt-storage';
    import { useStorage } from '@vueuse/core'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default({
        components:{
            Tabs, Tab, TabPanels, TabPanel, Loading
        },
        props:{
            uid: String,
        },
        data(){
            return{
                dataInfo: {},
                characters: [],
                active: ref(''),
                loading: true,
                fullPage: true,
                loader: 'bars',
                character: [],
            }
        },
        methods: {
            addBuild(data){
            const encryptStorage = new EncryptStorage(import.meta.env.VITE_SOME_KEY, {
                 storageType: 'sessionStorage',
            });
            localStorage.setItem('weapon', JSON.stringify(data))
               
            const encryptStorage1 = new EncryptStorage(import.meta.env.VITE_SOME_KEY, {
                 storageType: 'sessionStorage',
            });
            encryptStorage.setItem('sessionData', JSON.stringify(data));
            encryptStorage1.setItem('playerInfo', JSON.stringify(this.dataInfo.playerInfo));
            console.log(this.dataInfo.playerInfo);
            },
            addCharacter(char){
                const encryptStorage = new EncryptStorage(import.meta.env.VITE_SOME_KEY, {
                    storageType: 'sessionStorage',
                });
                encryptStorage.setItem('charData', JSON.stringify(char));
                Object.values(this.characters.data).map((item) => {
                    if(char.skillDepotId != item.skillDepotId){
                        this.character.push(item)
                    }
                })
                localStorage.setItem('characters', JSON.stringify(this.character));
            },
            bg5(){
                return "/images/rarity/Background_Item_5_Star.png"
            },
            bg4(){
                return "/images/rarity/Background_Item_4_Star.png"
            },
             bg3(){
                return "/images/rarity/Background_Item_3_Star.png"
            },
            bg2(){
                return "/images/rarity/Background_Item_2_Star.png"
            },
            bg1(){
                return "/images/rarity/Background_Item_1_Star.png"
            },
        },
       async mounted() {
        const uid = this.uid
        const  dataValue = await axios.get(`https://enka.network/u/${uid}/__data.json`);
        const  dataCharacter = await axios.get(`https://akasha.genshin-tech.com/api/characters`);
        this.dataInfo = dataValue.data
        this.characters = dataCharacter.data
        this.loading = false
       },
    })


</script>
<template>
 <div class="vld-parent">
        <loading :active="loading" 
        :is-full-page="fullPage"
        :loader="loader">
        </loading>        
    </div>
    <div v-if="!dataInfo">
        <a :href="`https://enka.network/u/${uid}`" target="__BLANK" >
        <div class="alert alert-error shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>something wrong, is enka down?</span>
            </div>
        </div>
        </a>
    </div>
    <div v-else class="flex overflow-auto lg:overflow-hidden">
        <tabs v-model="active">
            <tab v-for="data in dataInfo.avatarInfoList" :key="data.id">
                <div v-for="character in characters.data" :key="character.id">
                    <div class="avatar" v-if="data.skillDepotId == character.skillDepotId">
                        <div class="w-16 rounded-full">
                            <img  :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${character.icon}`" :alt="data.skillDepotId">
                        </div>
                    </div>
                </div>
            </tab>
        </tabs>
    </div>
    <tab-panels v-model="active" >
                <tab-panel v-for="data in dataInfo.avatarInfoList" :key="data" >
        <div class="flex justify-center space-x-2 " v-for="char in characters.data" :key="char.id" >
            <div v-if="data.skillDepotId == char.skillDepotId" class="artboard phone-2 artboard-demo  card shadow-xl image-full bg-dark-eval-2 
             transform hover:scale-105 duration-500 ease-in-out" >
                <router-link :to="`/add/${uid}`" @click="addBuild(data)" v-on:click="addCharacter(char)">
            <figure >
                    <img :src="`https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/${char.avatar}.png`" >
                </figure> 
                <div class="">
                    <h3 class="text-center text-black dark:text-white font-bold text-lg absolute left-[11px] top-0 mt-5">{{char.name}}  Lv {{data.propMap[4001]['val']}}
                    </h3>
                    <!-- <Equip :uid="uid" ></Equip> -->
                    <div v-for="(weaponItem, index) in Object.keys(data.equipList).splice(5,5)" :key="index" class="avatar absolute left-2 top-20 ">
                        <div v-if="data.equipList[weaponItem].flat.rankLevel == 5" class="mb-8 rounded-btn w-12 h-12 " :style="{ backgroundImage: 'url(' + bg5() + ')', backgroundSize:'contain' }" >
                            <img v-if="Object.values(data.equipList[weaponItem].weapon.promoteLevel > 1)"  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}_Awaken.png`">
                            <img v-else :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[weaponItem].flat.rankLevel == 4" class="mb-8 rounded-btn w-12 h-12 " :style="{ backgroundImage: 'url(' + bg4() + ')', backgroundSize:'contain' }" >
                            <img v-if="Object.values(data.equipList[weaponItem].weapon.promoteLevel > 1)"  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}_Awaken.png`">
                            <img v-else :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[weaponItem].flat.rankLevel == 3" class="mb-8 rounded-btn w-12 h-12 " :style="{ backgroundImage: 'url(' + bg3() + ')', backgroundSize:'contain' }" >
                            <img v-if="Object.values(data.equipList[weaponItem].weapon.promoteLevel > 1)"  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}_Awaken.png`">
                            <img v-else :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[weaponItem].flat.rankLevel == 2" class="mb-8 rounded-btn w-12 h-12 " :style="{ backgroundImage: 'url(' + bg2() + ')', backgroundSize:'contain' }" >
                            <img v-if="Object.values(data.equipList[weaponItem].weapon.promoteLevel > 1)"  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}_Awaken.png`">
                            <img v-else :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[weaponItem].flat.rankLevel == 1" class="mb-8 rounded-btn w-12 h-12 " :style="{ backgroundImage: 'url(' + bg1() + ')', backgroundSize:'contain' }" >
                            <img v-if="Object.values(data.equipList[weaponItem].weapon.promoteLevel > 1)"  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}_Awaken.png`">
                            <img v-else :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[weaponItem].flat.icon}.png`">
                        </div>
                    </div>
                    <div v-for="(flower, index) in Object.keys(data.equipList).splice(0,1)" :key="index" class="avatar absolute left-2 top-36">
                        <div v-if="data.equipList[flower].flat.rankLevel == 5" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg5() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[flower].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[flower].flat.rankLevel == 4" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg4() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[flower].flat.icon}.png`">
                        </div>
                         <div v-else-if="data.equipList[flower].flat.rankLevel == 3" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg3() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[flower].flat.icon}.png`">
                        </div>
                         <div v-else-if="data.equipList[flower].flat.rankLevel == 2" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg2() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[flower].flat.icon}.png`">
                        </div>
                         <div v-else-if="data.equipList[flower].flat.rankLevel == 1" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg1() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[flower].flat.icon}.png`">
                        </div>
                    </div>
                    <div v-for="(plume, index) in Object.keys(data.equipList).splice(1,1)" :key="index" class="avatar absolute left-2 top-52">
                        <div v-if="data.equipList[plume].flat.rankLevel == 5" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg5() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[plume].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[plume].flat.rankLevel == 4" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg4() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[plume].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[plume].flat.rankLevel == 3" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg3() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[plume].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[plume].flat.rankLevel == 2" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg2() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[plume].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[plume].flat.rankLevel == 1" class="mb-8 rounded-btn w-12 h-12" 
                        :style="{ backgroundImage: 'url(' + bg1() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[plume].flat.icon}.png`">
                        </div>
                    </div>
                    <div v-for="(sand, index) in Object.keys(data.equipList).splice(1,2)" :key="index" class="avatar absolute left-16 top-28 ">
                        <div v-if="data.equipList[sand].flat.rankLevel == 5" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg5() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[sand].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[sand].flat.rankLevel == 4" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg4() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[sand].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[sand].flat.rankLevel == 3" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg3() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[sand].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[sand].flat.rankLevel == 2" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg2() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[sand].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[sand].flat.rankLevel == 1" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg1() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[sand].flat.icon}.png`">
                        </div>
                    </div>
                    <div v-for="(goblet, index) in Object.keys(data.equipList).splice(2,2)" :key="index" class="avatar absolute left-16 top-44 ">
                        <div v-if="data.equipList[goblet].flat.rankLevel == 5" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg5() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[goblet].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[goblet].flat.rankLevel == 4" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg4() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[goblet].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[goblet].flat.rankLevel == 3" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg3() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[goblet].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[goblet].flat.rankLevel == 2" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg2() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[goblet].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[goblet].flat.rankLevel == 1" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg1() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[goblet].flat.icon}.png`">
                        </div>
                    </div>
                    <div v-for="(circlet, index) in Object.keys(data.equipList).splice(2,3)" :key="index" class="avatar absolute left-16 top-60 indicator">
                        <div v-if="data.equipList[circlet].flat.rankLevel == 5" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg5() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[circlet].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[circlet].flat.rankLevel == 4" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg4() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[circlet].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[circlet].flat.rankLevel == 3" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg3() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[circlet].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[circlet].flat.rankLevel == 2" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg2() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[circlet].flat.icon}.png`">
                        </div>
                        <div v-else-if="data.equipList[circlet].flat.rankLevel == 1" class="mb-8 rounded-btn w-12 h-12" :style="{ backgroundImage: 'url(' + bg1() + ')', backgroundSize:'contain' }">
                            <img  :src=" `https://res.cloudinary.com/genshin/image/upload/sprites/${data.equipList[circlet].flat.icon}.png`">
                        </div>
                    </div>
                    <!-- end of equip -->
                </div>
                <div class="card absolute inset-x-0 bottom-0 mt-5">
                    <div class="bg-transparent" >
                        <section class="px-2 py-2 text-white" >
                            <div class="flex items-center gap-2">
                                    <img src="/images/attribute/Icon_Attribute_Health.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Max Hp</strong>
                                    <strong class="mr-2 "> <span >{{ data.fightPropMap[2000].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) }}</span> <br>
                                    </strong>
                                </div> 
                                <div class="flex items-center gap-2">
                                    <img src="/images/attribute/Icon_Attribute_Attack.png"  class="w-8 h-8">
                                    <strong class="flex-1 w-64">Attack</strong>
                                    <strong class="mr-2 "> <span >{{ data.fightPropMap[2001].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) }}</span> <br>
                                    </strong>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="/images/attribute/Icon_Attribute_Defense.png"  class="w-8 h-8">
                                    <strong class="flex-1 w-64">Defense</strong>
                                    <strong class="mr-2 "> <span >{{ data.fightPropMap[2002].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) }}</span> <br>
                                    </strong>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="/images/attribute/Icon_Attribute_Elemental_Mastery.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Elemental Mastery</strong>
                                    <strong class="mr-2 "> <span >{{ data.fightPropMap[28].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) }}</span> <br>
                                    </strong>
                                </div>
                                <div class="divider"></div>
                                <div class="flex items-center gap-2">
                                    <img src="/images/attribute/Icon_Attribute_Critical_Hit.png" class="w-[23px] h-[21px] ml-[8px]">
                                    <strong class="flex-1 w-64 ">Critical Rate</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[20] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div>
                                    <div class="flex items-center gap-2">
                                    <img src="/images/attribute/Icon_Attribute_Critical_Damage.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Critical Damage</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[22] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="/images/attribute/Icon_Attribute_Energy_Recharge.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Energy Recharge</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[23] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div>
                                <div class="flex items-center gap-2" v-if="char.Element == 'Water' && data.fightPropMap[42] > 0">
                                    <img src="/images/attribute/Hydro.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Hydro DMG Bonus</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[42] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div>
                                <div class="flex items-center gap-2" v-if="char.Element == 'Wind' && data.fightPropMap[44] > 0">
                                    <img src="/images/attribute/Anemo.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Anemo DMG Bonus</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[44] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div> 
                                <div class="flex items-center gap-2" v-if="char.Element == 'Fire' && data.fightPropMap[40] > 0">
                                    <img src="/images/attribute/Pyro.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Pyro DMG Bonus</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[40] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div>
                                <div class="flex items-center gap-2" v-if="char.Element == 'Ice' && data.fightPropMap[46] > 0">
                                    <img src="/images/attribute/Cryo.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Cryo DMG Bonus</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[46] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div>
                                <div class="flex items-center gap-2" v-if="char.Element == 'Electric' && data.fightPropMap[41] > 0">
                                    <img src="/images/attribute/Electro.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Electro DMG Bonus</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[41] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div>
                                <div class="flex items-center gap-2" v-if="char.Element == 'Rock' && data.fightPropMap[45] > 0">
                                    <img src="/images/attribute/Geo.png" class="w-8 h-8">
                                    <strong class="flex-1 w-64">Geo DMG Bonus</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[45] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div>
                                <div class="flex items-center gap-2" v-if="data.fightPropMap[30] > 0">
                                    <img src="/images/attribute/Icon_Attribute_Physical2.png"  class="w-8 h-8">
                                    <strong class="flex-1 w-64">Physical DMG Bonus</strong>
                                    <strong class="mr-2 "> <span >{{ parseFloat(data.fightPropMap[30] * 100).toFixed(1) }}%</span> <br>
                                    </strong>
                                </div>
                        </section>
                    </div>
                </div>
            </router-link>
        </div>
        </div>
        </tab-panel>
            </tab-panels>
</template>