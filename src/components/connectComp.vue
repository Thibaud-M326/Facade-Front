<template>
    <button
    v-if="apolloToken"
    >
    <RouterLink to="/userAccount">Account</RouterLink>
    </button>


    <v-btn 
    v-else
    color="black" variant="text" :ripple="false">
        Connect
        <v-menu activator="parent">
            <v-sheet width="500" class="mx-auto" @click.stop>
                <v-form @submit.prevent="loginMutation()">
                    <v-text-field 
                        class="textField"
                        v-model="email" 
                        :rules="emailRules"
                        hint="required"
                        label="Email">
                    </v-text-field>
                    <v-text-field 
                        class="textField"
                        v-model="password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="showPassword ? 'text' : 'password'"
                        hint="at least 5 characters"
                        label="Password"
                        counter
                        @click:append="showPassword = !showPassword"
                        >
                    </v-text-field>
                    <v-container>
                        <p>
                            Doesn't have an account yet ?
                        </p>
                        <p>
                            <RouterLink to="/createAccount">Connect</RouterLink>
                        </p>
                        <p>
                            {{ apolloToken }}
                        </p>
                    </v-container>
                    <v-btn type="submit" block class="mt-2">Login</v-btn>
                </v-form>
            </v-sheet>
        </v-menu>
    </v-btn>

</template>

<script lang="ts">
import gql from 'graphql-tag'
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import router from '@/router'

export default {
    data: () => ({
        email: '',
        showPassword: false,
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
        ]
    }),
    props: {
        apolloToken: String,
        user: Object,
    },
    setup() {
        const email = ref('')
        const password = ref('')

        const { mutate: loginMutation, onDone } = useMutation(gql`
            mutation login ($input: LoginInput!) {
            login(input: $input) {
                    access_token
                    refresh_token
                    expires_in
                    token_type
                    user {
                    id
                    email
                    is_admin
                    created_at
                    updated_at
                    }
                }
            }
        `, () => ({
            variables: {
                input: {
                    username: email.value,
                    password: password.value
                }
            },
        }))

        onDone(result => {
            localStorage.setItem("apollo-token", result.data.login.access_token)
            localStorage.setItem("user", JSON.stringify(result.data.login.user))
            router.push({ path: "/new" })
            router.go(0)
        })

        return {
            email,
            password,
            loginMutation,
        }

    },
}
</script>

<style scoped>

a {
	font-size: 1rem;
	padding-right: 20px;
	color: black;
}

.textField {
    margin: 10px;
}

</style>