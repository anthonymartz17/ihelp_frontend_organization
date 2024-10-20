import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function RewardDetailPage() {

  const { id } = useParams();
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/rewards/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching reward details");
        }
        const data = await response.json();
        setReward(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReward();
    }, [id]);
    if (loading) {
      return <p>Loading reward details...</p>;
    } 

  if (error) {
      return <p>Error: {error}</p>;
    }
    
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Reward Details</h1>
        {reward ? (
          <div className="border rounded-lg shadow p-4">
            <h2 className="text-2xl font-bold mb-2">
              Reward ID: {reward.id}
            </h2>
            <p>
              <strong>Name:</strong> {reward.name}
            </p>
            <p>
              <strong>Description:</strong> {reward.description}
            </p>
            <p>
              <strong>Points Required:</strong> {reward.points_required}
            </p>
            <p>
              <strong>Quantity Available:</strong> {reward.quantity_available}
            </p>
            <p>
              <strong>Organization:</strong> {reward.organization_id}
            </p>
          </div>
        ) : (
          <p>No reward details found.</p>
        )}
      </div>
      );
     }

  