import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {

  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);



      console.log('$$$$===>',stored);

      return stored !== null ? JSON.parse(stored) : defaultValue;



    } catch (err) {
      console.error(err);
      return defaultValue;
    }
  });


  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }, [key, value]);

  console.log('==========>', key,'-->',value);
  return [value, setValue];


}
