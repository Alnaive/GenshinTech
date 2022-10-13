<template>
    <div class="flex justify-center">
        <tabs v-model="activeTab" >
            <tab><h1> New</h1></tab>
            <tab><h1>Default</h1></tab>
        </tabs>
    </div>
    <tab-panels v-model="activeTab" >
        <tab-panel>
        <h1 class="text-lg mt-1 p-1">Options :</h1>
        <div class="flex space-x-4">
            <div class="w-72">
                <label class="label">
                    <span class="label-text">Party</span>
                </label>
                <vSelect multiple
                v-model="formData.party_id" 
                :options="characters" label="name" 
                :reduce="characters => characters.skillDepotId" 
                :selectable="() => formData.party_id.length < 3"
                placeholder="Select Team"
                >
                <template v-slot:option="option" >
                <div class="flex items-center">
                    <img :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${option.icon}.png`" class="w-10 h-10" /> 
                    {{ option.name }}
                    </div>
                </template>
                </vSelect>
            </div>
            <div class="form-control w-full max-w-xs">
            <label class="label">
                <span class="label-text">Build Name</span>
                <span class="label-text">Default is Core</span>
            </label>
            <input type="text" v-model="formData.status" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
            </div>
        </div><br>
            <div  class="overflow-auto md:overflow-hidden rounded-xl" >
                <div id="newLayout" class="flex ">
                    <section class="bg-cover" :style="{ backgroundImage: 'url(' + bgElementImg() + ')'}">
                        <div class="flex flex-nowrap " >
                            <div class="flex flex-nowrap ">
                                <div class="card rounded-none w-[414px] h-[550px]">
                                    <figure class="draggable">
                                        <img  v-if="!imageUrl" :src="`https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/${charData.avatar}.png`" >
                                        <img v-else :src="imageUrl" class="object-cover ">
                                    </figure> 
                                    <NewConste :sessionData="sessionData" :charData="charData" :activeTab="activeTab"/>
                                    <NewTalent :sessionData="sessionData" :charData="charData" :activeTab="activeTab"/> 
                                    <h1 class="text-lg text-white font-bold absolute right-0 " v-show="!showNickname">{{playerInfo.nickname}}</h1>
                                    <h1 class="text-md text-white  absolute right-0 top-6 " v-show="!showUid">{{uid}}</h1>
                                    <h1 class="text-lg text-white font-bold absolute left-3 whitespace-nowrap">{{charData.name}} - {{formData.status}}</h1>
                                    <h1 class="text-md text-white absolute left-3 top-6 whitespace-nowrap" >Level {{sessionData.propMap[4001]['val']}}/{{(sessionData.propMap[1002]['val'] * 10) + (sessionData.propMap[1002]['val']>0?10:0) + 20}}</h1> 
                                    <div class="flex items-center space-x-1 absolute left-3 top-12 whitespace-nowrap">
                                        <img src="/images/svg/Friendship.svg" class="w-6 h-6">
                                        <h1 class="text-md text-white">{{sessionData.fetterInfo.expLevel}}</h1>
                                    </div>
                                    <!-- <p class="text-center p-2">"{{charData.detail}}"</p> -->
                                        <!-- <li>"constellation": "Grus Nivis",</li> -->
                                        <!-- <li>"native": "Yashiro Commission",</li> -->
                                </div>
                            </div>
                            <div class="w-[414px] relative mr-2 ml-2">
                                <NewWeapon :sessionData="sessionData" :itemName="itemName"/>
                                <div class="flex">
                                    <div class="avatar" v-if="formData.party_id.length">
                                        <div class="w-24 rounded-full">
                                            <img :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${charData.sideIcon}.png`" class="w-24"/> 
                                        </div>
                                    </div>
                                    <div class="flex flex-row" v-for="data in formData.party_id" :key="data">
                                        <div class="avatar"  v-for="char in characters" :key="char" >
                                            <div class="w-24 rounded-full " v-if="data == char.skillDepotId">
                                                <img :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${char.sideIcon}.png`"/> 
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="absolute inset-x-0 bottom-0">
                                    <section class="px-2 py-2 text-white  " >
                                        <Stats :sessionData="sessionData" :charData="charData" />
                                        <div  class="flex space-x-3 " >
                                            <div class="flex-none ...">
                                                <div class="flex flex-col " >
                                                    <div  v-if="formData.two_pcs_art">
                                                        <div class="font-bold text-md ml-3" v-for="data in formData.two_pcs_art" :key="data">2</div>
                                                    </div>
                                                    <div v-if="formData.one_pcs_art">
                                                        <div class="font-bold text-md  ml-3">3</div>
                                                    </div>
                                                    <div v-if="formData.four_pcs_art">
                                                        <div class="font-bold text-lg ml-3 ">4</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-none ...">
                                                <div class="flex flex-col">
                                                    <div  v-if="formData.two_pcs_art">
                                                        <div v-for="data in formData.two_pcs_art" :key="data" class="font-bold whitespace-nowrap text-md ml-[5.55px]">
                                                            {{data}}
                                                        </div>
                                                    </div>
                                                    <div v-if="formData.one_pcs_art">
                                                        <div class="font-bold whitespace-nowrap text-md ml-[5.55px]">{{formData.one_pcs_art}}</div>
                                                    </div>
                                                    <div v-if="formData.four_pcs_art">
                                                        <div class="font-bold whitespace-nowrap text-md ml-[5.55px]">{{formData.four_pcs_art}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        <div class="mt-1 mr-1 z-30">
                            <div class="space-y-1  mr-2 text-white">
                                <Flower :sessionData="sessionData"/>
                                <Plume :sessionData="sessionData"/>
                                <Sands :sessionData="sessionData"/>
                                <Goblet :sessionData="sessionData"/>
                                <Circlet :sessionData="sessionData"/>
                            </div>
                        </div>
                    </div>
                    </section>
                </div>
            </div>
            <h1 class="text-lg mt-1 p-1">Export Options :</h1>
            <div class="form-control mb-2">
                <label class="label">
                    <span class=" text-black dark:text-white">Change Avatar</span>
                </label>
                <input type="file" @change="onFileChange"/>
            </div>
            <div class="flex">
                <label class="label cursor-pointer space-x-2">
                    <span class="label-text">Hide UID</span> 
                    <input type="checkbox" checked="checked" v-model="showUid" class="checkbox" />
                </label>
                <label class="label cursor-pointer space-x-2">
                    <span class="label-text">Hide Nickname</span> 
                    <input type="checkbox" checked="checked" v-model="showNickname" class="checkbox" />
                </label>
            </div>
        <div class="flex mt-2 space-x-2">
            <button class="btn vld-parent bg-green-500 text-white hover:bg-green-400" @click.prevent="exportNewImg"><VueFeather type="image" size="24" class="mr-1" ></VueFeather> 
            <loading v-model:active="isLoading" :is-full-page="fullPage" width="24" height="24"/> Export</button>
            <button v-if="sessionData.propMap[4001]['val'] > 79" class="btn bg-red-500 hover:bg-red-400 text-white" @click="submit()"><VueFeather type="upload" size="24" class="mr-1" ></VueFeather>Store</button>
        </div>
        <div id="canvasNew" class="mt-2 mb-2"></div>
        </tab-panel>
        <tab-panel>
            <div class="form-control mb-2">
                <label class="label">
                    <span class=" text-black dark:text-white">Change Avatar</span>
                </label>
                <input type="file" @change="onFileChange"/>
            </div>
        <div class="flex flex-row card shadow-lg overflow-x-auto">
            <ul id="exportData" class="flex flex-row space-x-4 rounded-xl" :style="{ backgroundImage: 'url(' + bgElementImg() + ')',  backgroundRepeat: 'no-repeat'}">
            <li>
                <div id="potraitData" :class="!imageUrl ? 'w-[414px] h-[736px] card':'w-[414px] h-[736px] card shadow-[0px_0px_100px_14px_rgba(0,0,0,0.75)]'" >
                <figure class="draggable ">
                    <img v-if="!imageUrl" :src="`https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/${charData.avatar}.png`" >
                    <img v-else :src="imageUrl">
                </figure> 
                <div :class="!imageUrl ? 'text-white font-bold absolute ml-4 top-0 mt-1':'mix-blend-color-dodge drop-shadow-2xl font-bold absolute ml-4 top-0 mt-1'">
                    <h1 class="font-md">{{charData.name}}</h1> 
                    <span v-show="!showNickname">{{playerInfo.nickname}} </span>   
                    <pre :class="!imageUrl ? 'text-warning' : 'text-none'">Level {{sessionData.propMap[4001]['val']}}/{{(sessionData.propMap[1002]['val'] * 10) + (sessionData.propMap[1002]['val']>0?10:0) + 20}}</pre> 
                </div>
                <div class="absolute top-0 right-0 mt-1 mr-[12px]"><h1 class="font-bold" v-show="!showUid"> {{uid}}</h1></div>
                <Conste :sessionData="sessionData" :charData="charData" />
                <Talent :sessionData="sessionData" :charData="charData"/> 
                <div class="card absolute inset-x-0 bottom-0 mt-5">
                    <div v-if="!imageUrl" >
                        <section class="px-2 py-2 text-white" >
                            <Stats :sessionData="sessionData" :charData="charData" />
                        </section>
                    </div>
                    <div v-else :style="{ backgroundImage: 'url(' + bgElementImg() + ')'}">
                        <section class="px-2 pt-2 text-white" >
                            <Stats :sessionData="sessionData" :charData="charData" />
                        </section>
                    </div>
                </div>
                </div>
            </li>
            <li>
            <div class="space-y-1 mt-3 mr-2 text-white">
                <Weapon :sessionData="sessionData" :itemName="itemName"/>
                <Flower :sessionData="sessionData"/>
                <Plume :sessionData="sessionData"/>
                <Sands :sessionData="sessionData"/>
                <Goblet :sessionData="sessionData"/>
                <Circlet :sessionData="sessionData"/>
                <div  class="flex space-x-3 justify-center" >
                    <div class="flex-none ...">
                    <div class="flex flex-col">
                            <div  v-if="formData.two_pcs_art">
                                <div v-for="data in formData.two_pcs_art" :key="data" class="font-bold whitespace-nowrap text-md">
                                    {{data}}
                                </div>
                            </div>
                            <div v-if="formData.one_pcs_art">
                                <div class="font-bold whitespace-nowrap text-md mt-[12px]">{{formData.one_pcs_art}}</div>
                            </div>
                            <div v-if="formData.four_pcs_art">
                                <div class="font-bold whitespace-nowrap text-md mt-[12px]">{{formData.four_pcs_art}}</div>
                            </div>
                    </div>
                    </div>
                    <div class="flex-none ...">
                        <div class="flex flex-col " >
                            <div  v-if="formData.two_pcs_art">
                              <div v-for="data in formData.two_pcs_art" :key="data" class="font-bold text-md">
                                <div class="font-bold text-md badge">2</div>
                                </div>
                            </div>
                            <div v-if="formData.one_pcs_art">
                                <div class="font-bold text-md badge mt-[12px]">3</div>
                            </div>
                            <div v-if="formData.four_pcs_art">
                                <div class="font-bold text-md badge mt-[15px]">4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </li>
        </ul>
    </div>
    <h1 class="text-lg mt-1 p-1">Export Options :</h1>
    <div class="flex">
    <label class="label cursor-pointer space-x-2">
        <span class="label-text">Hide UID</span> 
        <input type="checkbox" checked="checked" v-model="showUid" class="checkbox" />
    </label>
    <label class="label cursor-pointer space-x-2">
        <span class="label-text">Hide Nickname</span> 
        <input type="checkbox" checked="checked" v-model="showNickname" class="checkbox" />
    </label>
    </div>
<div class="flex mt-2 space-x-2">
    <button class="btn vld-parent bg-green-500 text-white hover:bg-green-400" @click.prevent="exportImg"><VueFeather type="image" size="24" class="mr-1" ></VueFeather> 
       <loading v-model:active="isLoading" :is-full-page="fullPage" width="24" height="24"/> Export</button>
        <button v-if="sessionData.propMap[4001]['val'] > 79" class="btn bg-red-500 hover:bg-red-400 text-white" @click="submit()"><VueFeather type="upload" size="24" class="mr-1" ></VueFeather>Store</button>
</div>
       
<div id="canvas" class="mt-2 mb-2"></div>
        </tab-panel>
       
    </tab-panels>
    

</template>
<script setup >
import { useDraggable } from '@vueuse/core'
import axios from 'axios'
import { ref, onBeforeMount, watch, defineProps, reactive, computed } from 'vue';
import { EncryptStorage } from 'encrypt-storage';
import { useArrayFind, useFetch  } from '@vueuse/core'
import itemName from '/src/assets/itemName.json'
import { useRouter, useRoute } from 'vue-router'
import draggable from '@/components/loc.js';
import Equip from '@/components/uid/Equip.vue';
import Conste from '@/components/uid/Conste.vue';
import NewConste from '@/components/uid/NewConste.vue';
import Talent from '@/components/uid/Talent.vue';
import NewTalent from '@/components/uid/NewTalent.vue';
import Stats from '@/components/uid/Stats.vue';
import Weapon from '@/components/uid/Weapon.vue';
import NewWeapon from '@/components/uid/NewWeapon.vue';
import Flower from '@/components/uid/Flower.vue';
import Plume from '@/components/uid/Plume.vue';
import Sands from '@/components/uid/Sands.vue';
import Goblet from '@/components/uid/Goblet.vue';
import Circlet from '@/components/uid/Circlet.vue';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';
import TabPanels from '@/components/TabPanels.vue';
import TabPanel from '@/components/TabPanel.vue';
import domtoimage from 'dom-to-image';
import VueFeather from 'vue-feather';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

    const router = useRouter()
    const route = useRoute()
    const arrayOfArtifact = [];
    const countedOfArtifact = {};
    const arrayOfTalent = [];
    const showUid = ref(false);
    const showNickname = ref(false);
    const imageUrl = ref();
    const activeTab = ref(0);
    const toggle = ref();
    onBeforeMount(  () => {
        defineCharacterId();
        defineArtifact();
        countArrayArt();
        artifactSet();
        defineRefinement();
        defineSkill();
        defineConstellation();
        serverUID();
        arrayTalent();
        defineTalent();
    })
   
       const props = defineProps({
            uid: String,
            characters: {
                type: Array,
                default(rawProps) {
                    return JSON.parse(localStorage.getItem('characters')) || []
                }
            },
            sessionData: {
                type: Object,
                default(rawProps) {
                    const encryptStorage = new EncryptStorage(import.meta.env.VITE_SOME_KEY, {
                        storageType: 'sessionStorage',
                    });
                    return JSON.parse(JSON.stringify(encryptStorage.getItem('sessionData'))) || []
                }
            },
         charData: {
                type: Object,
                default(rawProps) {
                    const encryptStorage = new EncryptStorage(import.meta.env.VITE_SOME_KEY, {
                        storageType: 'sessionStorage',
                    });
                    return JSON.parse(JSON.stringify(encryptStorage.getItem('charData'))) || []
                }
            },
        playerInfo: {
                type: Object,
                default(rawProps) {
                     const encryptStorage = new EncryptStorage(import.meta.env.VITE_SOME_KEY, {
                        storageType: 'sessionStorage',
                    });
                    return JSON.parse(JSON.stringify(encryptStorage.getItem('playerInfo'))) || []
                }
            },
        });

        const formData = reactive({
            uid: props.uid,
            nickname: props.playerInfo.nickname,
            character_id: null,
            ascendsion: props.sessionData.propMap[1002]['val'],
            level: props.sessionData.propMap[4001]['val'],
            friendship: props.sessionData.fetterInfo.expLevel,
            conste: null,
            weapon_id: props.sessionData.equipList[5].itemId,
            refinement: null,
            four_pcs_art: null,
            two_pcs_art: [],
            one_pcs_art: null,
            equipList: props.sessionData.equipList,
            sands: props.sessionData.equipList[2].flat.reliquaryMainstat.mainPropId,
            goblet: props.sessionData.equipList[3].flat.reliquaryMainstat.mainPropId,
            circlet: props.sessionData.equipList[4].flat.reliquaryMainstat.mainPropId,
            normalAttack:null,
            elementalSkill: null,
            elementalBurst: null,
            talent: props.sessionData.skillLevelMap,
            talentExtraLv: null,
            hp: props.sessionData.fightPropMap[2000].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
            attack: props.sessionData.fightPropMap[2001].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
            defense: props.sessionData.fightPropMap[2002].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
            elementalMastery: props.sessionData.fightPropMap[28].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}),
            criticalRate: parseFloat(props.sessionData.fightPropMap[20] * 100).toFixed(1),
            criticalDamage: parseFloat(props.sessionData.fightPropMap[22] * 100).toFixed(1),
            healingBonus:parseFloat(props.sessionData.fightPropMap[26] * 100).toFixed(1),
            energyRecharge: parseFloat(props.sessionData.fightPropMap[23] * 100).toFixed(1),
            pyroDamageBonus: parseFloat(props.sessionData.fightPropMap[40] * 100).toFixed(1),
            hydroDamageBonus: parseFloat(props.sessionData.fightPropMap[42] * 100).toFixed(1),
            anemoDamageBonus: parseFloat(props.sessionData.fightPropMap[44] * 100).toFixed(1),
            electroDamageBonus: parseFloat(props.sessionData.fightPropMap[41] * 100).toFixed(1),
            dendroDamageBonus: parseFloat(props.sessionData.fightPropMap[43] * 100).toFixed(1),
            cryoDamageBonus: parseFloat(props.sessionData.fightPropMap[46] * 100).toFixed(1),
            geoDamageBonus: parseFloat(props.sessionData.fightPropMap[45] * 100).toFixed(1),
            physicalDamageBonus: parseFloat(props.sessionData.fightPropMap[30] * 100).toFixed(1),
            party_id: [],
            serverId: null,
            status: 'Core',
        });
        watch(formData.party_id, (newX) => {
            console.log(`x is ${newX}`)
        })
        function submit(){
            Swal.fire({
                title: "Are you sure ?",
                text: "Your UID will be store!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff0000",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false 
            }).then((result) => {
            if (result.value) {
                axios.post('https://akasha.genshin-tech.com/api/builds', formData)
                router.push({ name: 'showcase', params: { uid: props.uid } })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                'Cancel',
                'Data is not saved! ',
                'error'
                )
            }
            })
            

        }
        const isLoading = ref(false)
        const fullPage = ref(false)
        function exportImg(){
            isLoading.value = true
            setTimeout(() => {
                isLoading.value = false
                var node = document.getElementById("exportData");
            var node1 = document.getElementById("canvas");
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
        function exportNewImg(){
            isLoading.value = true
            setTimeout(() => {
            isLoading.value = false
            var node = document.getElementById("newLayout");
            var node1 = document.getElementById("canvasNew");
             var options = {
                quality: 0.99,
                height: node.clientHeight,
            };
            domtoimage
            .toPng(node, options)
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
            const ele = props.charData.element;
                if(ele == "Ice"){
                    return "/images/element/bgCryo.jpg"
                } else if(ele == "Rock"){
                    return "/images/element/bgGeo.jpg"
                } else if(ele == "Dendro"){
                    return "/images/element/bgDendro.jpg"
                } else if(ele == "Wind"){
                    return "/images/element/bgAnemo.jpg"
                } else if(ele == "Electric"){
                    return "/images/element/bgElectro.jpg"
                } else if(ele == "Water"){
                    return "/images/element/bgHydro.jpg"
                } else if(ele == "Fire"){
                    return "/images/element/bgPyro.jpg"
                } else {
                    return "/images/element/bgDendro.jpg"
                }
            }
    function onFileChange(e) {
            const file = e.target.files[0];
           imageUrl.value = URL.createObjectURL(file);
    }
    function defineArtifact(){
        Object.keys(props.sessionData.equipList).map((key) => {
            Object.keys(itemName.en).map((item) => {
                if(item == props.sessionData.equipList[key].flat.setNameTextMapHash){
                     arrayOfArtifact.push(itemName.en[item])
                }
            })
        })
    }
    function countArrayArt(){
        arrayOfArtifact.forEach(element => {
            countedOfArtifact[element] = (countedOfArtifact[element] || 0) + 1;
        });
    }
    function artifactSet(){
        Object.keys(countedOfArtifact).forEach((key) => {
            if(countedOfArtifact[key] == 1){
                null
            } else if(countedOfArtifact[key] < 4){
            formData.two_pcs_art.push(key);
            } else if(countedOfArtifact[key] == 4){
            formData.four_pcs_art = key;
            }
        });
    }
    function defineRefinement(){
        Object.values(props.sessionData.equipList[5].weapon.affixMap).map((item) => {
            formData.refinement = item;
        });
    }
    function arrayTalent(){
        Object.keys(props.charData.SkillOrder).map((skillKey) => {
            Object.keys(props.sessionData.skillLevelMap).map((itemKey) => {
                if(props.charData.SkillOrder[skillKey] == itemKey){
                    arrayOfTalent.push(props.sessionData.skillLevelMap[itemKey])
                }
            })
        })
        
    }
    function defineCharacterId(){
        const charId = props.charData.id;
        const depotId = props.sessionData.skillDepotId;
        if(depotId == '504'){
            return formData.character_id = 10000005
        }
        if(depotId == '504'){
            return formData.character_id = 10000005;
        } else if(depotId == '506') {
            return formData.character_id = "10000005-506";
        } else if(depotId == '507') {
            return formData.character_id = "10000005-507";
        } else if(depotId == '508') {
            return formData.character_id = "10000007-508";
        } else if(depotId == '704') {
            return formData.character_id = "10000007";
        } else if(depotId == '706') {
            return formData.character_id = "10000007-706";
        } else if(depotId == '707') {
            return formData.character_id = "10000007-707";
        } else if(depotId == '708') {
            return formData.character_id = "10000007-708";
        }  else {
            return formData.character_id = charId;
        }
    }
    function defineTalent(){
        const talent = arrayOfTalent;
        if(props.charData.skillDepotId == '201' || '504' || '506' || '507' || '508' || '704' || '706' || '707' || '708'){
            formData.normalAttack = talent[2];
            formData.elementalSkill = talent[0];
            formData.elementalBurst = talent[1];
        } else {
            formData.normalAttack = talent[0];
            formData.elementalSkill = talent[1];
            formData.elementalBurst = talent[2];
        }
        
    }
    function defineSkill(){
        if(props.sessionData.proudSkillExtraLevelMap){
            formData.talentExtraLv = props.sessionData.proudSkillExtraLevelMap;
        } else {
            null
        }
    }
    function defineConstellation(){
        const constellation = props.sessionData.talentIdList;
        if(!constellation){
            formData.conste = 0;
        } else if(constellation.length == 1){
            formData.conste = 1;
        } else if(constellation.length == 2){
            formData.conste = 2;
        } else if(constellation.length == 3){
            formData.conste = 3;
        } else if(constellation.length == 4){
            formData.conste = 4;
        } else if(constellation.length == 5){
            formData.conste = 5;
        } else if(constellation.length == 6){
            formData.conste = 6;
        }
    }
    function serverUID(){
        let x = props.uid.charAt(0);
        if(x = 8){
            formData.serverId = 'Asia'
        } else if(x = 1 || 2 || 5){
            formData.serverId = 'China'
        } else if(x = 6){
            formData.serverId = 'America'
        } else if(x = 7){
            formData.serverId = 'Europe'
        } else if(x = 9){
            formData.serverId = 'TW, HK, MO'
        }
    }
   
</script>
<style>
    .vs__dropdown-menu{
        color: white;
        background: hsl(0, 0%, 39%);
    }
    .vs__clear{
        fill: black;
    }
    .vs__open-indicator{
        fill:white;
    }
    .card.image-full {
        grid-column-start: 0  !important; 
        grid-row-start: 0;
    }
</style>