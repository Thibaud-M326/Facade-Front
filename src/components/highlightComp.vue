<template>
    <p>
        {{ products }}
    </p>
    <div v-for="product of products.products.data">
        <div v-if="product.is_highlighted">
            <img
                id="menHighlight"
                :src="getImagePath(product.type, product.name)" 
                alt="Highlight"
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

<style scoped>
#menHighlight {
    height: 20vw;
    width: 80vw;
    margin-bottom: 3vw;
    margin-left: 10vw;
    margin-right: 10vw;
    object-position: center -35vw;
}

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