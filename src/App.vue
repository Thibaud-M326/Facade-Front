<template>
  <header id="header">
    <div id="">
      <nav class="topNavbar">
        <RouterLink to="/new">New</RouterLink>
        <RouterLink to="/men">Men</RouterLink>
        <RouterLink to="/women">Woman</RouterLink>
      </nav>
    </div>

    <h1 id="facadeTitle">
      <RouterLink to="/new">FACADE</RouterLink>
    </h1>

    <div>
      <nav class="topNavbar">
        <RouterLink to="/connect">Connect</RouterLink>
        <button>
          <RouterLink to="/cart">Cart</RouterLink>
        </button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px black;
}

.topNavbar{
  margin-top: 0.55rem;
}

a {
  font-size: 1rem;
  padding-right: 20px;
  text-decoration: none;
  color: black;
}

#facadeTitle{
  font-size: 1rem;
  font-weight: bold;
}
</style>
