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
                    <input type="button" class="main-btn" value="了解详情" @click="go_detail(club.id)"
                           style="width: 145px; height: 50px; line-height: 48px;">
                </div>
            </div>
        </div>
        <div style="text-align: center;margin-top: 80px">
            <el-pagination
                    @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next"
                    :page-size="page_size"
                    :total="course_total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "activity",
        data() {
            return {
                clubs: [],
                page: 1,//俱乐部列表
                course_total: 0,   // 当前俱乐部的总数量
                page_size:2
            }
        },
        created() {
            this.get_club();
        },
        watch: {
            "page": function () {
                this.get_club();
            },
        },
        methods: {
            get_club() {
                this.$axios.get(`${this.$settings.base_url}/club/clubs`, {
                    params:{
                        page:this.page,
                    }
                }).then(response => {
                    this.course_total = response.data.count;
                    this.clubs = response.data.results;
                }).catch(() => {
                    this.$message({
                        message: "获取课程俱乐部数据有误",
                    })
                })
            },
            go_detail(id){
                this.$router.push('/club/'+id)
                console.log(id)
            },
            handleCurrentChange(val) {
                // 页码发生变化时执行的方法
                this.page = val;
            },
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
