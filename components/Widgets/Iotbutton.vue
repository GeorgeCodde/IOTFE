<template>
    <card>
        <div slot="header">
            <h4 class="card-title">{{config.selectedDevice.name}} - {{config.variableFullName}} </h4>
        </div>

       
        <i class="fa " :class="[config.icon, getIconColorClass()]" style="font-size: 30px"></i>
        <base-button @click="sendValue()" :type="config.class"  class="mb-3 pull-right" size="lg" >Add</base-button>

    </card>
</template>

<script>
import BaseButton from '../BaseButton.vue';
    export default {
  components: { BaseButton },
        props: ['config'],
        data() {
            return {
                sending: false,
                

            }
        },
        mounted(){
            //const topic= this.config.UserId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata";
            //console.log(topic);
            //this.$nuxt.$on( topic , this.processReceivedData);
        },

    //UserId/dId/temperatura/sdata

        methods: {

            sendValue (){
                this.sending = true;
                setTimeout(() => {
                    this.sending = false;
                }, 1000);
                const toSend = {
                    topic: this.config.UserId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/actdata",
                    msg: {
                        value: this.config.message
                    }
                }
                console.log(toSend);
                this.$nuxt.$emit('mqtt-sender', toSend);
            },

            getIconColorClass() { 
                if (!this.sending){
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
