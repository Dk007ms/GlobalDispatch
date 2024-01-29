import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import MyContext from "./MyContext";

export default function CountryDropdown() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  return (
    <MyContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      <div className="mx-auto w-max relative">
        <ReactFlagsSelect
          selected={selectedCountry}
          onSelect={(code) => setSelectedCountry((prev) => (prev = code))}
          searchable
          className="w-full p-2 border rounded-md shadow-md"
        />
      </div>
    </MyContext.Provider>
  );
}
