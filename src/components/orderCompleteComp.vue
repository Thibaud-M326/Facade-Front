<template>
    <p>
        {{ isPaid || 'isPaid is false' }}
    </p>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
    props: {
        isPaid: Boolean,
    },
    setup(props, { emit }) {

        const user = ref({
            id: ''
        }) 
        const isEmptyCart = ref(false)
        const { mutate: deleteUserCartsMutation } = useMutation(gql`
            mutation deleteUserCarts ($input: deleteUserCartsInput!) {
                deleteUserCarts (input: $input) {
                    id
                    user_id
                    product_id
                    quantity
                }
            }
        `
        )

        watch(() => props.isPaid, deleteUserCarts)

        async function deleteUserCarts () {
            if(props.isPaid === true) {
                if (user.value = JSON.parse(localStorage.getItem("user")!)) {
                    deleteUserCartsMutation({
                        input: {
                            user_id: parseInt(user.value.id)
                        },
                    })
                }

                isEmptyCart.value = true
                
                emit('isEmptyCart', isEmptyCart.value)
            }
        }

    }
}
</script>

<style scoped>

</style>