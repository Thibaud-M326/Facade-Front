<template>
    <div id="image-container">
      <div>
        <img :src="highlight1" alt="highlight 1">
          <RouterLink 
          :to="{ name: 'product', params: { productId: 13 } }"
          >
            <div class="showRoomDiv">
            <button
            class="showRoomButton"
            >
              SHOP NOW
            </button>
            </div>
          </RouterLink>
      </div>

      <div>
        <img :src="highlight2" alt="highlight 2">
          <RouterLink 
          :to="{ name: 'women' }"
          >
            <div class="showRoomDiv">
            <button
            class="showRoomButton"
            >
              WOMEN COLLECTION
            </button>
            </div>
          </RouterLink>
      </div>

      <div>
        <img :src="highlight3" alt="highlight 3">
          <RouterLink 
          :to="{ name: 'product', params: { productId: 1 } }"
          >
            <div class="showRoomDiv">
            <button
            class="showRoomButton"
            >
              SHOP NOW
            </button>
            </div>
          </RouterLink>
      </div>

      <div>
        <img :src="highlight4" alt="highlight 4">
          <RouterLink 
          :to="{ name: 'men' }"
          >
            <div class="showRoomDiv">
            <button
            class="showRoomButton"
            >
              MEN TSHIRTS
            </button>
            </div>
          </RouterLink>
      </div>
    </div>
</template>

<script lang="ts">
import highlight1 from '@/assets/Images/men/tshirt/Balcaca.jpeg'
import highlight2 from '@/assets/Images/women/shoes/VelgaBellna.jpeg'
import highlight3 from '@/assets/Images/men/jean/Baaci.jpeg'
import highlight4 from '@/assets/Images/men/tshirt/Balgech.jpeg'
import router from '@/router'

export default {
  data() {
    return {
      highlight1: highlight1,
      highlight2: highlight2,
      highlight3: highlight3,
      highlight4: highlight4,
    };
  },
};
</script>

<style scoped>
#image-container {
    display: flex;
    flex-direction: column;
    margin: 0;
}

img {
    height: 75vh;
    width: 99vw;
    object-fit: cover;
    margin: 0;
}

.showRoomDiv {
    position: relative;  
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.showRoomButton {
    position: absolute;
    z-index: 1;
    bottom: 0;
    margin-bottom: 40px;
    background-color: rgb(255, 255, 255);
    color: black;
    padding: 1vh 3vh;
    font-size: max(1vh, 0.7vw);
    border-radius: 10px;
    border: 1px solid black;
}

</style>