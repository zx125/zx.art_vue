<template>
    <div class="home">
        <Header/>
        <div id="all">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="cat.category_name" :name="cat.category_name" :qid="cat.id" v-for="cat in cats"
                             :key="cat.id">
                    <router-link :to="'/free/detail/'" class="s_tab" v-for="car in cat_data" :key="car.id">
                        {{car.name}}
                    </router-link>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div id="all2">
            <el-row>
                <el-col :span="12">
                    <div :span="12">
                        <el-carousel height="400px" direction="vertical" :autoplay="true">
                            <el-carousel-item v-for="banner in banner_list" :key="banner.id">
                                <router-link :to="'/'">
                                    <img :src="banner.ima_url"/>
                                </router-link>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-col>
                <el-col :span="12" style="height: 400px">
                    <img class="it_car">
                    <img class="it_car">
                    <img class="it_car">
                    <img class="it_car">
                </el-col>
            </el-row>
        </div>
        <div id="all3">
            <div class="car_ls">

            </div>
            <div class="car_st" v-for="car in cat_data" :key="car.id">
                <img class="car_img" :src="car.ima_url">
                <div class="car_mes">
                    <p class="car_name">{{car.name}}</p><span class="car_brand">品牌：{{car.brand}}</span>
                    <p class="car_price">价格:<span class="car_ps">{{car.price}}万</span></p>
                    <p class="car_type">车型:{{car.car_type}}</p>
                    <el-row>
                        <el-button type="success">查看详情</el-button>
                        <el-button type="danger" @click="buy_car(car.id)">立即购买</el-button>
                    </el-row>

                </div>
            </div>

        </div>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    import Header from '@/components/Header'

    export default {
        name: 'shop',
        components: {
            Header,

        },
        data() {
            return {
                activeName: '热门车型',
                cats: [],
                cat_data: [],
                banner_list: [],
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab.$attrs.qid);
                this.$axios.get(`${this.$settings.base_url}/car/cat_data`, {
                    params: {
                        qid: tab.$attrs.qid
                    }
                }).then(response => {
                    this.cat_data = response.data.results;
                }).catch(() => {
                    this.$message({
                        message: "获取车辆数据有误",
                    })
                })
            },
            get_cat() {
                this.$axios.get(`${this.$settings.base_url}/car/cat`).then(response => {
                    this.cats = response.data;
                }).catch(() => {
                    this.$message({
                        message: "获取车辆分类有误",
                    })
                })
            },
            get_banner() {
                this.$axios.get(this.$settings.base_url + '/car/cat_banner').then(response => {
                    this.banner_list = response.data
                })
            },
            buy_car(id) {
                let token = this.$cookies.get('token');
                if (!token) {
                    this.$message({
                        message: "请先登录",
                        type: 'warning',
                        duration: 1000,
                    });
                    return false
                }
                // 已登录
                this.$axios({
                    url: this.$settings.base_url + '/car/car_order',
                    method: 'post',
                    data: {
                        car: id,
                    },
                    headers: {
                        authorization: `jwt ${token}`
                    }
                }).then(response => {
                    // console.log(response.data)
                    let pay_url = response.data;
                    window.open(pay_url, '_self');
                }).catch(error => {
                    console.log(error.response.data)
                })
            }
        },
        created() {
            this.get_cat();
            this.get_banner();
        }
    }
</script>

<style scoped>
    .car_name {
        margin-top: 28px;
        margin-left: 80px;
        margin-bottom: 20px;
        font-family: cursive;
        font-size: 30px;
        font-weight: bold;
        color: #000000;
    }

    .el-button--success {
        margin-left: 80px;
        color: #FFF;
        background-color: #67C23A;
        border-color: #67C23A;
        margin-top: 18px;
    }

    .car_type {
        font-size: 28px;
        margin-left: 80px;
        font-family: cursive;
        margin-top: 20px;
    }

    .car_ps {
        margin-left: 24px;
        font-size: 40px;
        color: red;
        font-family: fantasy;
    }

    .car_price {
        font-family: cursive;
        margin-top: 30px;
        margin-left: 80px;
        font-size: 28px;
    }

    .car_brand {
        font-family: cursive;
        margin-left: 80px;
        padding: 5px;
        color: white;
        background: #2f2f2f;
    }

    .car_img {
        float: left;
        width: 50%;
        height: 100%;
    }

    .car_mes {
        background: #f9f9f9;
        float: right;
        width: 50%;
        height: 100%;
    }

    .car_st {
        margin-top: 20px;
        height: 300px;
        width: 70%;
    }

    .car_ls {
        height: 1000px;
        width: 25%;
        float: right;
        background: aqua;
    }

    .it_car {
        float: left;
        height: 50%;
        width: 50%;
        background: red;

    }

    .home {
        min-width: 1200px;
    }

    #all, #all2, #all3 {
        margin: 50px 200px;
    }

    #all {
        height: 200px;
    }

    .s_tab {
        color: #0e0e0e;
        width: 95px;
        font-size: 19px;
        padding: 10px 20px;
        display: inline-block;
        font-family: cursive;
    }

    .s_tab:hover {
        color: crimson;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 400px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }


</style>
