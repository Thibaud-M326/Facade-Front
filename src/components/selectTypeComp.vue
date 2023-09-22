<template>
    <div
    id="buttonDiv"
    >
        <button @click="selectType(gender!, 'tshirt')">T-shirt</button>
        <button @click="selectType(gender!, 'jean')">Jeans</button>
        <button @click="selectType(gender!, 'shoes')">Shoes</button>
    </div>
</template>

<script lang="ts">

import { computed, mergeProps, ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

export default {
    props: {
        gender: String
    },
    emits: ['response'],
    created() {
        this.$emit('response', this.products)
    },
    setup(props) {
        const variables = ref({
            gender: props.gender,
            type: "tshirt"
        })

        function selectType (gender: string, type: string) {
            variables.value = {
                gender,
                type
            }
        }

        const { result } = useQuery(
        gql`
            query Products ($gender: String!, $type: String!) {
                products(gender: $gender, page: 1, type: $type) {
                    data {
                        id
                        name
                        price
                        type
                        gender
                        is_available
                        is_highlighted
                    }
                }
            }
        `, variables)

        const products = computed(() => result ?? [])

        return {
            selectType,
            variables,
            products,
        }
    }
}
</script>

<style scoped>
#buttonDiv {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid black;
}

button {
    background-color: white; 
    color: black; 
    border: 2px solid white;
    font-size: 1rem;
}
</style>