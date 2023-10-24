import { toast } from "react-toastify";
export const Toast=(status,msg)=>{
    if(status){
        toast.success(
            msg,
            "Sing In successfully! your will be redirected to Home page",
            { position: "bottom-center", autoClose: 2000 }
          );
    }else{
        toast.error(msg, { position: "bottom-center" });
    }
}