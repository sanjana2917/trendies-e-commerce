import React, { useContext, useState } from 'react'
import './Css/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/assets/down.png';
import { Item } from '../Components/Items/Item'


export const ShopCategory = (props) => {

    const { all_product } = useContext(ShopContext);

    // NEW: Dropdown state
    const [showDropdown, setShowDropdown] = useState(false);

    // NEW: Selected sorting option
    const [sortOption, setSortOption] = useState('Default Sorting');

    // NEW: Category wise filtering
    let filteredProducts = all_product.filter((item) => {
        return props.category === item.category;
    });

    // NEW: Sorting functionality
    if (sortOption === 'Price: Low to High') {
        filteredProducts.sort((a, b) => a.new_price - b.new_price);
    }
    else if (sortOption === 'Price: High to Low') {
        filteredProducts.sort((a, b) => b.new_price - a.new_price);
    }
    else if (sortOption === 'Name: A to Z') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortOption === 'Name: Z to A') {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    // NEW: Handle dropdown selection
    const handleSort = (option) => {
        setSortOption(option);
        setShowDropdown(false);
    };

    return (
        <div className='shop-category'>

            <img className='shopcategory-banner' src={props.banner} alt="" />

            <div className="shopcategory-indexsort">

                <p>
                    <span>Showing 1-{filteredProducts.length}</span>
                    {' '}out of {filteredProducts.length} products
                </p>

                {/* UPDATED: Sort dropdown */}
                <div className="shopcategory-sort">

                    <button
                        className="sort-button"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {sortOption}
                        <img src={dropdown_icon} alt="" />
                    </button>

                    {showDropdown && (
                        <div className="sort-options">

                            <p onClick={() => handleSort('Default Sorting')}>
                                Default Sorting
                            </p>

                            <p onClick={() => handleSort('Price: Low to High')}>
                                Price: Low to High
                            </p>

                            <p onClick={() => handleSort('Price: High to Low')}>
                                Price: High to Low
                            </p>

                            <p onClick={() => handleSort('Name: A to Z')}>
                                Name: A to Z
                            </p>

                            <p onClick={() => handleSort('Name: Z to A')}>
                                Name: Z to A
                            </p>

                        </div>
                    )}

                </div>
            </div>

            {/* UPDATED: Filtered and sorted products */}
            <div className="shopcategory-products">

                {filteredProducts.map((item) => {

                    return (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    );

                })}

            </div>

            <div className="shopcategory-loadmore">
                Explore more
            </div>

        </div>
    )
}