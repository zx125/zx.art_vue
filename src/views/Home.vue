<template>
    <div class="home">
        <Header />
        <Banner />
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Banner from '@/components/Banner'

    export default {
        name: 'home',
        components: {
            Header,
            Banner,
        },
        created() {

        }

    }
</script>

<style scoped>
    .home {
        min-width: 1200px;

    }



</style>
