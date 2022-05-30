<template>
    <div class="container col-full">
        <div class="push-top">
            <h1>{{category.name}}</h1>
        </div>

        <ForumList 
            class="push-top"
            :title="category.name"
            :forums="getForumsForCategory(category)"
            :category-id="this.id"
        />  
            
    </div>
</template>

<script>
    import ForumList from '@/components/ForumList.vue'
    
    export default {
        name    : 'CategoryShow',
        props   : {
            id : {
                required : true,
                type : String
            }
        },
        components:{
            ForumList
        },
        computed :{
            category(){
                return this.$store.state.categories.find(category => category.id === this.id)
            }
        },
        methods : {
            getForumsForCategory(category)
            {
                return this.$store.state.forums.filter(forum => forum.categoryId === category.id)
            }
        }
    }
</script>

<style scoped>

</style>