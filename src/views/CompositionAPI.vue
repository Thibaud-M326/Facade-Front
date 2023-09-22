<template>
    <h1>
        this is a page with Composition API
    </h1>
    <CompositionAPI :msg="composition"/>
    <p>
        {{ users }}
    </p>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import CompositionAPI from "../components/CompositionAPI.vue"
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const composition = ref('Composition API')

const ALL_USER = gql`
    query AllUsers {
        users {
            data {
                email
                name
                id
            }
        }
    }
`;

const { result } = useQuery(ALL_USER)
const users = computed(() => result.value?.AllUsers ?? [])

watchEffect(() => {
    console.log(users)
})

</script>
