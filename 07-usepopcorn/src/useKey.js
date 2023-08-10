import { useEffect } from "react";

export function useKey(key, handleCloseDetails){
    useEffect(() => {
        function callBack(e) {
          if (e.code === key) {
            handleCloseDetails();
          }
        }
    
        document.addEventListener("keydown", callBack);
    
        return () => {
          document.removeEventListener("keydown", callBack);
        };
      }, [handleCloseDetails, key]);
}