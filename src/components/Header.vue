<template>

    <div class="header">
        <!--<div class="slogan">-->
        <!--<p>老男孩IT教育 | 帮助有志向的年轻人通过努力学习获得体面的工作和生活</p>-->
        <!--</div>-->
        <div class="nav">
            <ul class="left-part">
                <span id="logo" @click="goPage('/')" :class="{active: url_path === '/free'}">ZX汽车俱乐部</span>
                <li class="ele">
                    <span @click="goPage('/shop')" :class="{active: url_path === '/shop'}">商城</span>
                </li>
                <li class="ele">
                    <span @click="goPage('/blog')" :class="{active: url_path === '/blog'}">论坛</span>
                </li>
                <li class="ele">
                    <span @click="goPage('/light-course')" :class="{active: url_path === '/light-course'}">新闻</span>
                </li>
            </ul>

            <div class="bruce flex-ct-x">
                <div class="fault-text" data-text="ZX">ZX</div>
            </div>
            <div class="right-part">
                <div v-if="!token">

                    <span class="user" @click="put_login">登录</span>
                    <span class="line">|</span>
                    <span class="user" @click="put_register">注册</span>
                </div>
                <div v-else>
                    <span class="user">{{le}}-{{ username }}</span>
                    <span class="line">|</span>
                    <span class="user" @click="logout">注销</span>
                </div>
            </div>


            <!--<form class="search">-->
            <!--<div class="tips" v-if="is_search_tip">-->
            <!--<span @click="go_search('python')">Python</span>-->
            <!--<span @click="go_search('linux')">Linux</span>-->
            <!--</div>-->
            <!--<input type="text" :placeholder="search_placeholder" @focus="on_search" @blur="off_search" v-model="word">-->
            <!--<button type="button" class="el-icon-search"  @click="go_search()"></button>-->
            <!--</form>-->
        </div>

        <Login v-if="is_login" @close="close_login" @go="put_register" @login_success="login_success"/>
        <Register v-if="is_register" @close="close_register" @go="put_login"/>
    </div>

</template>

<script>
    import Login from '@/components/Login'
    import Register from '@/components/Register'

    export default {
        name: "Header",
        data() {
            return {
                le: "",
                url_path: sessionStorage.url_path || '/',
                is_login: false,
                is_register: false,
                username: this.$cookies.get('username') || '',
                token: this.$cookies.get('token') || '',
                is_search_tip: true,
                search_placeholder: '',
                word: '',
            }
        },
        components: {
            Login,
            Register,
        },
        methods: {
            is_vip() {
                let token = this.$cookies.get('token');
                this.$axios({
                    url: this.$settings.base_url + '/user/vip',
                    method: 'get',
                    headers: {
                        Authorization: `jwt ${token}`
                    }
                }).then(response => {
                    this.le = response.data.results
                }).catch(() => {
                })
            },
            on_search() {
                this.search_placeholder = '请输入想搜索的课程';
                this.is_search_tip = false;
            },
            off_search() {
                this.search_placeholder = '';
                this.is_search_tip = true;
            },
            go_search(word) {
                if (!word) {
                    word = this.word;
                }
                let wd = this.$route.query.wd || this.$route.query.word;
                if (wd !== word) {
                    this.$router.push(`/search?wd=${word}`);
                }
                this.word = '';
            },
            goPage(url_path) {
                // 已经是当前路由就没有必要重新跳转
                if (this.url_path !== url_path) {
                    this.$router.push(url_path);
                }
                sessionStorage.url_path = url_path;
            },
            put_login() {
                this.is_login = true;
                this.is_register = false;
            },
            close_login() {
                this.is_login = false;
            },
            put_register() {
                this.is_login = false;
                this.is_register = true;
            },
            close_register() {
                this.is_register = false;
            },
            login_success() {
                this.username = this.$cookies.get('username') || '';
                this.token = this.$cookies.get('token') || '';
            },
            logout() {
                this.username = '';
                this.token = '';
                this.$cookies.remove('username');
                this.$cookies.remove('token');
            }
        },
        created() {
            this.is_vip();
            sessionStorage.url_path = this.$route.path;
            this.url_path = this.$route.path;
        }
    }
</script>

