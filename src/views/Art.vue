<template>
    <div>
        <Header></Header>
        <div id="all">
            <div><p class="art_name">{{art_data.title}}</p></div>
            <div class="bo">
                <p>
                    {{art_data.content}}
                </p>
            </div>
            <el-row class="btn">
                <el-button type="primary" @click="up_art()">点赞{{art_data.up_num}}</el-button>
                <el-button type="success" @click="down_art()">点踩{{art_data.down_num}}</el-button>
            </el-row>
            <p>作者{{art_data.use_name}}</p>
            <p>创建时间{{art_data.zx_time}}</p>
            <div style="color: #122b40" class="com">
                <p class="pin_01">评论列表</p>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(pi,index) in ping_data" :key="pi.id">
                        <span>{{index+1}}楼</span>
                        <span>{{pi.zx_time}}</span>
                        <span>{{pi.user_name}}</span>
                        <span @click="hui(pi.id,pi.user_name)">回复</span>
                        <p style="color: #3e8f3e">
                            {{pi.content}}
                        </p>

                        <p v-for="zpi in pi.haha" :key="zpi.id">
                            {{zpi.user_name}}回复{{pi.user_name}}:{{zpi.content}}
                        </p>
                    </li>
                </ul>

                <span id="sp1">{{user_name}}</span>
            </div>
            <el-input type="textarea" placeholder="请输入内容" v-model="content" maxlength="30" show-word-limit>

            </el-input>
            <el-button type="danger" @click="commit">提交评论</el-button>
        </div>

    </div>

</template>

<script>
    import Header from '@/components/Header'

    export default {
        name: "Art",
        components: {
            Header
        },
        data() {
            return {
                art_id: 0,
                art_data: '',
                user_name: '',
                ping_data: [],
                content: "",
                parent: 1
            }
        },
        created() {
            this.get_id();
            this.get_data();
            this.get_ping();
        },

        methods: {
            up_art() {
                let token = this.$cookies.get('token');
                if (!token) {
                    this.$message({
                        message: "请先登录",
                        type: 'warning',
                        duration: 1000,
                    });
                    return false
                }
                this.$axios.get(`${this.$settings.base_url}/blog/up_down`, {
                    params: {
                        id: 10
                    },
                    headers: {
                        authorization: `jwt ${token}`
                    }
                }).then(response => {
                    this.art_data = response.data;

                }).catch(() => {
                    this.$message({
                        message: "点赞失败",
                    })
                })
            },
            down_art() {
                let token = this.$cookies.get('token');
                if (!token) {
                    this.$message({
                        message: "请先登录",
                        type: 'warning',
                        duration: 1000,
                    });
                    return false
                }
            },
            hui(id, name) {
                this.parent = id;
                this.user_name = name;
                console.log(id)
            },
            commit() {
                let token = this.$cookies.get('token');
                if (!token) {
                    this.$message({
                        message: "请先登录",
                        type: 'warning',
                        duration: 1000,
                    });
                    return false
                }

                this.$axios({
                    url: this.$settings.base_url + '/blog/art_comment',
                    method: 'post',
                    data: {
                        article: this.art_id,
                        parent: this.parent,
                        content: this.content
                    },
                    headers: {
                        authorization: `jwt ${token}`
                    }
                }).then(response => {
                    // console.log(response.data)
                    this.$message({
                        message: "评论成功",
                        type: 'success',
                        duration: 1000,
                    });
                    this.content = '';
                    this.get_ping();
                }).catch(error => {
                    console.log(error.response.data)
                })
            },
            get_id() {
                // 获取地址栏上面的课程ID
                this.art_id = this.$route.params.pk;

            },
            get_data() {
                this.$axios.get(`${this.$settings.base_url}/blog/art_detail/` + this.art_id).then(response => {
                    this.art_data = response.data;
                }).catch(() => {
                    this.$message({
                        message: "获取文章资料有误",
                    })
                })
            },
            get_ping() {
                this.$axios.get(`${this.$settings.base_url}/blog/art_comment`, {
                    params: {
                        article: this.art_id,
                    }
                }).then(response => {
                    this.ping_data = response.data;
                }).catch(() => {
                    this.$message({
                        message: "获取评论有误",
                    })
                })
            }
        },

    }
</script>

<style scoped>
    #sp1 {
        margin-top: 20px;
        background: red;
        display: block;
    }

    .pin_01 {
        font-family: cursive;
        background: antiquewhite;
        font-size: 25px;
        font-weight: bold;
    }

    .com {
        margin-top: 50px;
    }

    .btn {
        float: right;
    }

    .art_name {
        text-align: center;
        font-size: 35px;
        font-weight: 900;
        font-family: cursive;
        margin: 20px 0;
    }

    .up, .down {
        width: 100px;
        height: 100px;
        background: red;
    }

    #all {
        margin: 0 auto;
        width: 1200px;
        height: 1000px;
    }

</style>
