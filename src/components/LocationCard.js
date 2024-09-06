import React from 'react';

function LocationCard({ location }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{location.name}</h5>
        <p className="card-text">Description: {location.description}</p>
        </div>
</div>

    ); }