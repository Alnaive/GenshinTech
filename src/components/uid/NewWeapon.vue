<template>
    <div class="card-side flex items-center space-x-4 p-2 text-white">
        <figure class="relative">
        <img class="w-24 h-24"  v-if="sessionData.equipList[5].weapon.promoteLevel > 1" :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${sessionData.equipList[5].flat.icon}_Awaken.png`" alt="" srcset="">
        <img class="w-24 h-24"  v-else :src="`https://res.cloudinary.com/genshin/image/upload/sprites/${sessionData.equipList[5].flat.icon}.png`" alt="" srcset="">
        <div v-if="sessionData.equipList[5].flat.rankLevel == 5" class="absolute inset-x-0 bottom-[-45px] flex flex-row items-center">
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
        </div>
        <div v-else-if="sessionData.equipList[5].flat.rankLevel == 4" class="absolute inset-x-0 bottom-[-45px] flex flex-row items-center">
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
        </div>
        <div v-else-if="sessionData.equipList[5].flat.rankLevel == 3" class="absolute inset-x-0 bottom-[-45px] flex flex-row items-center">
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
            <vue-feather type="star" stroke="none" fill="orange" size="20"></vue-feather>
        </div>
        </figure>
        <div class="divider divider-horizontal w-0"></div>
        <div class="flex flex-col">
            <div class="box row-span-1 col-span-2" >
                <div v-for="(item,key) in itemName.en" :key="key">
                    <div v-if="key == sessionData.equipList[5].flat.nameTextMapHash">
                        <h1 class="text-lg font-bold whitespace-nowrap">{{item}}</h1>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                    <h1>Base ATK {{sessionData.equipList[5].flat.weaponStats[0].statValue}}</h1> 
                    <h1 v-if="sessionData.equipList[5].flat.weaponStats[1].appendPropId == 'FIGHT_PROP_ATTACK_PERCENT'" >ATK {{sessionData.equipList[5].flat.weaponStats[1].statValue}}%</h1>
                    <h1 v-else-if="sessionData.equipList[5].flat.weaponStats[1].appendPropId == 'FIGHT_PROP_HP_PERCENT'" >HP {{sessionData.equipList[5].flat.weaponStats[1].statValue}}%</h1>
                    <h1 v-else-if="sessionData.equipList[5].flat.weaponStats[1].appendPropId == 'FIGHT_PROP_DEFENSE_PERCENT'" >DEF {{sessionData.equipList[5].flat.weaponStats[1].statValue}}%</h1>
                    <h1 v-else-if="sessionData.equipList[5].flat.weaponStats[1].appendPropId == 'FIGHT_PROP_CRITICAL'" >CRIT RATE {{sessionData.equipList[5].flat.weaponStats[1].statValue}}%</h1>
                    <h1 v-else-if="sessionData.equipList[5].flat.weaponStats[1].appendPropId == 'FIGHT_PROP_CRITICAL_HURT'" >CRIT DMG {{sessionData.equipList[5].flat.weaponStats[1].statValue}}%</h1>
                    <h1 v-else-if="sessionData.equipList[5].flat.weaponStats[1].appendPropId == 'FIGHT_PROP_ELEMENT_MASTERY'" >Elemental Mastery {{sessionData.equipList[5].flat.weaponStats[1].statValue}}</h1>
                    <h1 v-else-if="sessionData.equipList[5].flat.weaponStats[1].appendPropId == 'FIGHT_PROP_CHARGE_EFFICIENCY'" >Energy Recharge {{sessionData.equipList[5].flat.weaponStats[1].statValue}}%</h1>
                    <h1 v-else-if="sessionData.equipList[5].flat.weaponStats[1].appendPropId == 'FIGHT_PROP_PHYSICAL_ADD_HURT'" >Physical DMG {{sessionData.equipList[5].flat.weaponStats[1].statValue}}%</h1>
                </div>
            <div class="flex space-x-2">
                    <h1>Lv. {{sessionData.equipList[5].weapon.level}}</h1>
                    <span v-if="Object.values(sessionData.equipList[5].weapon.affixMap) == 0">R1</span>
                    <span v-else-if="Object.values(sessionData.equipList[5].weapon.affixMap) == 1">R2</span>
                    <span v-else-if="Object.values(sessionData.equipList[5].weapon.affixMap) == 2">R3</span>
                    <span v-else-if="Object.values(sessionData.equipList[5].weapon.affixMap) == 3">R4</span>
                    <span v-else-if="Object.values(sessionData.equipList[5].weapon.affixMap) == 4">R5</span>
            </div>
        </div>
    </div>
</template>
<script>
import VueFeather from 'vue-feather';

export default{
    components:{
        VueFeather,
    },
    props:['sessionData','itemName']
}
</script>