<template>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { provideApolloClient } from "@vue/apollo-composable";
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
    props: {
        isPaid: Boolean,
        products: Object,
        totalPrice: Number,
    },
    setup(props, { emit }) {
        const order_items = ref(
            {
                totalPrice: props.totalPrice,
                products: props.products,
            }
        )
        const user = ref({
            id: ''
        }) 
        const isEmptyCart = ref(false)

        // mutation de creation de commande, enregistre les items
        // dans la table order
        const { mutate: createOrderMutation, 
                onDone: onCreateOrderDone 
            } = useMutation(gql`
            mutation createOrder ($input: createOrderInput!) {
                createOrder (input: $input) {
                    user_id
                    id
                    order_items
                    created_at
                }
            }
        `)

        // supprime les items du panier de l'utilisateur
        const { mutate: deleteUserCartsMutation, 
                onDone: onDeleteUserCartsDone 
            } = useMutation(gql`
            mutation deleteUserCarts ($input: deleteUserCartsInput!) {
                deleteUserCarts (input: $input) {
                    id
                    user_id
                    product_id
                    quantity
                }
            }
        `)

        // Requette resolue dans l'API qui effectue l'envoi d'un
        // mail recapitulatif de la commande
        const SEND_CONFIRMATION_MAIL = (gql`
            query ConfirmOrderMail ($user_id: Int!) {
                ConfirmOrderMail (user_id: $user_id) {
                    isMailSentText
                }
            }
        `)

        // lorsque isPaid passe a true on effectue la 
        // function deleteUserCarts ci dessous
        watch(() => props.isPaid, deleteUserCarts)

        const mailResult = ref('')

        async function deleteUserCarts (apolloClient: any) {
            if(props.isPaid === true) {
                // on recupere l'user du local storage
                if (user.value = JSON.parse(localStorage.getItem("user")!)) {

                    // on effectue la requette de creation de commande
                    createOrderMutation({
                        input: {
                            user_id: parseInt(user.value.id),
                            order_items: JSON.stringify(order_items.value)
                        }
                    })

                    // apres son execution on execute la requette 
                    // de suppression du panier
                    onCreateOrderDone(() => {
                        deleteUserCartsMutation({
                            input: {
                                user_id: parseInt(user.value.id)
                            },
                        })
                    })

                    // apres son execution on execute la requette
                    // d'envoi de mail resolue dans le back-end
                    onDeleteUserCartsDone(() => {
                        provideApolloClient(apolloClient)(() => {
                            const { onResult } = useQuery(
                                SEND_CONFIRMATION_MAIL,
                                () => ({
                                    user_id: parseInt(user.value.id)
                                })
                            )

                            onResult(queryResult => {
                                mailResult.value = queryResult?.data?.mail?.isMailSentText
                            })
                        })

                    })
                }

                watch(mailResult, () => {
                    console.log(mailResult.value)
                })

                // On renvoi au composant parent que le panier
                // est vide pour mettre a jour la vue du panier
                isEmptyCart.value = true
                emit('isEmptyCart', isEmptyCart.value)
            }
        }

        return {
            order_items,
        }
    }
}
</script>

<style scoped>

</style>