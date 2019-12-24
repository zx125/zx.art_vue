<template>
    <div>
        <Header></Header>
        <div id="all">
            <div class="img_div" style="text-align: center">
                <img :src="club_data.img_url"/>
            </div>
            <div class="base">
                <p class="p_name">{{club_data.name}}</p>
                <p class="p_s">{{club_data.brief}}</p>
                <div class="intor">
                    <p>
                        {{club_data.deta}}
                    </p>
                </div>
            </div>
            <div style="text-align: center;height: 600px">
                <p class="p_name_2">俱乐部基本信息</p>
                <div class="base_1">
                    <p>创建人:{{club_data.admin}}</p>
                    <p>人数:{{club_data.nums}}</p>
                    <p>创建日期:{{club_data.c_time}}</p>
                    <p>地址:{{club_data.province}}{{club_data.city}}{{club_data.area}}{{club_data.address}}</p>
                </div>

            </div>

            <div class="rule">
                <p class="p_name_2">入会须知</p>
                <p>{{club_data.rule}}</p>
                <span style="color: white;background: #dc0600">入会需要缴纳{{club_data.money}}RMB作为入会费用</span>
                <div class="btn">
                    <el-button type="danger" @click="buy_VIP" round>同意协议,加入俱乐部</el-button>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import Header from '@/components/Header'

    export default {
        name: "Club",
        components: {
            Header,
        },
        data() {
            return {
                club_id: 0,
                club_data:[]
            }
        },
        created() {
            this.get_id();
            this.get_data()
        },
        methods: {
            get_id() {
                // 获取地址栏上面的课程ID
                this.club_id = this.$route.params.pk;
            },
            get_data() {
                this.$axios.get(`${this.$settings.base_url}/club/detail`, {
                    params: {
                        id: this.club_id
                    }
                }).then(response => {
                    this.club_data = response.data.results;
                }).catch(() => {
                    this.$message({
                        message: "获取俱乐部资料有误",
                    })
                })
            },
            buy_VIP() {
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
                    url: this.$settings.base_url + '/club/club_order',
                    method: 'post',
                    data: {
                        club: this.club_id,
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
        }
    }


</script>

<style scoped>
    .btn {
        text-align: center;
        margin-top: 500px;
    }

    .rule {
        height: 800px;
    }

    .intor p {
        font-family: cursive;
        font-size: 18px;
    }

    .base_1 p {
        font-family: cursive;
        font-size: 21px;
        margin-bottom: 20px;
        color: #8c8c8c;
    }

    .base_1 {
        width: 460px;
        margin: 0 auto;
        height: 200px;
    }

    #all {
        margin: 0 auto;
        width: 1200px;
        height: 1000px;
    }

    .base {
        height: 600px;

    }

    .p_name {

        font-family: cursive;
        font-weight: bold;
        text-align: center;
        font-size: 62px;
        margin-bottom: 40px;
    }

    .p_name_2 {
        font-family: cursive;
        font-weight: bold;
        text-align: center;
        font-size: 38px;
        margin-bottom: 40px;
    }

    .p_s {
        margin-bottom: 80px;
        font-family: cursive;
        font-size: 20px;
    }

</style>
