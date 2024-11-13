import { createContext, useContext, useEffect, useState } from "react";
import { fetchRequests } from "../services/requestServices";

const RequestContext = createContext({});

export function RequestContextProvider({ children }) {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function getRequests() {
		const token = localStorage.getItem("token");
		setLoading(true);
		try {
			const data = await fetchRequests(token);
			setRequests(data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		getRequests();
	}, []);

	const contextValue = {
		requests,
		loading,
		error,
    setRequests,
    getRequests
	};

	return (
		<RequestContext.Provider value={contextValue}>
			{children}
		</RequestContext.Provider>
	);
}

export function useRequestsContext() {
	return useContext(RequestContext);
}
