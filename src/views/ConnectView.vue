<template>
    <p>
        Connect view
    </p>
    <p>
        {{ me }}
        {{ error?.message }}
    </p>
</template>

<script lang="ts">
import gql from 'graphql-tag'
import { computed,  } from 'vue'
import { useQuery } from '@vue/apollo-composable'

export default {
    data() {
        return {
        }
    },
    setup() {
        const { result, error } = useQuery(
        gql`
            query me {
                me {
                    id
                    email
                    first_name
                }
            }
        `
        )

        const me = computed(() => result ?? [])

        return {
            me,
            error
        }
    }
}

</script>