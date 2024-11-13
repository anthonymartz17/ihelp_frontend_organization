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

	function commitTask(request) {
		setRequests((prev) =>
			prev.map((req) => {
				if (req.id === request.requestId) {
					const updatedRequest = {
						...req,
						assigned_tasks: req.assigned_tasks + 1,
					};
					console.log(prev);
					console.log(updatedRequest,'updated');

					if (updatedRequest.assigned_tasks === updatedRequest.total_tasks) {
						const assignedStatusId = 2;
						updatedRequest.status_id = assignedStatusId;
						updatedRequest.status_name = "ASSIGNED";
					}
					return updatedRequest;
				} else {
					return req;
				}
			})
		);
		console.log(requests)
	}
	useEffect(() => {
		getRequests();
	}, []);

	const contextValue = {
		requests,
		loading,
		error,
		setRequests,
		getRequests,
		commitTask,
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
