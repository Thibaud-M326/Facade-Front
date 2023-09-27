<template>
	<header id="header">
		<div id="">
			<nav class="topNavbar">
				<RouterLink to="/new">New</RouterLink>
				<RouterLink to="/men">Men</RouterLink>
				<RouterLink to="/women">Woman</RouterLink>
			</nav>
		</div>

		<h1 id="facadeTitle">
			<RouterLink to="/new">FACADE</RouterLink>
		</h1>

		<div>
			<nav class="topNavbar">

				<Connect 
				:apolloToken="apolloToken"
				:user="user"
				/>

				<button>
					<RouterLink to="/cart">Cart</RouterLink>
				</button>
			</nav>
		</div>
	</header>
	<RouterView />

	<!-- <p>
		{{ apolloToken }}
		{{ user }}
	</p> -->


</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import Connect from '../src/components/connectComp.vue'

export default {
	data() {
		return {
			apolloToken: '',
			user: {
				email: '',
				id: '',
				is_admin: '',
			},
		}
	},
	methods: {
		updateTokenAndUser() {
			if (localStorage.getItem("apollo-token")) {
				this.apolloToken = localStorage.getItem("apollo-token")!
				this.user = JSON.parse(localStorage.getItem("user")!)
			}
		},
	},
	mounted() {
		this.updateTokenAndUser()
	},
	components: {
		Connect,
	},
}
</script>

<style scoped>
#header {
	display: flex;
	justify-content: space-between;
	border-bottom: solid 1px black;
}

.topNavbar {
	margin-top: 0.55rem;
}

a {
	font-size: 1rem;
	padding-right: 20px;
	text-decoration: none;
	color: black;
	padding-left: 10px;
}

#facadeTitle {
	font-size: 1rem;
	font-weight: bold;
	padding-right: 20px;
	margin-top: 10px;
	margin-bottom: 9px;
}

#connectRouter {
	margin-left: 0px;
}
</style>
