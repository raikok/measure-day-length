import React from "react";
/**
 * Used for getting latitude and longitude information from user.
 */
export default function Input(props: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Calls parent callback (so as to change values in Container.tsx).
    props.getData(e.target.value);
  };

  let field = props.value;

  return (
    <input
      type="text"
      className={"input " + field}
      value={field}
      name="Input"
      onFocus={(e) =>
        e.target.value == props.value ? (e.target.value = "") : props.value
      } // When selected, delete the value that was automatically placed there. /todo get value back on blur
      onBlur={() => (field = props.value)} // I think this works on other button presses? Not sure as of yet.
      placeholder={props.title}
      onChange={handleChange}
    ></input>
  );
}
