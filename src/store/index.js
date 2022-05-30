import { createStore  } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
    state :
    {
        ... sourceData,
        authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
    },
    getters:{
        authUser : state => {
            const user = state.users.find(user => user.id === state.authId)

            if(!user) return null
            return {
                ...user,
                get posts(){
                    return state.posts.filter(post => post.userId === user.id)
                },
                get postsCount(){
                    return this.posts.length
                },
                get threads(){
                    return state.threads.filter(thread => thread.userId === user.id)
                },
                get threadsCount(){
                    return this.threads.length
                }
            }
        }
    },
    actions:{
        createPost ({commit,state},post) {
            post.id = '999'+Math.random()
            post.publishedAt = Math.floor(Date.now()/1000),
            post.userId =  state.authId
            commit('setPost',{ post })
            commit('appendPostToThread', { postId: post.id, threadId: post.threadId })
        },
        updateUser({commit},user)
        {
            commit('setUser',{user,userId:user.id})
        }
    },mutations:{
        setPost (state, { post }){
            state.posts.push(post)
        },
        setUser (state, { user, userId }){
            const userIndex = state.users.findIndex(user => user.id === userId)
            state.users[userIndex] = user
        },
        appendPostToThread (state, { postId, threadId }){
            let v_threadId = state.threads.find(thread => thread.id === threadId)
            v_threadId.posts.push(postId)
        }
    }
})