<template>
    <div id="containerDiv">
        <div id="infoDiv">
            <div id="welcomeDiv">
                <h1>
                    WELCOME, {{ user.first_name.toUpperCase() }}
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
                <button>
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
    setup() {
        const { result } = useQuery(
        gql`
            query me {
                me {
                    email
                    first_name
                    last_name
                    phone_number
                }
            }
        `)

        const user = computed(() => result.value.me ?? [])

        return {
            user,
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
</style>