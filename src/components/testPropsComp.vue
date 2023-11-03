<template>
    <h1>
        enfant
    </h1>
    <h2>
        {{ msg || 'no props passed yet' }}
    </h2>
</template>

<script lang="ts">
import { defineProps } from 'vue';

export default {
    props: {
        msg: String
    },
    setup() {
        const props = defineProps({
            msg: String
        }) 

        console.log(props)

        return {
           props,
        }
    }
}
</script>