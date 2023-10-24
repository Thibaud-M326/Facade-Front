<template>
    <!-- <p>
        Connect view
    </p>
    <p>
        {{ me }}
        {{ error?.message }}
    </p> -->

    <div id="containerDiv">
        <div id="profileDiv">
            <v-sheet width="300" class="mx-auto">
            <h1 id="createProfileH1">
                Create a Profile
            </h1>
                <v-form @submit.prevent="createUserMutation()">
                    <v-text-field v-model="email" :rules="emailRules" label="Email"></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password"></v-text-field>
                    <v-text-field v-model="firstName" :rules="firstNameRules" label="First name"></v-text-field>
                    <v-text-field v-model="lastName" :rules="lastNameRules" label="Last name"></v-text-field>
                    <v-text-field v-model="phoneNumber" :rules="phoneRules" label="Phone Number"></v-text-field>
                    <v-btn id="btnVuetify" color="black" type="submit" block class="mt-2">Create my profile</v-btn>
                </v-form>
            </v-sheet>
        </div>
    </div>
</template>

<script lang="ts">
import gql from 'graphql-tag'
import { useMutation, useQuery, } from '@vue/apollo-composable'
import { ref } from 'vue'

export default {
    data() {
        return {

        email: '',
        emailRules: [
            value => {
                if (value) return true

                return 'Email is required'
            },
            value => {
                if (/.+@.+\..+/.test(value)) return true

                return 'Email must be valid'
            },
        ],
        password: '',
        passwordRules: [
            value => {
                if (value?.length >= 5) return true

                return 'Password must be at least 5 characters'
            }
        ],
        firstName: '',
        firstNameRules: [
            value => {
                if (value) return true

                return 'First name is required'
            }
        ],
        lastName: '',
        lastNameRules: [
            value => {
                if (value) return true

                return 'Last name is required'
            }
        ],
        phoneNumber: '',
        phoneRules: [
            value => {
                if (value?.length > 9 && /[0-9-]+/.test(value)) return true

                return 'Phone number needs to be at least 9 digits.'
            }
        ],
    
        }
    },
    setup() {
        // Crée des références pour les données
        const email = ref('')
        const password = ref('')
        const firstName = ref('')
        const lastName = ref('')
        const phoneNumber = ref('')

        // Utilise useMutation pour la mutation
        const { mutate: createUserMutation, onDone } = useMutation(gql`
            mutation createUser ($input: CreateUserInput!) {
                createUser(input: $input) {
                    id
                    email
                    first_name
                    last_name
                    phone_number
                    is_admin
                    created_at
                    updated_at
                }
            }
        `, () => ({
            variables: {
                // Exécute la mutation avec des données dynamique
                input: {
                    email: email.value,
                    password: password.value,
                    first_name: firstName.value,
                    last_name: lastName.value,
                    phone_number: phoneNumber.value
                }
            }
        }))

        onDone(result => {
            // Affiche les données dans la console
            console.log(result.data)
        })

        return {
            createUserMutation,
            email,
            password,
            firstName,
            lastName,
            phoneNumber,          
        }
    }
}
</script>

<style scoped>
#containerDiv {
    display: flex;
    justify-content: center;
}

#profileDiv {
    background-color: rgb(255, 255, 255);
    height: 95vh;
    width: 80vw;
    border-right: solid black 1px;
    border-left: solid black 1px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#createProfileH1 {
    margin-top: 10vh;
    margin-bottom: 10vh;
}

#btnVuetify {
    margin-bottom: 20vh;
}
</style>