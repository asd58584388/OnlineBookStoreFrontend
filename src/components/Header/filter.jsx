import React, { useState } from "react";

const Filter = ({setParentState}) => {
    // const handleInputChange = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    // const handleFilter = () => {
    //     onFilter(searchTerm);
    // };

    const handleEbookClick = (event) => {
  
        if (event.target.checked) {
            setParentState(null, null,"ebooks", null);
        }
        else{
            setParentState(null, null,"", null);
        }
    };

    const handleYearFromChange = (event) => {
        setParentState(event.target.value, null, null,null);
    };

    const handleYearEndChange = (event) => {
        setParentState(null, event.target.value, null,null);
    };
    
    const handleLanguage = (event) => {
        setParentState(null, null, null,event.target.value);
    }


    return (
        <div>
            <label htmlFor="ebook">
                <input
                    type="checkbox"
                    name="ebook"
                    onClick={handleEbookClick}
                />
                E-Book
            </label>
            <label htmlFor="year-select">Choose a Year:</label>
            <select id="year-from-select" name="year-from" onChange={handleYearFromChange}>
                <option value="">Please choose a year</option>
                {
                    Array.from(new Array(224),(val,index)=>index+1800).map((year) => {
                        return <option key={year} value={year}>{year}</option>;
                    })
                }
            </select>
            <select id="year-end-select" name="year-end" onChange={handleYearEndChange}>
                <option value="">Please choose a year</option>
                {
                    Array.from(new Array(224),(val,index)=>index+1800).map((year) => {
                        return <option key={year} value={year}>{year}</option>;
                    })
                }
            </select>

            <label htmlFor="language-select">Choose a Language:</label>
            <select id="language-select" name="language" onChange={handleLanguage}>
                <option value="">Please choose a language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="ru">Russian</option>
            </select>
        </div>
    );
};

export default Filter;
