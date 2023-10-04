<template>
    <!-- <p>
        {{ product.description }}
    </p> -->
    <!-- <p>
        {{ product }}
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
                    {{ product?.gender?.toUpperCase() }}          
                    {{ product?.name?.split('.')[0].toUpperCase() }}            
                </h1>
                <p>
                    {{ product.price }} €
                </p>
                <p id="descriptionP">
                    {{ product.description }}
                </p>
                <hr>
                <button 
                id="addToCartButton"
                @click="addToCart()"
                >
                    Add to cart
                    ({{ existingProduct.quantity }})
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from "vue-router";
import { useQuery, useMutation } from '@vue/apollo-composable'
import { watch } from 'vue'
import gql from 'graphql-tag'

export default {
    name: 'ProductView',
    methods: {
        getImagePath(gender: String, type: string, name: string) {
            return `../src/assets/Images/${gender}/${type}/${name}`;
        }
    },
    setup() {
        const existingProduct = ref({
            quantity: 0,
        })
        const user = ref({
            id: ''
        })
        const route = useRoute()
        if (localStorage.getItem("apollo-token")) {
            user.value = JSON.parse(localStorage.getItem("user")!)
        }
        const variables = ref({
            id: route.params.productId,
        })
        const productCartQuantity = ref(0)
        const productCartId = ref(0)

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

        const product = computed(() => result?.value?.product ?? [])

        const { result: cartsResult, refetch: cartsRefetch } = useQuery(gql`
            query cartsQuery {
                carts(first: 10, user_id: 1) {
                    data {
                        id
                        user_id
                        product_id
                        quantity
                    }
                }
            }
        `)

        const userCarts = computed(() => cartsResult?.value?.carts ?? [])

        watch(userCarts, setExistingProduct)
 
        cartsRefetch()

        function addToCart() {
            const productID = product.value.id;
            const cartWithProduct = userCarts.value.data.find((cart) => cart.product_id == productID);

            if (cartWithProduct) {
                console.log("Le produit existe dans le panier. Une quantitée ajouté");

                productCartId.value = parseInt(cartWithProduct.id)

                productCartQuantity.value = cartWithProduct.quantity
                productCartQuantity.value++

                updateCartProductQuantityMutation({
                    input: {
                        id:  productCartId.value,
                        quantity: productCartQuantity.value,
                    },
                })
                cartsRefetch()
            } else {
                console.log("Le produit n'existe pas dans le panier. Un produit ajouté");

                const userId = parseInt(user.value.id)
                const productId = parseInt(product.value.id)

                addOneProductToCartMutation({
                    input: {
                        user_id: userId,
                        product_id: productId,
                        quantity: 1,
                    }
                })
                cartsRefetch()
            }
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

        const { mutate: addOneProductToCartMutation } = useMutation(gql`
            mutation addOneProductToCart ($input: addOneProductToCartInput!) {
                addOneProductToCart (input: $input) {
                    id
                    user_id
                    product_id
                    quantity                 
                }
            }
        `
        )

        function setExistingProduct() {
            existingProduct.value = userCarts.value.data.find((cart) => cart.product_id == product.value.id);
        }

        return {
            setExistingProduct,
            existingProduct,
            addToCart,
            product,
            userCarts,
            user,
        }
    }
}
</script>

<style>
#containerDiv {
    display: flex;
    width: 100%;
    height: 94vh;
    border-bottom: 1px solid black;
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