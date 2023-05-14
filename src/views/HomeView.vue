<template>
    <div></div>
</template>
<script setup>
import {onMounted} from "vue";
import { useRouter } from 'vue-router'

const storage = localStorage;
const router = useRouter()

onMounted(() => {
    //从 Local Storage 中获取用户信息
    let userInfo = storage.getItem("userInfo");
    if(userInfo == null || userInfo == ''){
        router.replace({
            name: 'login',
        })
    }else{
        router.replace({
            name: 'index',
        })
    }
})

</script>
<style scoped lang="less">

</style>
