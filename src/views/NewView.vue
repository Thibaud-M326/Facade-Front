<template>
    <div id="image-container">
        <img :src="highlight1" alt="highlight 1">
        <img :src="highlight2" alt="highlight 2">
        <img :src="highlight3" alt="highlight 3">
        <img :src="highlight4" alt="highlight 4">
    </div>
</template>

<script lang="ts">
import highlight1 from '@/assets/Images/men/tshirt/Balcaca.jpeg'
import highlight2 from '@/assets/Images/women/shoes/VelgaBellna.jpeg'
import highlight3 from '@/assets/Images/men/jean/Baaci.jpeg'
import highlight4 from '@/assets/Images/men/tshirt/Balgech.jpeg'

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

</style>