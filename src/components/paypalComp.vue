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
        :products="products"
        :totalPrice="totalPrice"
        @isEmptyCart="(msg) => isEmptyCart = msg" 
    />
</template>

<script lang="ts">
import OrderComplete from '../components/orderCompleteComp.vue'
import { loadScript } from '@paypal/paypal-js'
import { watch } from 'vue';
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
        const isEmptyCart = ref(false)

        // charge le bouton paypal dans l'id paypalButtons 
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
 
        // envoi le montant total a l'API Paypal
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

        // A la confirmation de l'utilisateur, effectue le transfert monetaire
        // fait passer la valeur isPaid à True 
        function onApprove(data: object, actions: object) {
            console.log("order approved...")
            return actions.order.capture().then(() => {
                isPaid.value = true

                console.log("order completed !")
            })
        }

        watch(isEmptyCart, () => {
            emit('isEmptyCart', isEmptyCart.value)
        })

        return {
            isPaid,
            isEmptyCart,
        }
    },
}
</script>

<style scoped>

</style>