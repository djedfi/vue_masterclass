<template>
    <div class="post-list">
        <div class="post" 
            v-for="post in posts" 
            :key="post.id" 
            >

            <div class="user-info">
                <a href="#" class="user-name">{{userById(post.userId).name}}</a>

                <a href="#">
                    <img 
                        :src="userById(post.userId).avatar" 
                        class="avatar-large" 
                        alt="">
                </a>

                <p class="desktop-only text-small">{{(post.userId).length}} posts</p>
            </div>

            <div class="post-content">
                <div>
                    <p>
                        {{post.text}}
                    </p>
                </div>
            </div>

            <div class="post-date text-faded">
                <base-date :timestamp="post.publishedAt"/>
            </div>
        </div>
    </div>
</template>

<script>
   
    
    export default {
        name : 'PostList',
        props:{
            posts:{
                required : true,
                type     : Array    
            }
        },
        data() {
            return {
                
            }
        },
        methods:{
            userById(userId)
            {
                return this.users.find(u=>u.id === userId)
            }
        },
        computed:{
            users(){
                return this.$store.state.users
            }
        }

    }
</script>

<style scoped>

</style>