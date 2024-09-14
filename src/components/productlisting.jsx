import React from "react";
import './productlisting.css'
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { useState } from "react";

var products = [
    {id: 1, name: 'DANDELIONS', src: '/assets/1.jpg', price: 10, sale: false, cat:"flower"},
    {id: 2, name: 'LAVENDER', src: '/assets/2.jpg', price: 15, sale: true, cat:"flower"},
    {id: 3, name: 'ROSES', src: '/assets/3.jpeg', price: 20, sale: false, cat:"flower"},
    {id: 4, name: 'LILY', src: '/assets/4.jpeg', price: 15, sale: false, cat:"flower"},
    {id: 5, name: 'JASMINE', src: '/assets/5.jpeg', price: 5, sale: true, cat:"flower"},
    {id: 7, name: 'LILAC', src: '/assets/7.jpeg', price: 15, sale: false, cat:"flower"},
    {id: 8, name: 'CACTUS', src: '/assets/8.jpeg', price: 10, sale: true, cat:"plant"},
    {id: 9, name: 'ALOE VERA', src: '/assets/9.jpeg', price: 25, sale: false, cat:"plant"},
    {id: 10, name: 'LOTUS', src: '/assets/10.jpeg', price: 30, sale: false, cat:"flower"},
    {id: 11, name: 'LILY OF THE VALLEY', src: '/assets/11.jpeg', price: 10, sale: false, cat:"flower"},
    {id: 12, name: 'PEACE LILY', src: '/assets/12.jpeg', price: 15, sale: false, cat:"plant"},
    {id: 13, name: 'AVOCADO', src: '/assets/13.jpeg', price: 5, sale: true, cat:"plant"},
];


function Products() {

    const dispatch = useDispatch();
    const [actions, setactions] = useState([]);
    const [array, setarray] = useState([...products])

    const addToCart = (id, name, src, price) => {

        const btn = document.getElementById(id);

        const changeBack = () => {
            btn.style.backgroundColor = "#80b622";
            btn.innerHTML = "Add to Cart"
        }

        btn.style.backgroundColor = "grey";
        btn.innerHTML = "ADDED TO CART"
        dispatch(addItem({id, name, src, price}))
        setTimeout(changeBack, 1500);
    }

    const sort_asc = (array) => {
        return [...array].sort((a, b) => a.price - b.price);
    };
    
    const sort_desc = (array) => {
        return [...array].sort((a, b) => b.price - a.price);
    };
    
    const filter = (array, cat) => {
        return [...array].filter(a => a.cat === cat);
    };
    

    function changeactions() {

        let updatedarray = [...products]

        if(actions.length === 0){
            setarray(products)
        }
        
        else{
        actions.forEach(a => {
            updatedarray = a.action(updatedarray, a.arg);    
        }
        )

        setarray(updatedarray)};
    }

    function handleaction(e, act, a) {
        if(e.target.checked){
            var actn = null;
            if(act==="asc"){
                actn = sort_asc
            }

            else if(act==="desc"){
                actn = sort_desc
            }

            else{
                actn=filter
            }

            setactions([...actions, {action: actn, arg: a}])
        }

        else{
            setactions(actions.filter(action => action.arg !== a));
        }

        changeactions();
    }

    return (
        <>
            <div className="sorting">
            <button className="sort-btn">
                        SORT
                </button>
                    <div className="sortwindow">
                        <p className="phead">Price</p>
                        <label>low to high</label><input onChange={(e) => handleaction(e, "asc", "sort")} type="checkbox"/>
                        <label>high to low</label><input onChange={(e) => handleaction(e, "desc", "sort")} type="checkbox"/>
                    </div>
            </div>

            <div className="filtering">
            <button className="filter-btn">
                        FILTER
            </button>
                    <div className="filterwindow">
                        <p className="phead">Categories</p>
                        <label>flowers</label><input onChange={(e) => handleaction(e, "filter", "flower")} type="checkbox"/>
                        <label>plants</label><input onChange={(e) => handleaction(e, "filter", "plant")} type="checkbox"/>
                    </div>
            </div>


            <div className="header">PLANTS</div>
            <div className="products">
            {
                array.map((product) => {
                    return (
                    <>
                        <div key={product.id} className="product">
                            <h2>{product.name}</h2>
                            {
                                product.sale && 
                                <div className="sale-box">SALE</div>
                            }
                            <img src={product.src}/>
                            <p>${product.price}</p>
                            <button id={product.id} onClick={() => addToCart(product.id, product.name, product.src, product.price)} className="getStarted">Add to Cart</button>
                        </div>
                    </>
                )})
            }
            </div>
        </>
    )
}


export default Products