<template>
    <div class="col-large push-top">
        <h1>{{ thread.title }}</h1>
        <post-list :posts="threadPosts" />
        <post-editor @save="addPost" />
    </div>
</template>


<script>
    import PostList from '@/components/PostList.vue'
    import PostEditor from '@/components/PostEditor.vue'

    export default {
        name        :   'ThreadShow',
        props       :
        {
            id :{
                required    :   true,
                type        :   String
            }
        },
        components : {
            PostList,
            PostEditor
        },

        data() {
            return {
                
            }
        },
        computed: {
            threads(){
                return this.$store.state.threads
            },
            posts(){
                return this.$store.state.posts
            },
            thread () {
                return this.threads.find(thread => thread.id === this.id)
            },
            threadPosts(){
                return this.posts.filter(post=>post.threadId === this.id)
            },
            

        },
        methods:{
            addPost(evenData){
               
                const post = {
                    ...evenData.post,
                    threadId    : this.id
                }
                this.$store.dispatch('createPost', post)

            }
        }
    }
</script>

<style  scoped>

</style>