<template>
    <p>
        <!-- {{ isPaid || 'isPaid is false' }} -->
        <!-- {{ products }} -->
        <!-- {{ totalPrice }} -->
        <!-- {{ order_items }} -->
        <!-- {{ mail }} -->
    </p>
</template>

<script lang="ts">
import { ref, watch, computed } from 'vue';
import { useMutation, useQuery, useLazyQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { provideApolloClient } from "@vue/apollo-composable";

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

        const SEND_CONFIRMATION_MAIL = (gql`
            query ConfirmOrderMail ($user_id: Int!) {
                ConfirmOrderMail (user_id: $user_id) {
                    isMailSentText
                }
            }
        `)

        watch(() => props.isPaid, deleteUserCarts)

        const mailResult = ref('')

        async function deleteUserCarts (apolloClient: any) {
            
            if(props.isPaid === true) {
                if (user.value = JSON.parse(localStorage.getItem("user")!)) {

                    createOrderMutation({
                        input: {
                            user_id: parseInt(user.value.id),
                            order_items: JSON.stringify(order_items.value)
                        }
                    })

                    onCreateOrderDone(() => {
                        deleteUserCartsMutation({
                            input: {
                                user_id: parseInt(user.value.id)
                            },
                        })
                    })

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

                //+ ondone, isEmptyCartValue = true, emit is Emty Cart
                //+ createOrder for current user in bdd
                //+ send ConfirmOrder Mail
                //+ emit emailSent, after this we can change CartView.vue 
                // to display 'thanks an mail was sent to your inbox'

                //send to parent, the cart is now empty
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