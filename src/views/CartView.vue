<template>
    <div id="pageContainerDiv">
        <div id="cartContainerDiv">
            <div id="cartTitleDiv">
                <h1>
                    Cart
                </h1>
            </div>
            <!-- <p>
                {{ userCarts }}
            </p> -->
            <p v-for="product in products">
                {{ product.price }}
            </p>
            <div id="productDivs">
                <div id="productPicture">
                    <img id="productImageImg" src="../assets/Images/men/tshirt/Balcaca.jpeg" alt="">
                </div>
                <div id="productDescriptionDiv">
                    <p class="productDescriptionP">
                        TSHIRT BALCACA
                    </p>
                    <p class="productDescriptionP">
                        999.00€
                    </p>
                    <p class="productDescriptionP">
                        quantity:  + 1 -
                    </p>
                </div>
            </div>      


            <div id="totalCountDiv" >
                <div id="shippingCostDiv">
                    <p class="shippingP">
                        shippingCost
                    </p>
                    <p class="shippingP">
                        0.00€
                    </p>
                </div>
                <div id="totalCostDiv">
                    <p class="shippingP">
                        Total 
                    </p>
                    <p class="shippingP">
                        2099.00€
                    </p>
                </div>
            </div>
            <div id="toPayPageDiv"> 
                <button id="continueAndPayButton">
                    Continue and Pay (1)
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

export default {
    setup() {
        const products = ref([
            {
                price: ''
            }
        ])

        const { result } = useQuery(
        gql`
            query me {
                me {
                    carts {
                        product_id
                        quantity
                    }                           
                }
            }
        `)

        const userCarts = computed(() => result?.value?.me?.carts ?? [])

        watch(userCarts, performActionForCarts)

        async function performActionForCarts() {
            for (const cart of userCarts.value) {

                const apollo = new ApolloClient({
                    link: createHttpLink({
                        uri: 'http://localhost:8000/graphql',
                    }),
                    cache: new InMemoryCache(),
                })

                const productResult = await apollo.query({
                    query: gql`
                        query Product ($id: ID!) {
                            product(id: $id) {
                                price
                            }
                        }
                    `,
                    variables: {
                        id: cart.product_id
                    }
                })

                const productData = productResult.data.product
                
                products.value.push({
                    price: productData.price
                })
                //comment
                console.log(productResult.data.product.price)
            }
        }

        return {
            userCarts,
            products,
        }
    }
}
</script>

<style scoped>
#pageContainerDiv {
    display: flex;
    justify-content: center;
}

#cartContainerDiv {
    border: 1px solid black;
    border-top: none;
    height: 95vh;
    width: 80vw;
    overflow: auto;
}

#cartTitleDiv {
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-small;
    border-bottom: 1px solid black
}

#productDivs {
    display: flex;
    border-bottom: 1px solid black;
}

#productImageImg {
    width: 25vw;
    height: 25vh;
}

#productDescriptionDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5vh; 
    width: 100%;
}

.productDescriptionP {
    font-size: small;
    margin-bottom: 1vh;
}

#totalCountDiv {
    border-bottom: 1px solid black;
}

#shippingCostDiv {
    display: flex;
    justify-content: space-between;
}

#totalCostDiv {
    display: flex;
    justify-content: space-between;
}

.shippingP {
    margin: 2vh;
}

#toPayPageDiv {
    height: 12vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
}

#continueAndPayButton {
    background-color: black;
    color: white;
    height: 4vh;
    width: 80%;
    border-radius: 5px;
}
</style>