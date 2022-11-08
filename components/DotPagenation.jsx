import React from 'react'

const DotPagenation = ({
    data,
    translate,
    handler,
    current
}) => {

    return (
        Object.keys(data).map((e, i) => (
            <button 
                disabled={translate !== 'null'} 
                key={i + 'page'} 
                className={'text-onyx'} 
                onClick={(e) => { (i != current) ? handler(e, i) : false }}>
                    {i === current ? '•' : '◦'}
            </button>
            ))
    )
}

export default DotPagenation