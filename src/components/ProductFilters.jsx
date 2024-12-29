import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaAngleRight } from 'react-icons/fa6';
import clsx from 'clsx';
import { Button } from '@nextui-org/react';

const accordionVariants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.4 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.4 } }
};

const arrowVariants = {
    open: { rotate: 270 },
    closed: { rotate: 90 }
};


const ProductFilters = ({
    categories,
    brands,
    selectedCategories,
    selectedBrands,
    priceRange,
    minPrice,
    maxPrice,
    onCategoryChange,
    onBrandChange,
    onPriceRangeChange,
    onClearFilters
}) => {

    const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(false);
    const [brandAccordionOpen, setBrandAccordionOpen] = useState(false);
    const [priceAccordionOpen, setPriceAccordionOpen] = useState(false);

    return (
        <div className="p-4">
            <div className="flex justify-between w-[75%] mx-auto items-center pb-4">
                <h1 className="text-lg">Filtros</h1>
                <Button
                    className="border-1 border-gray-300 rounded-md"
                    onClick={onClearFilters}
                >
                    Limpiar
                </Button>
            </div>

            {/* Categorías */}
            <div className="cursor-pointer w-[75%] mx-auto" onClick={() => setCategoryAccordionOpen(!categoryAccordionOpen)}>
                <motion.div
                    initial={false}
                    animate={categoryAccordionOpen ? 'open' : 'closed'}
                    className="flex items-center justify-between p-2 bg-gray-200 rounded-t-lg h-12"
                >
                    <h3 className="font-bold text-md pl-2">Categorías</h3>
                    <motion.span
                        variants={arrowVariants}
                        animate={categoryAccordionOpen ? 'open' : 'closed'}
                        transition={{ duration: 0.3 }}
                        className="text-xl"
                    >
                        <FaAngleRight />
                    </motion.span>
                </motion.div>
            </div>
            <motion.div
                variants={accordionVariants}
                initial={false}
                animate={categoryAccordionOpen ? 'open' : 'closed'}
                className="overflow-hidden w-[75%] mx-auto"
            >
                <div className="p-4 border bg-gray-50">
                    {categories?.map((category) => (
                        <div key={category._id} className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                id={category._id}
                                checked={selectedCategories.includes(category._id)}
                                onChange={() => onCategoryChange(category._id)}
                                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <label htmlFor={category._id} className="text-gray-700">
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Marcas */}
            <div className="cursor-pointer w-[75%] mx-auto" onClick={() => setBrandAccordionOpen(!brandAccordionOpen)}>
                <motion.div
                    initial={false}
                    animate={brandAccordionOpen ? 'open' : 'closed'}
                    className="flex items-center justify-between p-2 bg-gray-200 h-12"
                >
                    <h3 className="font-bold text-md pl-2">Marcas</h3>
                    <motion.span
                        variants={arrowVariants}
                        animate={brandAccordionOpen ? 'open' : 'closed'}
                        transition={{ duration: 0.3 }}
                        className="text-xl"
                    >
                        <FaAngleRight />
                    </motion.span>
                </motion.div>
            </div>
            <motion.div
                variants={accordionVariants}
                initial={false}
                animate={brandAccordionOpen ? 'open' : 'closed'}
                className="overflow-hidden w-[75%] mx-auto"
            >
                <div className="p-4 border bg-gray-50">
                    {brands?.map((brand) => (
                        <div key={brand?._id} className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                id={brand._id}
                                checked={selectedBrands.includes(brand._id)}
                                onChange={() => onBrandChange(brand._id)}
                                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <label htmlFor={brand._id} className="text-gray-700">
                                {brand.name}
                            </label>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Precio */}
            <div className="cursor-pointer w-[75%] mx-auto" onClick={() => setPriceAccordionOpen(!priceAccordionOpen)}>
                <motion.div
                    initial={false}
                    animate={priceAccordionOpen ? 'open' : 'closed'}
                    className={clsx("flex items-center justify-between p-2 bg-gray-200 h-12", priceAccordionOpen ? "rounded-none" : "rounded-b-lg")}
                >
                    <h3 className="font-bold text-md pl-2">Precio</h3>
                    <motion.span
                        variants={arrowVariants}
                        animate={priceAccordionOpen ? 'open' : 'closed'}
                        transition={{ duration: 0.3 }}
                        className="text-xl"
                    >
                        <FaAngleRight />
                    </motion.span>
                </motion.div>
            </div>
            <motion.div
                variants={accordionVariants}
                initial={false}
                animate={priceAccordionOpen ? 'open' : 'closed'}
                className={clsx("overflow-hidden w-[75%] mx-auto", priceAccordionOpen ? "rounded-b-lg" : "rounded-none")}
            >
                <div className="p-4 border bg-gray-50">
                    <div className="py-2">
                        <div className="flex justify-between pb-2">
                            <label htmlFor="minPrice" className="text-sm text-gray-700">Mín:</label>
                            <input
                                id="minPrice"
                                type="number"
                                className="w-16 border-gray-300 rounded-md"
                                value={priceRange[0]}
                                onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                            />
                        </div>
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[0]}
                            onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                            className="flex w-[90%] mx-auto"
                        />
                    </div>
                    <div className="py-2">
                        <div className="flex justify-between pb-2">
                            <label htmlFor="maxPrice" className="text-sm text-gray-700">Máx:</label>
                            <input
                                id="maxPrice"
                                type="number"
                                className="w-16 border-gray-300 rounded-md"
                                value={priceRange[1]}
                                onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                            />
                        </div>
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                            className="flex w-[90%] mx-auto"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductFilters;
