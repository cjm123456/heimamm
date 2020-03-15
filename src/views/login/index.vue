<template>
    <div class="login">
        <div class="leftbox">
            <div class="title">
                <img src="../../assets/login_logo.png" class="titleLogo" alt="">
                <span class="titleName">黑马面面</span>
                <span class="titleLine"></span>
                <span class="titleLogin">用户登录</span>
            </div>
        </div>
        <img src="../../assets/login_banner_ele.png" class="rightimg" alt="">
    </div>
</template>
<script>
    export default {};
</script>
<style lang="less">
    .login {
        height: 100%;
        background: linear-gradient(
            225deg,
            rgba(1, 198, 250, 1),
            rgba(20, 147, 250, 1)
        );
        display: flex;
        // space-around 左右两边的间距相等
        justify-content: space-around;
        align-items: center;

        .leftbox {
            width: 478px;
            height: 550px;
            background: rgba(245, 245, 245, 1);
            padding: 48px 42px 86px;
            // 内减模型
            box-sizing: border-box;

            .title {
                display: flex;
                align-items: center;

                .titleName {
                    font-size: 24px;
                    font-family: SourceHanSansCN;
                    font-weight: 400;
                    color: rgba(12, 12, 12, 1);
                    margin-left: 16px;
                }

                .titleLine {
                    width: 1px;
                    height: 28px;
                    background: rgba(199, 199, 199, 1);
                    margin: 0 14px;
                }

                .titleLogin {
                    font-size: 22px;
                    font-family: PingFangSC;
                    font-weight: 400;
                    color: rgba(12, 12, 12, 1);
                }
            }
        }

        .rightimg {
            width: 633px;
            height: 435px;
        }
    }
</style>