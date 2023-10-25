<template>
    <div id="containerDiv">
        <div id="infoDiv">
            <div id="welcomeDiv">
                <h1>
                    WELCOME, {{ user?.first_name?.toUpperCase() }}
                </h1>
            </div>
            <div id="personalInfosDiv">
                <h2 id="personalInfosH2">
                    PERSONAL INFOS
                </h2>
                <p class="infosTitle">
                    First Name
                </p>
                <p class="infos">
                    {{ user.first_name }}
                </p>
                <p class="infosTitle">
                    Last Name
                </p>
                <p class="infos">
                    {{ user.last_name }}
                </p>
                <p class="infosTitle">
                    E-mail address
                </p>
                <p class="infos">
                    {{ user.email }}
                </p> 
                <button
                id="logoutButton"
                @click="logout"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import router from '@/router'

export default {
    setup() {

        const pageReloaded = ref(false);

        const { result } = useQuery(
        gql`
            query me {
                me {
                    id
                    email
                    first_name
                    last_name
                    phone_number
                }
            }
        `)

        const user = computed(() => result?.value?.me ?? [])

        function logout() {
            logoutMutation()
        }

        const { mutate: logoutMutation, onDone } = useMutation(gql`
            mutation logout {
                  logout {
                    message
                    status
                }
            }
        `
        )

        onDone(result => {
            localStorage.removeItem("apollo-token")
            localStorage.removeItem("user")

            router.push({ path: "/new" })
            router.afterEach((to, from) => {
            if (to.path === '/new' && !pageReloaded.value) {
                pageReloaded.value = true; // Marquez que la page a été rechargée
                window.location.reload(); // Rechargez la page
            }
            });
        })

        return {
            user,
            logout,
            logoutMutation,
        }
    }
}
</script>

<style scoped>
#containerDiv {
    display: flex;
    justify-content: center;
}

#infoDiv {
    border: 1px solid black;
    border-top: none;
    height: 94vh;
    width: 60vw;
}

#welcomeDiv {
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
    font-size: small;
}

#personalInfosDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: small;
}

#personalInfosH2 {
    margin: 5vh
}

.infosTitle {
    font-weight: bold;
    color: rgb(87, 87, 87);
    margin-bottom: 1vh;
}

.infos {
    margin-bottom: 5vh;
}

#logoutButton {
    width: 6vw;
    height: 2vw;
    min-width: 60px;
    min-height: 30px;
    border: 1px black solid;
    border-radius: 3px;
}
</style>