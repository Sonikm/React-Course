import { useEffect, useState } from "react";

 export function useLocalStorageState(initialState, key ){
    const [value, setValue] = useState(()=>{
        const storedData = JSON.parse(localStorage.getItem(key));
        return storedData ? storedData : initialState;
      });

      useEffect(()=>{
       localStorage.setItem(key, JSON.stringify(value));
      },[value, key]);

      return [value, setValue];
}

