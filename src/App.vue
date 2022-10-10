<script setup lang="ts">
    import VueFeather from 'vue-feather';
import { RouterLink, RouterView } from "vue-router";
import { useMeta } from 'vue-meta'
import Footer from './components/Footer.vue'
    const { meta } =  useMeta({
      title: 'Genshin-tech',
      description: 'Provide you a references about build character',
      htmlAttrs: {
        lang: 'en',
        amp: true
      },
    })

</script>

<template>
  <metainfo>
      <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>
    <div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-base-300">
      <div class="flex-none lg:hidden">
        <label for="my-drawer-3" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div class="flex-1 px-2 mx-2 text-xl"><router-link to="/">Genshin-tech</router-link></div>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-horizontal">
          <!-- Navbar menu content here -->
          <li><router-link to="/explore/build">  <vue-feather type="search" size="24"></vue-feather>Explore</router-link></li>
        </ul>
      </div>
    </div>
    <!-- Page content here -->
      <div class="min-h-screen  md:flex md:flex-col md:items-center">
        <div class="">
          <RouterView />
          <Footer />
        </div>
      </div>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay"></label> 
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
      <!-- Sidebar content here -->
      <li><router-link to="/explore/build">  <vue-feather type="search" size="24"></vue-feather>Explore</router-link></li>
    </ul>
    
  </div>
</div>

</template>


