<template>
    <div id="pageContainerDiv">
        <div id="cartContainerDiv">
            <div id="cartTitleDiv">
                <h1>
                    Cart
                </h1>
            </div>
            <div v-if="isEmptyCart === false">
                <div v-if="products[0].price !== ('')">
                    <div v-for="product in products" id="productDivs">
                        <div id="productPicture">
                            <img id="productImageImg" :src="getImagePath(product.gender, product.type, product.name)"
                                alt="">
                        </div>
                        <div id="productDescriptionDiv">
                            <p class="productDescriptionP" style="font-weight: bold">
                                {{ product.name.split('.')[0].toUpperCase() }}
                            </p>
                            <p class="productDescriptionP">
                                {{ parseFloat(product.price) * parseFloat(product.quantity) }}€
                            </p>
                            <p class="productDescriptionP">
                                <button class="plusOrMinusButton" @click="adjustQuantity(quantityButton[0].minus, product)">
                                    -
                                </button>
                                {{ product.quantity }}
                                <button class="plusOrMinusButton" @click="adjustQuantity(quantityButton[0].plus, product)">
                                    +
                                </button>
                            </p>
                        </div>
                        <div id="removeProductDiv">
                            <button id="removeButton" @click="removeProductFromCart(product)">
                                x
                            </button>
                        </div>
                    </div>

                    <div id="totalCountDiv">
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
                                {{ totalPrice }}€
                            </p>
                        </div>
                    </div>
                    <div id="toPayPageDiv">
                        <Paypal 
                            :userCarts="userCarts" 
                            :products="products" 
                            :totalPrice="totalPrice"
                            @isEmptyCart="(msg) => isEmptyCart = msg" 
                        />
                        <p>
                            {{ isEmptyCart || 'isEmptyCart false'}}
                        </p>
                    </div>
                </div>
                <div v-else id="emptyCart">
                    <p>
                        Your cart is empty, browse our site to find what you are looking for
                    </p>
                </div>
            </div>
            <div v-else id="orderComplete">
                <p id="thanksP">
                    Thanks for your order !
                </p>
                <p>
                    You will receive a summary email of your order shortly.
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { useMutation, useQuery, useLazyQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import Paypal from '../components/paypalComp.vue'

export default {
    components: {
        Paypal,
    },
    setup() {
        const products = ref([
            {
                id: '',
                cartId: 0,
                price: '',
                name: '',
                quantity: '',
                gender: '',
                type: '',
            }
        ])

        const quantityButton = ref([
            {
                plus: "plus",
                minus: "minus"
            }
        ])

        const totalPrice = ref(0)
        const productsToBuy = ref(0)

        //value changed with paypalComp emit
        const isEmptyCart = ref(false)

        //this request is launched every time the page is viewed
        //due to fetchPolicy.
        const { result, refetch: meRefetch } = useQuery(
            gql`
            query me {
                me {
                    id
                    carts {
                        id
                        product_id
                        quantity
                    }
                }
            }
        `, null, {
            fetchPolicy: 'network-only'
        })
        const userCarts = computed(() => result?.value?.me?.carts ?? [])
        const userID = computed(() => result?.value?.me)

        //each time the "me" request is called we call these 3 functions
        watch(userCarts, getProductsFromUserCarts)
        watch(products.value, countTotalPrice)
        watch(products.value, countProductsToBuy)

        async function getProductsFromUserCarts() {
            // Boucle pour les paniers d'utilisateurs.
            for (const cart of userCarts.value) {

                // Trouver produit existant dans produits.
                const existingProduct = products.value.find(
                    (product) => product.id == cart.product_id
                );

                // Si produit inexistant, requête GraphQL.
                if (!existingProduct) {

                    const apollo = new ApolloClient({
                        link: createHttpLink({
                            uri: 'http://localhost:8000/graphql',
                        }),
                        cache: new InMemoryCache(),
                    })

                    // Requête GraphQL pour obtenir le produit.
                    const productResult = await apollo.query({
                        query: gql`
                        query Product ($id: ID!) {
                            product(id: $id) {
                                id
                                price
                                name
                                gender
                                type
                            }
                        }
                    `,
                        variables: {
                            id: cart.product_id
                        }
                    })

                    const productData = productResult.data.product

                    // Ajouter produit à la liste de produits.
                    products.value.push({
                        id: productData.id,
                        cartId: cart.id,
                        price: productData.price,
                        name: productData.name,
                        quantity: cart.quantity,
                        gender: productData.gender,
                        type: productData.type,
                    })

                    // // Supprimer produits vides.
                    if (products.value[0].price == '') {
                        products.value.shift()
                    }
                }
            }
        }

        //find the path of a product image with its gender, type and name
        function getImagePath(gender: String, type: string, name: string) {
            return `src/assets/Images/${gender}/${type}/${name}`;
        }

        //called when click on "+" or "-" 
        //update product quantity front and in bdd call watched function l:
        function adjustQuantity(plusOrMinus: String, product: Product) {
            if (plusOrMinus == 'plus') {
                product.quantity++
            } else if (product.quantity > 1) {
                product.quantity--
            }

            updateCartProductQuantityMutation({
                input: {
                    id: product.cartId,
                    quantity: product.quantity,
                },
            })
        }

        const { mutate: updateCartProductQuantityMutation } = useMutation(gql`
            mutation updateCartProductQuantity ($input: updateCartProductQuantityInput!) {
                updateCartProductQuantity(input: $input) {
                    id
                    quantity
                }
            }
        `
        )

        function countTotalPrice() {
            totalPrice.value = 0
            for (const product of products.value) {
                totalPrice.value += product.price * product.quantity
            }
        }

        function countProductsToBuy() {
            productsToBuy.value = 0
            for (const product of products.value) {
                productsToBuy.value += parseInt(product.quantity)
            }
        }

        function removeProductFromCart(product: Product) {
            deleteCartMutation({
                input: {
                    id: product.cartId
                },
            })

            meRefetch()

            products.value = products.value.filter((producto) => producto.cartId != product.cartId)
            countProductsToBuy()
            countTotalPrice()
        }

        const { mutate: deleteCartMutation } = useMutation(gql`
            mutation deleteCart ($input: deleteCartInput!) {
                deleteCart (input: $input) {
                    id
                    user_id
                    product_id
                }
            }
        `
        )

        return {
            isEmptyCart,
            products,
            quantityButton,
            userCarts,
            getImagePath,
            adjustQuantity,
            updateCartProductQuantityMutation,
            totalPrice,
            countProductsToBuy,
            productsToBuy,
            removeProductFromCart,
            userID,
            deleteCartMutation,
        }
    },
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
    height: 87vh;
    width: 80vw;
    max-width: 1000px;
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
    height: 25vw;
    max-height: 300px;
    max-width: 300px;
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

.plusOrMinusButton {
    width: 22px;
    height: 22px;
    background-color: white;
    color: black;
    border: 1px solid black;
}

#removeProductDiv {
    width: 5vh;
    height: 5vh;
}

#removeButton {
    width: 5vh;
    height: 5vh;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
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
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid black;
}

#continueAndPayButton {
    background-color: black;
    color: white;
    height: 4vh;
    width: 80%;
    border-radius: 5px;
}

#emptyCart {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
    padding-bottom: 5vh;
    border-bottom: 1px solid black;
}

#orderComplete {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;
    color: rgb(0, 0, 0);
    font-size: large;
    font-weight: bold;
}

#thanksP {
    margin: 4vh;
}
</style>
