<template>
    <div class="home">
        <Header />
        <Banner />

        <Activity />
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Banner from '@/components/Banner'
    import Activity from '@/components/Activity'

    export default {
        name: 'home',
        components: {
            Header,
            Banner,
            Activity,
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
