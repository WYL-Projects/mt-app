<template>
    <div class="cityList">
        <h3 class="l-attr">{{title}}</h3>
        <p class="r-info">
            <a :href="'#'+item" v-for="(item,index) in cityList" :key="index" class="city">{{item}}</a>
        </p>
    </div>
</template>
<script>
export default {
    props: ['title', 'cityList']
}
</script>