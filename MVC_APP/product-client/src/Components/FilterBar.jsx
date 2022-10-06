import React from 'react';
import FilterCard from './FilterCard';
import { useState } from 'react';
import "../App.css";


const filterData = {
    brand: ["Apple",
      "Samsung",
      "OPPO",
      "Huawei",
     "Microsoft Surface",
      "Infinix",
      "HP Pavilion",
      "Impression of Acqua Di Gio",
      "Royal_Mirage",
      "Fog Scent Xpressio",
      "Al Munakh",
      "Lord - Al-Rehab",
      "L'Oreal Paris",
     " Hemani Tea",
      "Dermive",
      "ROREC White Rice",
      "Fair & Clear",
      "Saaf & Khaas",
      "Bake Parlor Big",
      "Baking Food Items",
      "fauji",
      "Dry Rose",
      "Boho Decor",
      "Flying Wooden",
      "LED Lights",
      "luxury palace"
      ,"Golden"],
    category:["smartphones",
      "laptops",
      "fragrances",
      "skincare",
      "groceries",
      "home-decoration"]
  }

const FilterBar = ({getProduct,setData,setCurrentPage ,setPrevUrl}) => {
    const [filter, setFilter] = useState();
    const [hideFilter, setHideFilter] = useState(true);


  return (
   <>
    <div id='filterbar-container' >
        <div id='filterbar-heading'>Filter</div>
        <div className='filterbar-options' onClick={() => setHideFilter(false)}>
        <button onClick={()=>setFilter('brand')}  style={filter === 'brand' ? { color: `rgb(112, 201, 112)` } : { color: 'black'}}>Brand</button>
        <button onClick={()=>setFilter('category')} style={filter === 'category' ? { color: `rgb(112, 201, 112)` } : { color: 'black'}}>Category</button>
        <button onClick={()=>setFilter('price')} style={filter === 'price' ? { color: `rgb(112, 201, 112)` } : { color: 'black'}}>Price</button>
        </div>
        <FilterCard getProduct = {getProduct} setPrevUrl = {setPrevUrl} setData = {setData} setFilter = {setFilter} hideFilter= {hideFilter} setHideFilter = {setHideFilter} filter = {filter} setCurrentPage = {setCurrentPage} filterData = {filter === 'brand' ? filterData.brand : filterData.category}/>
    </div>

   </>
  )
}

export default FilterBar;