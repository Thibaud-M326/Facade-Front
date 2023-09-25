<template>
    <!-- <p>
        {{ products }}
        {{ gender }}
    </p> -->
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

<style>
#images-container {
    display: flex;
    flex-wrap: wrap;
}

#images-loop {
    width: 48.9vw;
    border: solid black 1px;
}

img {
    height: 50vw;
    width: 100%;
    object-fit: cover;
    margin: 0;
}
</style>