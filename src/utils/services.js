export const baseurl = "https://chat-server-2ykq.onrender.com/api"

export const PostRequest = async(url,bodys)=>{
    const response =   await fetch(url,{
       headers: {
           'Content-Type': 'application/json'
        }, 
        method:'POST', 
        body:JSON.stringify(bodys)
    })
    console.log("body",bodys)
    const data = await response.json()
    if(!response.ok){
       let message
       if(data?.message){
           message = data.message;
       }else{
           message = data;
       }
       return {Error:true ,message}
    }
       return data
    
       
   }
   export const GetRequest = async(url,bodys)=>{
    const response =   await fetch(url)
    const data = await response.json()
    if(!response.ok){
       let message
       if(data?.message){
           message = data.message;
       }else{
           message = data;
       }
       return {Error:true ,message}
    }
       return data
    
       
   }   