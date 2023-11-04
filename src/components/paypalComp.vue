<template>
    <paypal-buttons
        v-if="!isPaid"
        id="paypalButtons"
    >
    </paypal-buttons>
    <div 
        v-else
        id="confirmation"
    >
        Order complete!
    </div>
    <OrderComplete 
        :isPaid="isPaid"
    />

</template>

<script lang="ts">
import OrderComplete from '../components/orderCompleteComp.vue'
import { loadScript } from '@paypal/paypal-js'
import { ref } from 'vue';

export default {
    components: {
        OrderComplete,
    },
    props: {
        userCarts: Object,
        products: Object,
        totalPrice: Number,
    },
    setup(props, { emit }) {
        const isPaid = ref(false)

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
                isPaid.value = true

                emit('isPaid', isPaid.value)
                console.log("order completed !")
            })
        }

        return {
            isPaid,
        }
    },
}
</script>

<style scoped>

</style>