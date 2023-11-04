<template>
    <h1>
        enfant
    </h1>
    <h2>
        {{ msg || 'no props passed yet' }}
    </h2>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    props: {
        msg: String
    },
    setup(props, { emit }) {

        const message = ref('coucou')

        const sendMessageToParent = (message: string) => {
            emit('response', message);
        }

        sendMessageToParent(message.value)

        return {
            sendMessageToParent
        }
    }
}
</script>