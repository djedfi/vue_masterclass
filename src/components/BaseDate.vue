<template>
    <span :title="hummanFriendlyDate()">
        {{ diffforHumans() }}
    </span>
</template>

<script>
    import dayjs from 'dayjs'
    import relativeTime from 'dayjs/plugin/relativeTime'
    import localizeDate from 'dayjs/plugin/localizedFormat'
    dayjs.extend(relativeTime)
    dayjs.extend(localizeDate)

    export default {
        name : 'BaseDate',
        props:{
            timestamp:{
                required : true,
                type     : Number    
            }
        },
        methods:{
            
            diffforHumans()
            {
                return dayjs.unix(this.timestamp).fromNow();
            },
            hummanFriendlyDate()
            {
                return dayjs.unix(this.timestamp).format('LLLL')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>