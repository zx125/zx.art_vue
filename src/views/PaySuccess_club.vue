<template>
    <div class="pay-success">
        <Header/>
        <div class="main">
            <div class="title">
                <div class="success-tips">
                    <p class="tips">会员充值成功！</p>
                </div>
            </div>
            <div class="order-info">
                <p class="info"><b>订单号：</b><span>{{ result.out_trade_no }}</span></p>
                <p class="info"><b>交易号：</b><span>{{ result.trade_no }}</span></p>
                <p class="info"><b>付款时间：</b><span><span>{{ result.timestamp }}</span></span></p>
            </div>
            <div class="study">
                <span>欢迎加入俱乐部</span>
            </div>
        </div>
        <!--<Footer/>-->
    </div>
</template>

<script>
    import Header from "@/components/Header"
    // import Footer from "@/components/Footer"

    export default {
        name: "Success",
        data() {
            return {
                result: {},
            };
        },
        created() {
            // 判断登录状态
            let token = this.$cookies.get('token');
            if (!token) {
                this.$message({
                    message: '非法请求',
                    type: 'error',
                    onClose: () => {
                        this.$router.push('/');
                    }
                });
            }

            // url后拼接的参数
            console.log(location.search);

            localStorage.this_nav = '/';
            if (!location.search.length) return;

            // 解析支付宝回调的url参数
            let params = location.search.substring(1);
            let items = params.length ? params.split('&') : [];
            //逐个将每一项添加到args对象中
            for (let i = 0; i < items.length; i++) {
                let k_v = items[i].split('=');
                //解码操作，因为查询字符串经过编码的
                let k = decodeURIComponent(k_v[0]);
                let v = decodeURIComponent(k_v[1]);
                // let k = k_v[0];
                // let v = k_v[1];
                this.result[k] = v;
                // this.result[k_v[0]] = k_v[1];
            }
            console.log(this.result);

            // 把地址栏上面的支付结果，转发给后端
            this.$axios({
                url: this.$settings.base_url + '/club/success' + location.search,
                method: 'patch',
                headers: {
                    Authorization: `jwt ${token}`
                }
            }).then(response => {
                console.log(response.data);
            }).catch(() => {
                console.log('支付结果同步失败');
            })
        },
        components: {
            Header,
            // Footer,
        }
    }
</script>

<style scoped>

    .main {
        padding: 60px 0;
        margin: 0 auto;
        width: 1200px;
        background: #fff;
    }

    .main .title {
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding: 25px 40px;
        border-bottom: 1px solid #f2f2f2;
    }

    .main .title .success-tips {
        box-sizing: border-box;
    }

    .title img {
        vertical-align: middle;
        width: 60px;
        height: 60px;
        margin-right: 40px;
    }

    .title .success-tips {
        box-sizing: border-box;
    }

    .title .tips {
        font-size: 26px;
        color: #000;
    }

    .info span {
        color: #ec6730;
    }

    .order-info {
        padding: 25px 48px;
        padding-bottom: 15px;
        border-bottom: 1px solid #f2f2f2;
    }

    .order-info p {
        display: -ms-flexbox;
        display: flex;
        margin-bottom: 10px;
        font-size: 16px;
    }

    .order-info p b {
        font-weight: 400;
        color: #9d9d9d;
        white-space: nowrap;
    }

    .study {
        padding: 25px 40px;
    }

    .study span {
        display: block;
        width: 140px;
        height: 42px;
        text-align: center;
        line-height: 42px;
        cursor: pointer;
        background: #ffc210;
        border-radius: 6px;
        font-size: 16px;
        color: #fff;
    }
</style>
