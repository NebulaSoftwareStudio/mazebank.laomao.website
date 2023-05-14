<template>
    <div class="full-screen-box" style="display: block">
        <div class="log-box">
            <div class="box-main-title">交易记录</div>

            <template v-if="logList.length>0">
                <div class="function-main-title" style="font-size: 15pt;margin: 20px 0;">您共有
                    {{ logList.length-1 }} 条记录在案的交易记录
                </div>
                <div class="log-list">
                    <template v-for="(item, index) in logList" :key="index">
                        <div class="item">
                            <div class="content">{{ item.content }}</div>
                            <div class="money" :style="item.money>0?'margin-right:100px;':''" v-if="item.money !== 0">
                                {{ item.money &gt; 0 ? '+' : '-' }}${{ item.money &lt; 0 ? -item.money : item.money }}
                            </div>
                        </div>
                    </template>
                </div>
            </template>
            <template v-else>
                <div class="function_main_title">暂无记录在案的交易记录</div>
            </template>

            <div class="confirm-button" style="width:200px;position: absolute;right: 10px;top: 15px;z-index: 5"
                 @click="showMainMenu">主菜单
            </div>
        </div>
    </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const storage = localStorage;
const logList = ref([]);


const showMainMenu = function () {
    router.back();
}

onMounted(() => {
    // 从 localstorage 中取出用户数据并赋予数据层
    let localLogList = storage.getItem("logList");
    if (localLogList != null && localLogList !== '') {
        logList.value = JSON.parse(localLogList)
    } else {
        logList.value = [];
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

.log-box {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 50px 0;
  width: 100%;
  position: relative;

  .box-main-title {
    width: 100%;
    height: 100px;
    background-image: linear-gradient(to bottom, #b9243a, #df242f);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 20pt;
  }

  .function-main-title {
    font-size: 25pt;
    color: #000000;
  }

  .log-list {
    width: 100%;
    box-sizing: border-box;

    .item {
      padding: 0 30px;
      display: flex;
      height: 50px;
      font-size: 15pt;
      background-color: #dfa4a6;
      margin-bottom: 5px;
      align-items: center;
      justify-content: space-between;

      .content {
        max-width: 50%;
        min-width: 200px;
        margin-right: 20px;
        word-break: keep-all;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .money {
        width: 50%;
        text-align: right;
        flex: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
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

  &:hover {
    background-image: linear-gradient(to bottom, #b9243a, #df242f);
    border: 3px solid #140000;
  }
}
</style>
