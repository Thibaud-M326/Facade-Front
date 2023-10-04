<template>
    <!-- <p>
        {{ products }}
        {{ gender }}
    </p> -->
    <div v-for="product of products?.products.data">
        <div v-if="product.is_highlighted">
            <img
                id="menHighlight"
                :src="getImagePath(gender!, product.type, product.name)" 
                alt="Highlight"
            />
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
    }
}
</script>

<style scoped>
#menHighlight {
    height: 10vw;
    width: 60vw;
    margin-bottom: 2vw;
    margin-left: 20vw;
    margin-right: 20vw;
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