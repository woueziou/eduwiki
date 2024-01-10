interface Formation {
   
    name: string;
    description: string;
  }
  
  interface Institution {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    emailAddress: string;
    formations: Formation[];
  }
  const storageKey="INSTITUTIONS_KEY";
  export type {Formation,Institution,storageKey}