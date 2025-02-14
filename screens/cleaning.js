import react from "react";
import axios from "axios";
const cleaning = () =>{
    const getstatus = async () => {
        try{
            const response =await axios.get("https://cleanit-backs.onrender.com/api/status");
            if(response.data.success) {
                
            }
        }catch{}
    }
}