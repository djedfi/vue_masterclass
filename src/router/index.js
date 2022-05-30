import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ThreadShow from  '@/pages/ThreadShow.vue'
import NotFound from '@/pages/NotFound.vue'
import Forum from '@/pages/Forum.vue'
import CategoryShow from '@/pages/CategoryShow.vue'
import Profile from '@/pages/Profile.vue'

import sourceData from '@/data.json'


const routes = [
    { 
        path        : '/',
        name        : 'PageHome', 
        //component: ()=> import('@/views/Protected.vue'),
        component   : Home 
    },
    {
        path        : '/forum/:id',
        name        :   'PageForum',
        component   : Forum,
        props       : true,
        beforeEnter : (to, from, next) =>{
            const forumExists = sourceData.forums.find(forums => forums.id === to.params.id)

            if(forumExists)
            {
                return next()
            }
            else{
                next({
                    name: 'PageNotFound',
                    params: { pathMatch: to.path.substring(1).split('/') },
                    query: to.query,
                    hash: to.hash,
                })
            }
        }

    },
    { 
        path        : '/thread/:id',
        name        : 'ThreadShow', 
        component   : ThreadShow,
        props       : true,
        beforeEnter: (to, from, next) => {
            const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)

            if(threadExists)
            {
                return next();
            }
            else
            {
                next({
                    name: 'PageNotFound',
                    params: { pathMatch: to.path.substring(1).split('/') },
                    query: to.query,
                    hash: to.hash,
                })
            }
            
        }
    },
    { 
        path        : '/category/:id',
        name        : 'CategoryShow', 
        component   : CategoryShow,
        props       : true,
        beforeEnter: (to, from, next) => {
            const categoryExists = sourceData.categories.find(categorie => categorie.id === to.params.id)

            if(categoryExists)
            {
                return next();
            }
            else
            {
                next({
                    name: 'PageNotFound',
                    params: { pathMatch: to.path.substring(1).split('/') },
                    query: to.query,
                    hash: to.hash,
                })
            }
            
        }
    },
    {
        path        : '/me',
        name        : 'ProfilePage',
        component   : Profile,
        meta:{toTop:true, smoothScroll:true}
    },
    {
        path        : '/me/edit',
        name        : 'ProfileEdit',
        component   : Profile,
        props       : {edit:true}
    },
    {
        path        : '/:pathMatch(.*)*',
        name        :  'PageNotFound',
        component   :   NotFound
    }
]
  

const router = createRouter({
    history:createWebHistory(),
    routes,
    //, from, savedPosition
    scrollBehavior (to) 
    {
        const scroll ={}
        if(to.meta.toTop) scroll.top = 0
        if(to.meta.smoothScroll) scroll.behavior = 'smooth'
        return scroll

        //scroll behavior when you save from any form
        //return savedPosition || new Promise((resolve)=>{
        //  setTimeout(()=> resolve({ top:0,behavior:'smooth' }), 300)
        //})
    }
})


export default  router;