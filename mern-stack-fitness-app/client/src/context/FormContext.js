import React, { createContext, useState } from 'react'

const FormContext = createContext()

export const FormContextProvider = (props) => {
	const [data, setData] = useState({});

	const getData = (values) => {
		setData(prevData => ({
			...prevData,
			...values
		}));
	}

	return (
		<FormContext.Provider value={{data, getData}}>
			{props.children}
		</FormContext.Provider>
	);
} 

export default FormContext;
