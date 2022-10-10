<template>
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
</template>

<script>
import Weapon from '@/components/builds/Weapon.vue';
import Flower from '@/components/builds/Flower.vue';
import Plume from '@/components/builds/Plume.vue';
import Sands from '@/components/builds/Sands.vue';
import Goblet from '@/components/builds/Goblet.vue';
import Circlet from '@/components/builds/Circlet.vue';
export default{
    props:['build']
}
</script>