<template>
    <div class="col-full">
        <div class="thread-list">
            <h2 class="list-title">Threads</h2>
            <div
                v-for = "thread in threads" :key="thread.id" 
                class="thread">
                <div>
                    <p>
                        <router-link :to=" {name : 'ThreadShow', params:{id: thread.id}} "> {{ thread.title }} </router-link>
                    </p>
                    <p class="text-faded text-xsmall">
                        By <a href="#">{{ userById(thread.userId).name }}</a>, <base-date :timestamp="thread.publishedAt" />.
                    </p>
                </div>

                <div class="activity">
                    <p class="replies-count">
                        {{ thread.posts.length }} {{ (thread.posts.length > 1 ? 'replies' : 'reply') }}
                    </p>

                    <img 
                        :src="userById(thread.userId).avatar"
                        class="avatar-medium"  
                        alt="">

                    <div>
                        <p class="text-xsmall">
                            <a href="#">{{ userById(thread.userId).name }}</a>
                        </p>
                        <p class="text-xsmall text-faded"><base-date :timestamp="thread.publishedAt" /></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name    :   'ThreadList',
        props   :   {
            threads: {
                type        : Array,
                required    : true
            }
        },
        data() {
            return {
               
            }
        },
        methods:{
            postById(postId){
                return this.posts.find(p=>p.id === postId)
            },
            userById(userId)
            {
                return this.users.find(u=>u.id === userId)
            }
        },
        computed:{
            posts(){
                return this.$store.state.posts
            },
            users(){
                return this.$store.state.users
            }
        }
    }
</script>

<style scoped>

</style>