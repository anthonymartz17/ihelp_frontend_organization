import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VolunteerDetailPage() {
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/volunteers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching volunteer details");
        }
        const data = await response.json();
        setVolunteer(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);  
      }
      };

      fetchVolunteer();
    }, [id]);

      if (loading) {
        return <p>Loading volunteer details...</p>;
      }

      if (error) {
        return <p>Error: {error}</p>;
      }

      return (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-semibold mb-4">
            Volunteer Details
          </h1>
          {volunteer ? (
            <div className="border rounded-lg shadow p-4">
              <h2 className="text-2xl font-bold mb-2">
                Volunteer ID: {volunteer.id}
              </h2>
              <p>
                <strong>Name:</strong> {volunteer.name}
              </p>
              <p>
                <strong>Email:</strong> {volunteer.email}
              </p>
              <p>
                <strong>Age:</strong> {volunteer.age}
              </p>
              <p>
                <strong>Points Earned:</strong> {volunteer.points_earned}
              </p>
            </div>
          ) : (
            <p>No volunteer details found.</p>
          )}
        </div>
      );
     }