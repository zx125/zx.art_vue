<template>
    <div class="home">
        <Header/>
        <div id="all">
            <div class="ordering">
                <ul>
                    <li class="title">筛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选:</li>
                    <li class="default" :class="(filters.ordering=='id' || filters.ordering=='-id')?'this':''"
                        @click="filters.ordering='-id'">默认
                    </li>
                    <li class="created_time"
                        :class="filters.ordering=='created_time'?'created_time this':(filters.ordering=='-created_time'?'created_time_down this':'')"
                        @click="filters.ordering=(filters.ordering=='-created_time'?'created_time':'-created_time')">时间
                    </li>
                    <li class="up_num"
                        :class="filters.ordering=='up_num'?'up_num_up this':(filters.ordering=='-up_num'?'up_num_down this':'')"
                        @click="filters.ordering=(filters.ordering=='-up_num'?'up_num':'-up_num')">推荐
                    </li>
                    <div id="inp">
                        <el-input id="inp" v-model="input" placeholder="请输入内容"></el-input>

                    </div>
                    <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
                </ul>
            </div>
            <div id="tab">
                    <div class="tag-group">
                        <el-tag style="margin-left: 20px;margin-bottom: 10px;" v-for="tab in tabs" :key="tab.id" type="success" effect="dark">
                            {{ tab.name }}
                        </el-tag>
                    </div>
            </div>
            <div id="zx_art">
                <div class="artcle" v-for="art in arts" :key="art.id">
                    <img class="art_img" :src="art.user_ico"/>
                    <div class="img_div">
                        <router-link class="art_name" to="/">{{art.title}}</router-link>
                        <p class="art_desc">{{art.desc}}</p>
                        <span class="art_au">作者:{{art.use_name}}</span>
                        <span class="art_time">发布于:{{art.zx_time}}</span>
                        <i class="el-icon-lollipop"></i>
                        <span class="art_put">推荐:{{art.up_num}}</span>
                        <i class="el-icon-ice-cream-square"></i>
                        <span>评论:{{art.comment_num}}</span>
                    </div>
                </div>
            </div>
            <div>
                <el-col :span="12">
                    <el-menu
                            :default-active="len"
                            class="el-menu-vertical-demo"
                            @select="handleSelect"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-menu-item :index="cat.id.toString()" v-for="(cat,index) in cats" :key="cat.id">
                            <span slot="title">{{cat.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
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
                input: '',
                cats: [],
                len: "",
                tabs: [],
                arts: [],
                filters: {
                    category: '',
                    ordering: '',
                }
            };
        },
        created() {
            this.get_tabs();
            this.get_cat();
            this.get_arts();
        },
        watch: {
            "filters.ordering": function () {
                this.get_arts();
            },
        },
        methods: {
            get_tabs() {
                this.$axios.get(`${this.$settings.base_url}/blog/art_tab`).then(response => {
                    this.tabs = response.data;
                }).catch(() => {
                    this.$message({
                        message: "获取文章标签有误",
                    })
                })
            },
            search() {
                this.len = "";
                this.filters.ordering = 'id';
                this.$axios.get(`${this.$settings.base_url}/blog/art`, {
                    params: {
                        search: this.input
                    }
                }).then(response => {
                    this.arts = response.data;
                }).catch(() => {
                    this.$message({
                        message: "获取文章列表有误",
                    })
                })
            },
            handleSelect(key, keyPath) {
                if (key == parseInt(this.len) + 1) {
                    this.filters.category = ""
                }
                else {
                    this.filters.category = key
                }
                this.get_arts()
            },
            get_cat() {
                this.$axios.get(`${this.$settings.base_url}/blog/art_cat`).then(response => {
                    this.cats = response.data;
                    this.len = (this.cats.length - 1).toString()
                }).catch(() => {
                    this.$message({
                        message: "获取文章分类有误",
                    })
                })
            },
            get_arts() {
                this.$axios.get(`${this.$settings.base_url}/blog/art`, {
                    params: this.filters
                }).then(response => {
                    this.arts = response.data;
                }).catch(() => {
                    this.$message({
                        message: "获取文章列表有误",
                    })
                })
            }
        }


    }
