<template>
    <!-- <p>
        {{ product.description }}
    </p> -->
    <div id="containerDiv">
        <div id="imgDiv">
            <img 
            :src="getImagePath(product.gender, product.type, product.name)" 
            alt="Image loading error"
            />
        </div>
        <div id="productDiv">
            <div id="productInfoDiv">
                <h1 id="descriptionH1">
                    {{ product.gender.toUpperCase() }}          
                    {{ product.name.split('.')[0].toUpperCase() }}            
                </h1>
                <p>
                    {{ product.price }} €
                </p>
                <p id="descriptionP">
                    {{ product.description }}
                </p>
                <hr>
                <button id="addToCartButton">
                    Add to cart
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from "vue-router";
import gql from 'graphql-tag'

export default {
    name: 'ProductView',
    methods: {
        getImagePath(gender: String, type: string, name: string) {
            console.log(gender)
            console.log(type)
            console.log(name)
            return `../src/assets/Images/${gender}/${type}/${name}`;
        }
    },
    setup() {
        const route = useRoute()

        const variables = ref({
            id: route.params.productId,
        })

        const { result } = useQuery(
        gql`
            query Product ($id: ID!) {
                product(id: $id) {
                    id
                    name
                    price
                    type
                    size
                    gender
                    description
                    is_available
                }
            }
        `, variables)        

        const product = computed(() => result.value.product ?? [])

        // console.log(product.value)

        return {
            product,
        }
    }
}
</script>

<style>
#containerDiv {
    display: flex;
    width: 100%;
    height: 94vh;
}

#imgDiv {
    height: 100%;
    width: 50%;
    border-right: solid 1px black;
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    width: 95%;
    height: 95%;
    object-fit: contain;
}

#productDiv {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
}

#productInfoDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
}

#descriptionH1 {
    text-align: center;
}

#descriptionP {
    text-align: center;
}

hr {
    width: 99%;
    margin-bottom: 15px;
}

#addToCartButton {
    background-color: black;
    color: white;
    width: 100%;
    height: 2.5rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

@media only screen and (max-width: 900px) {
    #containerDiv {
        display: flex;
        flex-direction: column;
    }

    #imgDiv {
        width: 100%;
        border-right: none;
        border-bottom: 1px black solid;
    }
    
    #productDiv {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

}
</style>