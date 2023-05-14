<template>
    <div class="full-screen-box">
        <div class="step-box" v-if="stepsCount===0">
            <div class="box-main-title">请选择要从此账户里要取出的金额</div>

            <template v-if="userInfo.money > 0">
                <div class="control-list">
                    <template v-for="(item,index) in controlList" :key="index">
                        <div class="item"  @click="confirmExercise"
                             v-if="item<userInfo.money" :data-value="item">${{item}}</div>
                    </template>
                    <div class="item" @click="confirmExercise" :data-value="userInfo.money">${{userInfo.money}}</div>
                </div>
            </template>
            <template v-else>
                <div class="function-main-title">您的账户下暂无余额，无法取款。</div>
            </template>

            <div class="confirm-button" style="margin-top: 20px" @click="showMainMenu">主菜单</div>
        </div>
        <template v-if="stepsCount===1">
            <div class="function-main-title">您希望从此账户里取出 ${{exerciseVolume}} 吗？</div>

            <div class="button-box" style="margin-top: 200px">
                <div class="confirm-button" style="margin-right: 20px" @click="confirmPage" data-method="withdraw">是</div>
                <div class="confirm-button" style="margin-right: 20px" @click="previewPage">否</div>
            </div>
        </template>
        <template v-if="stepsCount===2">
            <div class="function-main-title">交易完成</div>

            <div class="confirm-button" style="margin-top: 200px" @click="showMainMenu">主菜单</div>
        </template>
    </div>
</template>

<script setup>
import {ref, onMounted, defineEmits} from "vue";
import {useRouter} from "vue-router";

const emit = defineEmits(['userInfoChange'])
const router = useRouter();
const storage = localStorage;
const stepsCount = ref(0);
const controlList = ref([50, 500, 2500, 10000, 100000]);
const exerciseVolume = ref(0.01);
const userInfo = ref({});

// 点击取款金额
const confirmExercise = function (e){
    let dataset = e.currentTarget.dataset;
    if(dataset.value > userInfo.value.money){
        alert("取款金额不能大于账户余额！");
    }else{
        exerciseVolume.value = dataset.value;
        stepsCount.value = 1;
    }
};

// 确认取款
const confirmPage = function (){
    // 取出 localstorage 存入的用户信息和日志
    let userInfo = storage.getItem("userInfo");
    if (userInfo != null) {
        userInfo = JSON.parse(userInfo);
    }else{
        userInfo= {}
    }
    let logList = storage.getItem("logList");
    if (logList != null) {
        logList = JSON.parse(logList);
    }else{
        logList = [];
    }

    // 将当前页面提交的存入数据添加进存档中
    userInfo.money = parseFloat(userInfo.money) - parseFloat(exerciseVolume.value);
    logList.unshift({content:"已取出现金",money: -exerciseVolume.value });

    // 存入localstorage
    storage.setItem("userInfo",JSON.stringify(userInfo));
    storage.setItem("logList",JSON.stringify(logList));

    // 展示成功提示
    stepsCount.value += 1;

    // 更新 header 数据
    emit('userInfoChange');
};

// 取消取款
const previewPage = function () {
    stepsCount.value -= 1;
    exerciseVolume.value = 0.01;
};

// 返回主菜单
const showMainMenu = function () {
    router.back();
};

onMounted(() => {
    // 从 localstorage 中取出用户数据并赋予数据层
    let localUserInfo = storage.getItem("userInfo");
    if(localUserInfo!=null && localUserInfo !== ''){
        userInfo.value = JSON.parse(localUserInfo)
    }else{
        userInfo.value = {money: 0};
    }
})

</script>

<style scoped lang="less">
.full-screen-box {
  width: 100%;
  height: calc(100% - 150px);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  box-sizing: border-box;
  padding: 0 40px 40px 40px;
}

.step-box {
  width: 100%;
  height: 90%;
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
  justify-content: space-between;

  .box-main-title {
    width: 100%;
    padding: 30px;
    background-image: linear-gradient(to bottom, #b9243a, #df242f);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 20pt;
    text-align: center;
    box-sizing: border-box;
  }

  .control-list {
    width: 60%;
    column-count: 2;
    column-gap: 1em;

    .item {
      width: 95%;
      margin: 0 auto 10px auto;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18pt;
      color: #ffffff;
      background-image: linear-gradient(to bottom, #df242f, #b9243a);
      border: 3px solid #811924;
      border-radius: 10px;
      cursor: pointer;
      outline: none;
      break-inside: avoid;
      text-align: center;

      &::placeholder {
        color: #d9d9d9;
      }
    }
  }


}

.function-main-title {
  font-size: 25pt;
  color: #000000;
  text-align: center;
}

.button-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-button {
  width: 350px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18pt;
  color: #ffffff;
  background-image: linear-gradient(to bottom, #df242f, #b9243a);
  border: 3px solid #811924;
  border-radius: 10px;
  cursor: pointer;
}

.confirm-button:hover {
  background-image: linear-gradient(to bottom, #b9243a, #df242f);
  border: 3px solid #140000;
}



@media (max-width: 792px){
  .full-screen-box{
    padding: 0 20px 10px 20px;
  }

  .step-box{
    height: calc(100% - 10px);

    .control-list{
      width: 100% !important;
      column-count: 1 !important;
      overflow: auto;
      padding: 20px;
    }
  }
}

</style>
