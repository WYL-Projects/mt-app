<template>
<div>
    <div class="alphabet">
         <h3 class="l-attr">按拼音首字母选择：</h3>
         <p  class="l-info">
             <a class="letter" 
             v-for="(item, index) in alphabet" 
             :key="index" 
             :href="'#city-'+item">{{item}}</a>
         </p>
    </div>
    <div class="alphabet-city-area">
        <div class="city-area" v-for="(item, index) in cityObj" :key="index" :id="'city-'+index">
            <span class="alpha">{{index}}</span>
            <span class="cities">
                <span class="city" v-for="ele in item" :key="ele.name">
                    {{ele.name}}
                </span>
            </span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            alphabet:"ABCDEFGHJKLMNPQRSTWXYZ".split(""),
            data:[
                {
                    id:1,
                    name:"北京",
                    pinyin:'beijing',
                    acronym:'bj',
                    rank:"S",
                    firstChar:"b"
                },
                {
                    id:10,
                    name:"上海",
                    pinyin:'shanghai',
                    acronym:'sh',
                    rank:"S",
                    firstChar:"s"
                },
                {
                    id:20,
                    name:"广州",
                    pinyin:'guangzhou',
                    acronym:'gz',
                    rank:"S",
                    firstChar:"g"
                },
                {
                    id:30,
                    name:"深圳",
                    pinyin:'shenzhen',
                    acronym:'sz',
                    rank:"S",
                    firstChar:"s"
                },
                {
                    id:40,
                    name:"天津",
                    pinyin:'tianjing',
                    acronym:'tj',
                    rank:"S",
                    firstChar:"t"
                },
                {
                    id:36,
                    name:"西安",
                    pinyin:'xian',
                    acronym:'xa',
                    rank:"S",
                    firstChar:"x"
                },
                {
                    id:50,
                    name:"重庆",
                    pinyin:'chongqing',
                    acronym:'cq',
                    rank:"S",
                    firstChar:"c"
                },
                {
                    id:60,
                    name:"杭州",
                    pinyin:'hangzhou',
                    acronym:'hz',
                    rank:"S",
                    firstChar:"h"
                },
                {
                    id:70,
                    name:"南京",
                    pinyin:'nanjing',
                    acronym:'nj',
                    rank:"S",
                    firstChar:"n"
                },
                {
                    id:77,
                    name:"武汉",
                    pinyin:'wuhan',
                    acronym:'wh',
                    rank:"S",
                    firstChar:"w"
                },
                {
                    id:21,
                    name:"贵阳",
                    pinyin:'guiyang',
                    acronym:'gy',
                    rank:"S",
                    firstChar:"g"
                },
                {
                    id:51,
                    name:"成都",
                    pinyin:'chengdu',
                    acronym:'cd',
                    rank:"S",
                    firstChar:"c"
                },
                {
                    id:74,
                    name:"南昌",
                    pinyin:'nanchang',
                    acronym:'nc',
                    rank:"S",
                    firstChar:"n"
                }
                
            ],
            cityObj: {} //分类好的数据
        }
    },
    created() {
        this.data.forEach(ele=>{
             let oEle = ele.firstChar.toUpperCase()
             if(!this.cityObj[oEle]){
                 this.cityObj[oEle] = []
             }
            this.cityObj[oEle].push(ele) 
        })
    },
}
</script>