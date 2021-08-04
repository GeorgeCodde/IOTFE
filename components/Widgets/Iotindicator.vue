<template>
    <card>
        <div slot="header">
            <h4 class="card-title">{{config.selectedDevice.name}} - {{config.variableFullName}} </h4>
        </div>

        <i class="fa " :class="[config.icon, getIconColorClass()]" style="font-size: 30px"></i>
    </card>
</template>

<script>
    export default {
        props: ['config'],
        data() {
            return {
                value: false,
                

            }
        },
        mounted(){
            const topic= this.config.UserId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata";
            console.log(topic);
            this.$nuxt.$on( topic , this.processReceivedData);
        },
        beforeDestroy(){
            this.$nuxt.$off(this.config.UserId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata")
        },

    //UserId/dId/temperatura/sdata

        methods: {

            processReceivedData(data) {
                console.log("received");
                console.log(data);
                this.value= data.value;
            },

            getIconColorClass() { 
                if (!this.value){
                    return "text-Dark"
                }
                if (this.config.class == "success"){
                    return "text-success"
                }
                if (this.config.class == "primary"){
                    return "text-primary"
                }
                if (this.config.class == "warning"){
                    return "text-warning"
                }
                if (this.config.class == "danger"){
                    return "text-danger"
                }
            }


        }
    };

</script>
