<template>
    <p>
        {{ products }}
    </p>
    <div id="images-container">
        <div 
            v-for="product of products.products.data" 
            id="images-loop"
        >
            <img 
                :src="getImagePath(product.type, product.name)" 
                alt="Image loading error"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        products: Object,
    },
    methods: {
        getImagePath(type: string, name: string) {
            return `src/assets/Images/men/${type}/${name}`;
        }
    }
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