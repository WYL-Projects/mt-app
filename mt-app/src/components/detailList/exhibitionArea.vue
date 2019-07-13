<template>
    <div class="exhibitionArea" >
        <el-row class="every-product" v-for="(item, index) in products" :key="index">
            <el-col :span="6" class="left-img-exh">
                <router-link tag="div" :to="'/detail'">
                <img :src="item.image" alt="">
                </router-link>
            </el-col>
            <el-col :span="18" class="right-content-exh">
                <div class="productDetail">
                    <h3>{{item.title}}</h3>
                    <p class="comment">
                        <el-rate
                            v-model="item.score"
                            disabled
                            :show-score='false'
                            text-color="#ff9900">
                        </el-rate>
                        <span class="fz-text">
                            {{
                                item.score>4.5&&item.score<=5?'很好'
                                :(item.score>4&&item.score<=4.5?'好':(
                                    item.score>3.5&&item.score<=4?'不错':(
                                        item.score>3&&item.score<=3.5?'一般':'暂无频分'
                                    )
                                ))
                            }}
                        </span>
                        <span>{{item.score+'分'}}</span>
                        <span class="comment-num">{{item.commentNum+"人评论"}}</span>
                    </p>
                    <p class="address">
                        <span v-for="(ele, index1) in item.tab" :key="index1">{{(index1!=0?"|":"")+ele}}</span>
                        <span class="specificAddress">
                            {{item.address}}
                        </span>
                        <span class="watchMap">
                            <i class="el-icon-location-information"></i>查看地图
                        </span>
                    </p>
                    <p class="avgPrice">{{'人均￥'+item.avgPrice}}</p>
                </div>
                <div class="discount">
                    <div class="discount-con" 
                    v-for="(item1, index2) in item.dealItems" 
                    :key="index2" v-show="index2<2||moreDiscount">
                        <p class="discount-con-title">
                            {{item1.title}}
                        </p>
                        <p class="discount-con-price">
                            <span class="unit">￥</span>
                            <span class="price">{{item1.price}}</span>
                            <span class="counterPrice">{{"门市价￥"+item1.counterPrice}}</span>
                            <span class="salenum">{{"已售"+item1.saleNum}}</span>
                        </p>
                    </div>
                    
                        <p class="more-discount" v-if="item.dealItems.length>2&&!moreDiscount" @click="showMore">
                            {{"更多"+(item.dealItems.length-2)+'个优惠'}}
                            <i class="el-icon-arrow-down"></i>
                        </p>
                        <p class="hiddenMore" v-if="moreDiscount" @click="hiddenMore">
                            收起<i class="el-icon-arrow-up"></i>
                        </p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props:['products'],
    data() {
        return {
            moreDiscount:false
        }
    },
    methods:{
        showMore() {
            this.moreDiscount = true
        },
        hiddenMore() {
            this.moreDiscount = false
        }
    },
    created() {
        //console.log(this.products.attrs)
    }
}
</script>
