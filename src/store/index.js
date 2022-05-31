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
        },
        createThread({ commit,state,dispatch },{ text,title,forumId })
        {
            const publishedAt = Math.floor(Date.now()/1000)
            const userId =  state.authId
            const id = '999'+Math.random()
            const thread = {
                forumId,
                title,
                publishedAt,
                userId,
                id
            }
            commit('setThread',{ thread })
            commit('appendThreadToUser',{ userId,threadId: id})
            commit('appendThreadToForum',{ forumId, threadId: id})
            dispatch('createPost', {text,threadId : id})
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
            const thread = state.threads.find(thread => thread.id === threadId)
            thread.posts = thread.posts || []
            thread.posts.push(postId)
        },
        setThread(state,{ thread })
        {
            state.threads.push(thread)
        },
        appendThreadToForum(state,{ forumId, threadId }){
            const forum = state.forums.find(forum => forum.id === forumId)
            forum.threads = forum.threads || []
            forum.threads.push(threadId)
        },
        appendThreadToUser(state,{ userId, threadId }){
            const user = state.users.find(user => user.id === userId)
            user.threads = user.threads || []
            user.threads.push(threadId)
        }

    }
})