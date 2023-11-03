<template>
    <paypal-buttons
        v-if="!paid"
        id="paypalButtons"
    >
    </paypal-buttons>
    <div 
        v-else
        id="confirmation"
    >
        Order complete!
    </div>

</template>

<script lang="ts">
import { loadScript } from '@paypal/paypal-js'
import { onMounted, ref, defineProps, onUpdated } from 'vue';

export default {
    props: {
        userCarts: Object,
        products: Object,
        totalPrice: Number,
    },
    setup(props) {
        const paid = ref(false)

        async function loadScriptPaypal() {
            let paypal

            try {
                paypal = await loadScript({ clientId: "AXdzw5GLKitdoxGGpf7ntCaybhO45UuJyzFeBCXvkJXZfe0g8M5lXIubiFoeBe33Fr6kWQ7GtLkb31N1" })
            } catch (error) {
                console.error("failed to load the PayPal JS SDK script", error)
            }

            if (paypal) {
                try {
                    await paypal
                    .Buttons!({
                        createOrder: createOrder,
                        onApprove: onApprove,
                    })
                    .render("#paypalButtons")
                } catch (error) {
                    console.error("failed to render the Paypal Buttons", error)
                }
            }
        }
        loadScriptPaypal()
        
        function createOrder(data: object, actions: object) {
            console.log("creating order...")
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: props.totalPrice
                        }
                    }
                ]
            })
        }

        function onApprove(data: object, actions: object) {
            console.log("order approved...")
            return actions.order.capture().then(() => {
                paid.value = true
                console.log("order completed !")
            })
        }

        return {
            paid,
        }
    },
}
</script>

<style scoped>

</style>