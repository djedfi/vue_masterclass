<template>
    <div class="col-full">
            <form @submit.prevent="save">
                <div class="form-group">
                    <textarea v-model="text" name="" id="" cols="130" rows="10" class="form-input" maxlength="200"></textarea>
                    {{text.length}} / 200
                </div>
                <div class="form-action">
                    <button class="btn-blue">Submit post</button>
                </div>
            </form>
        </div>
</template>

<script>
    export default {
        name : 'PostEditor',
        data(){
            return {
                text : '',
            }
        },
        props : {

        },
        methods : {
            save(){
                
                if(this.text == '')
                {
                    return false;
                }
                
                const post = {
                    text        : this.text
                }

                this.$emit('save',{post})
                this.text = ''
            }
        }
    }
</script>

<style scoped>

</style>