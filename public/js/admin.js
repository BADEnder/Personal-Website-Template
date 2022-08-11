const submitArticle = async() => {
    try{
        const title = document.querySelector("#title")
        const content = document.querySelector("#content")
        if (title.value.trim() == "") {
            show_submit_message("Title cannot be empty", "rgb(248, 255, 55)",  "rgb(251, 255, 125)")
        } else if (content.value.trim() == "") {
            show_submit_message("Content cannot be empty", "rgb(248, 255, 55)",  "rgb(251, 255, 125)")
        } else {
            await axios.post("/api/article", {
                title: title.value,
                content: content.value,
                
            })
            title.value = ""
            content.value = ""

            show_submit_message("Submit success!")
        }
    } catch (err) {
        show_submit_message("Submit failed, server internal error!", "rgb(251, 55, 55)",  "rgb(255, 99, 99)")
    }



}


const show_submit_message = (message, background_color="rgb(170, 253, 223)" , shadow="rgb(150, 248, 212)") => {
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