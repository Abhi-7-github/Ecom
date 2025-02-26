import ProductCard from "../components/product";
import { useEffect,useState } from "react";
import axios from "axios";

     

export default function ProductPage() {
   
  let [data,setData]=useState([])
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            let response = await axios.get("http://localhost:1981/product/allproduct");
            
            if (response.status === 200) {  
                 console.log(response.data)
                setData(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    fetchData();  
}, []);

    return (
      <div className="w-full min-h-screen bg-neutral-800">
        <div className="grid grid-cols-5 gap-4 p-4">
          {data.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    );
  }
  