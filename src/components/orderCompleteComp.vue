<template>
    <p>
        {{ isPaid || 'isPaidIsFalse' }}
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
    setup(props) {

        const user = ref({
            id: ''
        }) 
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
            }
        }

    }
}
</script>

<style scoped>

</style>