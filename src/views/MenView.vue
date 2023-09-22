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
    watch: {
        products(products) {
            console.log(products)
        }
    },
    data() {
        return {
            gender: "men",
            products: {
                "products": {
                    "data": ""
                }
            }
        }
    }
}
</script>