<template>
    <paypal-buttons
     id="paypalButtons"
    >
    </paypal-buttons>
</template>

<script lang="ts">
import { loadScript } from '@paypal/paypal-js'
import { onMounted, ref } from 'vue';

export default {
    setup() {
        async function loadScriptPaypal() {
            let paypal

            try {
                paypal = await loadScript({ clientId: "AXdzw5GLKitdoxGGpf7ntCaybhO45UuJyzFeBCXvkJXZfe0g8M5lXIubiFoeBe33Fr6kWQ7GtLkb31N1" })
            } catch (error) {
                console.error("failed to load the PayPal JS SDK script", error)
            }

            if (paypal) {
                try {
                    await paypal.Buttons!().render("#paypalButtons")
                } catch (error) {
                    console.error("failed to render the Paypal Buttons", error)
                }
            }
        }

        loadScriptPaypal()
    },
}
</script>