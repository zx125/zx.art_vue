<template>
    <div class="home">
        <Header/>
        <div id="all">
            <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane :label="cat.category_name" :name="cat.category_name" :qid="cat.id" v-for="cat in cats" :key="cat.id">
                    <router-link :to="'/free/detail/'" class="s_tab">五菱宏光</router-link>
                </el-tab-pane>
            </el-tabs>
        </div>


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

        },
        data() {
            return {
                activeName: 'second',
                cats:[],
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab.$attrs.qid);
            },
            get_cat() {
                this.$axios.get(`${this.$settings.base_url}/car/cat`).then(response => {
                    this.cats = response.data;
                }).catch(() => {
                    this.$message({
                        message: "获取车辆数据有误",
                    })
                })
            },
        },
        created() {
             this.get_cat();
        }

    }
</script>

<style scoped>
    .home {
        min-width: 1200px;
    }

    #all {
        margin: 50px 200px;
    }

    .s_tab {
        color: #0e0e0e;
        width: 95px;
        font-size: 19px;
        padding: 10px 20px;
        display: inline-block;
        font-family: cursive;
    }
    .s_tab:hover{
        color: crimson;
    }


</style>
