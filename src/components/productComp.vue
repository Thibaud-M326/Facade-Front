<template>
    <!-- <p>
        {{ products }}
        {{ gender }}
    </p> -->
    <div id="container">
        <div id="images-container">
            <div 
            id="images-loop"
            v-for="product of products?.products.data" 
            >
                <RouterLink 
                :to="{ name: 'product', params: { productId: product.id } }"
                >
                    <img 
                    :src="getImagePath(gender!, product.type, product.name)" 
                    alt="Image loading error"
                    />
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        products: Object,
        gender: String,
    },
    methods: {
        getImagePath(gender: String, type: string, name: string) {
            return `src/assets/Images/${gender}/${type}/${name}`;
        }
    },
}
</script>

<style scoped>
#container {
    display: flex;
    justify-content: center;
}

#images-container {
    display: flex;
    flex-wrap: wrap;
    width: 93%;
}

#images-loop {
    /* width: 48.9vw; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30vw;
    border: solid black 1px;
    margin: 2px;
    
}

img {
    height: 50vw;
    max-height: 480px;
    max-width: 480px;
    width: 100%;
    object-fit: cover;
    margin: 0;
}
</style>