import { React, useState } from 'react'
import { ListData } from "./ListData.js"

function List(query) {

    const processedQuery = ListData.filter((el) =>
    {
        //return el;
        if(query.input == '')
        {
            return el;
        }
        return el.text.toLowerCase().includes(query.input);
    })

    return (
        <ul>
            {processedQuery.map((item) =>
                (
                    <li key={item.id}>{item.text}</li>
                ))
            }
        </ul>
    )
}

export default List