<style scoped>
    .zx {
        color: white;
        display: inline-block;
        margin-right: 20px;
    }

    #logo {
        border-bottom: 10px solid #5f5f5f;
        font-family: cursive;
        font-size: 18px;
        color: white;
        right: 444px;
        position: relative;
        display: inline-block;
    }

    .header {
        background-color: #181818;
    }

    .header:after {
        content: "";
        display: block;
        clear: both;
    }

    .slogan {
        background-color: #eee;
        height: 40px;
    }

    .slogan p {
        width: 1200px;
        margin: 0 auto;
        color: #aaa;
        font-size: 13px;
        line-height: 40px;
    }

    .nav {
        background-color: white;
        user-select: none;
        width: 1200px;
        margin: 0 auto;
    }

    .nav ul {
        padding: 15px 0;
        float: left;
    }

    .nav ul:after {
        clear: both;
        content: '';
        display: block;
    }

    .nav ul li {
        float: left;
    }

    .logo {
        margin-right: 20px;
    }

    .ele {
        margin: 0 20px;
    }

    .user {
        color: #fff;
    }

    .ele span {
        color: #fff;
        display: block;
        font: 15px/36px '微软雅黑';
        border-bottom: 2px solid transparent;
        cursor: pointer;
    }

    .ele span:hover {
        border-bottom-color: orange;
    }

    .ele span.active {
        color: orange;
        border-bottom-color: orange;
    }

    .right-part {
        float: right;
    }

    .right-part .line {
        margin: 0 10px;
    }

    .right-part span {
        line-height: 68px;
        cursor: pointer;
    }

    .search {
        float: right;
        position: relative;
        margin-top: 22px;
    }

    .search input, .search button {
        border: none;
        outline: none;
        background-color: white;
    }

    .search input {
        border-bottom: 1px solid black;
    }

    .search input:focus {
        border-bottom-color: orange;
    }

    .search input:focus + button {
        color: orange;
    }

    .search .tips {
        position: absolute;
        bottom: 3px;
        left: 0;
    }

    .search .tips span {
        border-radius: 11px;
        background-color: #eee;
        line-height: 22px;
        display: inline-block;
        padding: 0 3px;
        margin-right: 3px;
        cursor: pointer;
        color: #666;
        font-size: 14px;
    }

    .flex-ct-x {
        display: inline-block;
        float: left;
        margin-left: 238px;
    }

    .fault-text {
        background-color: #181818;
        position: relative;
        font-weight: bold;
        font-size: 46px;
        color: #fff;
    }

    .fault-text::before, .fault-text::after {
        overflow: hidden;
        position: absolute;
        top: 0;

        clip: rect(0, 900px, 0, 0);
        color: #fff;
        content: attr(data-text);
        animation: shake 3s linear infinite alternate-reverse;
    }

    .fault-text::before {
        left: -2px;
        text-shadow: 1px 0 #09f;
    }

    .fault-text::after {
        left: 2px;
        text-shadow: -1px 0 #f66;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
    }

    @-webkit-keyframes shake {
        0% {
            clip: rect(76px, 9999px, 5px, 0);
        }
        5% {
            clip: rect(54px, 9999px, 18px, 0);
        }
        10% {
            clip: rect(96px, 9999px, 92px, 0);
        }
        15% {
            clip: rect(81px, 9999px, 75px, 0);
        }
        20% {
            clip: rect(67px, 9999px, 48px, 0);
        }
        25% {
            clip: rect(33px, 9999px, 41px, 0);
        }
        30% {
            clip: rect(32px, 9999px, 27px, 0);
        }
        35% {
            clip: rect(62px, 9999px, 68px, 0);
        }
        40% {
            clip: rect(45px, 9999px, 74px, 0);
        }
        45% {
            clip: rect(3px, 9999px, 61px, 0);
        }
        50% {
            clip: rect(85px, 9999px, 3px, 0);
        }
        55% {
            clip: rect(79px, 9999px, 1px, 0);
        }
        60% {
            clip: rect(10px, 9999px, 97px, 0);
        }
        65% {
            clip: rect(27px, 9999px, 38px, 0);
        }
        70% {
            clip: rect(58px, 9999px, 1px, 0);
        }
        75% {
            clip: rect(56px, 9999px, 60px, 0);
        }
        80% {
            clip: rect(73px, 9999px, 91px, 0);
        }
        85% {
            clip: rect(70px, 9999px, 33px, 0);
        }
        90% {
            clip: rect(80px, 9999px, 59px, 0);
        }
        95% {
            clip: rect(59px, 9999px, 5px, 0);
        }
        100% {
            clip: rect(54px, 9999px, 99px, 0);
        }
    }

    @keyframes shake {
        0% {
            clip: rect(76px, 9999px, 5px, 0);
        }
        5% {
            clip: rect(54px, 9999px, 18px, 0);
        }
        10% {
            clip: rect(96px, 9999px, 92px, 0);
        }
        15% {
            clip: rect(81px, 9999px, 75px, 0);
        }
        20% {
            clip: rect(67px, 9999px, 48px, 0);
        }
        25% {
            clip: rect(33px, 9999px, 41px, 0);
        }
        30% {
            clip: rect(32px, 9999px, 27px, 0);
        }
        35% {
            clip: rect(62px, 9999px, 68px, 0);
        }
        40% {
            clip: rect(45px, 9999px, 74px, 0);
        }
        45% {
            clip: rect(3px, 9999px, 61px, 0);
        }
        50% {
            clip: rect(85px, 9999px, 3px, 0);
        }
        55% {
            clip: rect(79px, 9999px, 1px, 0);
        }
        60% {
            clip: rect(10px, 9999px, 97px, 0);
        }
        65% {
            clip: rect(27px, 9999px, 38px, 0);
        }
        70% {
            clip: rect(58px, 9999px, 1px, 0);
        }
        75% {
            clip: rect(56px, 9999px, 60px, 0);
        }
        80% {
            clip: rect(73px, 9999px, 91px, 0);
        }
        85% {
            clip: rect(70px, 9999px, 33px, 0);
        }
        90% {
            clip: rect(80px, 9999px, 59px, 0);
        }
        95% {
            clip: rect(59px, 9999px, 5px, 0);
        }
        100% {
            clip: rect(54px, 9999px, 99px, 0);
        }
    }

    .gradient-text {
        font-family: cursive;
        background-image: linear-gradient(90deg, #f66, #f90);
        background-clip: text;
        -webkit-background-clip: text;
        line-height: 60px;
        font-weight: bold;
        font-size: 50px;
        animation: hue 5s linear infinite;
        -webkit-text-fill-color: transparent;
    }

    @keyframes hue {
        from {
            filter: hue-rotate(0);
        }
        to {
            filter: hue-rotate(-1turn);
        }
    }
</style>
