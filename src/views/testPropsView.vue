<template>
    <h1>
        parent
    </h1>
    <TestProps 
        :msg="greeting"
        @response="(msg) => childMsg = msg"
    />
    <h2>
        {{ childMsg }}
    </h2>
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
        const childMsg = ref('no child msg yet')

        return {
            greeting,
            childMsg,
        };
    }
}
</script>