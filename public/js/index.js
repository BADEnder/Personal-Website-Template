
const app = Vue.createApp({
    data: function(){
        return {
            articles: [],
            comments : [],
            articleContent : null
        }
    },
    methods: {
        getArticles: async function(){
            const result = await axios.get("/api/article")
            this.articles = result.data
        },
        getComments: async function() {
            const result = await axios.get("/api/comment")
            this.comments = result.data
            console.log(this.comments)
        }
        ,
        changeContent: function (id) {
            for(let c =0; c< this.articles.length; c++){

                if(this.articles[c].id == id) {
                    this.articleContent = this.articles[c].content
                    break
                } 
            }
        },
        getCurrentTime(){
            let time = new Date()
            let result = ""
            time=time.toISOString()
            let ref = ""
            let indication = 0
            for(let idx=0; idx<time.length; idx++){
                if(time[idx]=="T"){
                    result += " "
                    indication = 1
                }else if (indication ==1 ){
                    ref += time[idx]

                    if(ref.length ==2){
                        indication =0
                        ref = Number(ref) + 8
                        if(ref>=24){
                            ref -=24 
                            ref = String(ref)
                            
                        }
                        result += ref
                    }
                }else if(time[idx] == "."){
                    break
                }else{
                    result += time[idx]
                }

            } 

            return result
        },
        submitMessage: async function () {
            try {
                const name = document.querySelector("#name")
                const email = document.querySelector("#email")
                const message = document.querySelector("#message")
    
                if (name.value.trim() == "") {
                    this.show_submit_message("Name cannot be empty!", "rgb(248, 255, 55)",  "rgb(251, 255, 125)")
                } else if (email.value.trim() =="") {
                    this.show_submit_message("Title cannot be empty!", "rgb(248, 255, 55)",  "rgb(251, 255, 125)")
                } else if (message.value.trim() == "") {
                    this.show_submit_message("Message cannot be empty!", "rgb(248, 255, 55)",  "rgb(251, 255, 125)")

                } else {
                    await axios.post("/api/comment", {
                        name: name.value,
                        email: email.value,
                        message: message.value
                    })
                    
                    const newData = {
                        id: this.comments.length+1,
                        name : name.value,
                        email : email.value,
                        message : message.value,
                        time : this.getCurrentTime()
                    }

                    this.comments.push(newData)
                    name.value = ""
                    email.value = ""
                    message.value = ""
                    this.show_submit_message("Submit success!")
                }
            } catch (err) {
                this.show_submit_message("Submit failed, server internal error!", "rgb(251, 55, 55)",  "rgb(255, 99, 99)")
            }

        },
        show_submit_message: function(message, background_color="rgb(170, 253, 223)" , shadow="rgb(150, 248, 212)"){
            let item_target = document.querySelector(".show-submit-message")
            item_target.innerText = message
            item_target.style.backgroundColor = background_color
            item_target.style.boxShadow = "0px 0px 10px " + shadow

            item_target.style.display = "flex"
            item_target.style.opacity = 1
            let cur_opi = 1
            setTimeout(()=>{
                let item_target_timeout = setInterval(() => {
                    cur_opi -= 0.05
                    item_target.style.opacity = cur_opi

                    if(cur_opi <= 0){
                        clearInterval(item_target_timeout)
                        item_target.style.display = "none"
                    }
                }, 100);
            
            },3000)
        }
    }
    ,
    mounted: function (){
        this.getArticles()
        this.getComments()

        console.log("app mounted")
    }
})


app.mount("#app");




