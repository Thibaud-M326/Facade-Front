<template>
    <h1>
        parent
    </h1>
    <TestProps :msg="greeting"/>
</template>

<script lang="ts">
import { ref } from 'vue'
import TestProps from '../components/testPropsComp.vue'

export default {
	components: {
		TestProps,
	},
    setup() {
        const greeting = ref('hello from parent')        

        return {
           greeting, 
        }
    }
}
</script>