</script>

<style scoped>

    #tab {
        width: 87%;
    }

    .art_au {
        display: inline-block;
        width: 120px;
    }

    .art_put {
        display: inline-block;
        width: 100px;
    }

    .art_time {
        display: inline-block;
        width: 190px;
    }

    .art_desc {
        height: 40px;
        margin-bottom: 8px;
        overflow: hidden
    }

    .img_div {
        float: right;
        width: 88%;
        margin-right: 100px;
        height: 90px;
        margin: 5px;
    }

    .art_name {
        display: inline-block;
        font-weight: 900;
        font-size: 16px;
        font-family: cursive;
    }

    .art_img {
        width: 90px;
        height: 90px;
        margin: 5px;
        background: aquamarine;
    }

    .artcle {
        width: 82%;
        margin-bottom: 20px;
        height: 100px;
        background: #f9f9f9;
    }

    .el-col-12 {
        width: 22%;
    }

    #zx_art {
        width: 75%;
        height: 1000px;
        float: right;
    }

    #inp {
        float: left;
        margin-bottom: 10px;
        margin-left: 750px;
    }

    .ordering::after {
        content: "";
        display: block;
        clear: both;
    }

    .ordering ul {
        float: left;
    }

    .ordering ul::after {
        content: "";
        display: block;
        clear: both;
    }

    .ordering .condition-result {
        float: right;
        font-size: 14px;
        color: #9b9b9b;
        line-height: 28px;
    }

    .ordering ul li {
        float: left;
        padding: 6px 15px;
        line-height: 16px;
        margin-left: 14px;
        position: relative;
        transition: all .3s ease;
        cursor: pointer;
        color: #4a4a4a;
    }

    .ordering .title {
        font-size: 16px;
        color: #888;
        letter-spacing: .36px;
        margin-left: 0;
        padding: 0;
        line-height: 28px;
    }

    .ordering .this {
        color: #ffc210;
    }

    .ordering .up_num {
        position: relative;
    }

    .ordering .up_num::before,
    .ordering .up_num::after {
        cursor: pointer;
        content: "";
        display: block;
        width: 0px;
        height: 0px;
        border: 5px solid transparent;
        position: absolute;
        right: 0;
    }

    .ordering .up_num::before {
        border-bottom: 5px solid #aaa;
        margin-bottom: 2px;
        top: 2px;
    }

    .ordering .up_num::after {
        border-top: 5px solid #aaa;
        bottom: 2px;
    }

    .ordering .up_num_up::before {
        border-bottom-color: #ffc210;
    }

    .ordering .up_num_down::after {
        border-top-color: #ffc210;
    }

    .ordering .created_time {
        position: relative;
    }

    .ordering .created_time::before,
    .ordering .created_time::after {
        cursor: pointer;
        content: "";
        display: block;
        width: 0px;
        height: 0px;
        border: 5px solid transparent;
        position: absolute;
        right: 0;
    }

    .ordering .created_time::before {
        border-bottom: 5px solid #aaa;
        margin-bottom: 2px;
        top: 2px;
    }

    .ordering .created_time::after {
        border-top: 5px solid #aaa;
        bottom: 2px;
    }

    .ordering .created_time_up::before {
        border-bottom-color: #ffc210;
    }

    .ordering .created_time_down::after {
        border-top-color: #ffc210;
    }

    #header {
        width: 100%;
        height: 200px;
        background: red;
    }

    #all {
        margin: 50px 200px;

    }

    #hah {
        width: 1200px;

    }

    #header ul {
        padding: 15px 0;
        float: left;
    }

    #header ul:after {
        clear: both;
        content: '';
        display: block;
    }

    #header ul li {
        float: left;
    }

    .home {
        min-width: 1200px;

    }


</style>
