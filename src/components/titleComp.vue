<template>
    <div id="titleDiv">
        <h1 id="title">
            {{ gender?.toUpperCase() }}'S READY-TO-WEAR
        </h1>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        gender: String
    }
}
</script>

<style>
#titleDiv {
    height: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

#title {
    font-size: 0.9rem;
}
</style>
