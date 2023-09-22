<template>
    <SelectType
        :gender="gender"
        @response="(msg: any) => products = msg"
    />
    <Title
        :gender="gender" 
    />
    <Highlight
        :products="products" 
    />
    <Products
        :products="products"
        :gender="gender"
    />
</template>

<script lang="ts">
import SelectType from '../components/selectTypeComp.vue'
import Title from '../components/titleComp.vue'
import Highlight from '../components/highlightComp.vue'
import Products from '../components/productComp.vue'

export default {
    components: {
        SelectType,
        Title,
        Highlight,
        Products,
    },
    props: {
        gender: String,
    },
    data() {
        return {
            gender: "women",
            products: {
                "products": {
                    "data": ""
                }
            }
        }
    }
}
</script>

<style scoped>

#MenTitleDiv {
    height: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

#MenTitle {
    font-size: 0.9rem;
}

#menShowOff {
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