import React, { useEffect } from 'react';

export default function Input(props: any) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.getData(e.target.value);
    }

    let field = props.value;

    useEffect(() => {
        field = props.value
    }, [props.value]);

    return (
        <input
         type="text"
         className={"input " + field}
         value={field}
         name="Input"
         onFocus = {e => e.target.value == props.value ? e.target.value = '' : props.value}
         placeholder={props.title}
         onChange={handleChange}
        ></input>
    )
}