<template>
    <div>
        <div v-for="club in clubs" :key="club.name" class="haha">
            <div class="act">
                <img class="act_a" :src="club.img_url">
                <div class="act_b">
                    <p id="act_name">{{club.name}}</p>
                    <p class="act_qt">地址:{{club.province}}{{club.city}}-{{club.area}}-{{club.address}}</p>
                    <p class="act_qt">人数：{{club.nums}}</p>
                    <p class="act_body">{{club.brief}}</p>
                    <input type="button" class="main-btn" value="了解详情"
                           style="width: 145px; height: 50px; line-height: 48px;">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "activity",
        data() {
            return {
                clubs: []//俱乐部列表
            }
        },
        created() {
            this.get_club();
        },
        methods: {
            get_club() {
                this.$axios.get(`${this.$settings.base_url}/club/clubs`).then(response => {
                    this.clubs = response.data;
                }).catch(() => {
                    this.$message({
                        message: "获取课程俱乐部数据有误",
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .haha {
        margin-top: 100px;
    }

    .act {
        width: 1300px;
        height: 400px;

        margin: 0 auto;
    }

    .act_a {
        float: left;
        height: 400px;
        width: 600px;
    }

    .act_b {
        float: right;
        height: 400px;
        width: 600px;
    }

    p {
        padding: 15px 60px;
    }

    #act_name {
        margin-top: 20px;
        padding: 25px 60px;
        font-weight: bold;
        font-family: cursive;
        font-size: 40px;
    }

    .act_qt {
        font-size: 20px;
        font-family: cursive;
        color: #6f6d6d;
    }

    .act_body {
        text-indent: 2em;
        font-family: cursive;
    }

    .main-btn {
        float: right;
        border: 1px solid #e1e1e1;
        border-radius: 4px;
        font-size: 12px;
        color: #646464;
        background-color: #f9f9f9;
        background-image: linear-gradient(180deg, #fff, #f9f9f9);
    }
</style>
