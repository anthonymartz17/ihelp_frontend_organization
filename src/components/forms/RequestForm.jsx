import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../services/RequestServices";

export default function RequestForm({ initialData = {}, onSubmit }) {
	const today = new Date().toISOString().split("T")[0];

	const [formData, setFormData] = useState({
		requester: initialData.requester || "",
		category: initialData.category || "",
		description: initialData.description || "",
		due_date: initialData.due_date || today,
		tasks: initialData.tasks || [],
		hours_needed: initialData.hours_needed || "",
	});

	const [taskInput, setTaskInput] = useState({ task: "", points: "" });
	const [requesters, setRequesters] = useState([]);

	// const categories = [
	// 	{ key: 1, value: "Various" },
	// 	{ key: 2, value: "Errands" },
	// 	{ key: 3, value: "Technology" },
	// 	{ key: 4, value: "Cleaning" },
	// 	{ key: 5, value: "Pets" },
	// 	{ key: 6, value: "Gardening" },
	// 	{ key: 7, value: "Tutoring" },
	// 	{ key: 8, value: "Meal Prep" },
	// 	{ key: 9, value: "Event Setup" },
	// 	{ key: 10, value: "Delivery" },
	// 	{ key: 11, value: "Sports Coaching" },
	// 	{ key: 12, value: "Crafts" },
	// 	{ key: 13, value: "Office Assistance" },
	// ];

	const [categories, setCategories] = useState([]);

	async function getCategories() {
		try {
			const categoriesData = await fetchCategories();
			setCategories(categoriesData);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		getCategories(token);
	}, []);
	useEffect(() => {
		const fetchRequesters = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/requesters`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						`Failed to fetch requesters: ${response.status} ${errorData.message}`
					);
				}

				const data = await response.json();
				setRequesters(data);
			} catch (error) {
				console.error("Error fetching requesters:", error.message);
			}
		};

		fetchRequesters();
	}, []);

	const handleAddTask = () => {
		if (taskInput.task && taskInput.points) {
			setFormData((prev) => ({
				...prev,
				tasks: [
					...prev.tasks,
					{
						...taskInput,
						volunteer: null,
					},
				],
			}));
			setTaskInput({ task: "", points: "" });
		}
	};

	const handleDeleteTask = (index) => {
		setFormData((prev) => ({
			...prev,
			tasks: prev.tasks.filter((_, i) => i !== index),
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit(formData);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<form className="w-[100%] p-[5px_20px]" onSubmit={handleSubmit}>
				<div className="flex gap-4">
					<div className="p-2 w-[50%]">
						<div className="flex items-center gap-7 mb-3">
							<label className="w-[50%]">
								Requester
								<br />
								<select
									name="requester"
									value={formData.requester}
									onChange={handleChange}
									className="border border-gray-500 rounded-md p-[5px_10px] w-[100%] mt-[3%]"
								>
									<option disabled value="">
										Select
									</option>
									{requesters.map((requester) => (
										<option key={requester.id} value={requester.id}>
											{requester.first_name} {requester.last_name}
										</option>
									))}
								</select>
							</label>

							<label className="w-[50%]">
								Category
								<br />
								<select
									name="category"
									value={formData.category}
									onChange={handleChange}
									className="border border-gray-500 rounded-md p-[5px_10px] w-[100%] mt-[3%]"
								>
									<option disabled value="">
										Select
									</option>
									{categories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</label>
						</div>

						<div className="flex flex-col gap-4">
							<label className="flex flex-col gap-2">
								General Description
								<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									className="border border-gray-500 rounded-md p-[5px_10px] w-[100%] resize-none h-[300px] overflow-scroll"
									placeholder="Write your description..."
									style={{ maxHeight: "150px" }}
								/>
							</label>

							<div className="flex items-center gap-7">
								<label className="flex flex-col gap-2">
									Due Date
									<input
										type="date"
										name="due_date"
										value={formData.due_date}
										onChange={handleChange}
										className="border border-gray-500 rounded-md p-[5px_10px] w-[100%]"
									/>
								</label>
								<label className="flex flex-col gap-2">
									Hours Required
									<input
										type="number"
										name="hours_needed"
										value={formData.hours_needed}
										onChange={handleChange}
										className="border border-gray-500 rounded-md p-[5px_10px] w-[100%]"
									/>
								</label>
							</div>
						</div>
					</div>

					<div className="p-2 w-[50%]">
						<h3>Tasks</h3>
						<div className="border border-gray-500 rounded-lg px-7 py-4 mt-[1%] h-[90%]">
							<div className="grid grid-cols-[6fr_1fr_1fr] gap-4 mb-4">
								<input
									type="text"
									placeholder="Describe Task"
									value={taskInput.task}
									onChange={(e) =>
										setTaskInput({ ...taskInput, task: e.target.value })
									}
									className="border border-gray-500 rounded-md p-[5px_10px]"
								/>
								<input
									type="number"
									placeholder="Points"
									value={taskInput.points}
									onChange={(e) =>
										setTaskInput({ ...taskInput, points: e.target.value })
									}
									className="border border-gray-500 rounded-md p-[5px_10px]"
								/>
								<button
									type="button"
									className="bg-[#46494C] text-white rounded-md p-[5px_10px]"
									onClick={handleAddTask}
								>
									Add
								</button>
							</div>

							<ul className="list-disc pl-5 space-y-2">
								{formData.tasks.map((task, index) => (
									<li key={index} className="flex justify-between items-center">
										<span>
											{task.task} - {task.points} Points
										</span>
										<button
											type="button"
											className="text-red-500"
											onClick={() => handleDeleteTask(index)}
										>
											Delete
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className="flex justify-end w-[100%] mt-[1.5%]">
					<button
						type="submit"
						className="bg-[#1985A1] text-white rounded-lg p-[5px_20px]"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
