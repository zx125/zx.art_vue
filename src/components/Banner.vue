<template>
    <div class="banner">
        <el-carousel height="400px">
            <el-carousel-item v-for="banner in banner_list" :key="banner.title">
                <router-link :to="banner.link">
                    <img :src="banner.image" :title="banner.title"/>
                </router-link>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "Banner",
        data(){
            return{
                banner_list:[],
            }
        },
        created(){
            this.$axios.get(this.$settings.base_url+'/home/banners').then(response => {
                this.banner_list = response.data
            })
        }
    }
</script>

<style scoped>
    .banner {
        height: 400px;
    }
    .banner .img {
        height: 400px;
        background-size: auto 400px;
        background-position: center;
    }
    .banner img{
        height: 400px;
        margin-left: calc(50% - 1920px/2);
    }
    .el-carousel__item {
        min-width: 1200px;
    }


</style>
