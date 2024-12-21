
import React, { useState } from 'react';

const Footer = () => {
    const [selectedCar, setSelectedCar] = useState('Car 1');
    const cars = ['Car 1', 'Car 2', 'Car 3'];

    const handleCarChange = (event) => {
        setSelectedCar(event.target.value);
    };

    return (
        <footer className="bg-gray-800 text-white text-center fixed bottom-0 w-full">
            <div className="mt-2">
                <label htmlFor="car-switcher" className="mr-2">Select Car:</label>
                <select
                    id="car-switcher"
                    value={selectedCar}
                    onChange={handleCarChange}
                    className="bg-gray-700 text-white p-1 rounded"
                >
                    {cars.map((car) => (
                        <option key={car} value={car}>
                            {car}
                        </option>
                    ))}
                </select>
            </div>
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
         
        </footer>
    );
};

export default Footer;