import React from 'react';

function CharacterCard({ character }) {
  return (
    <div className="card">
      <img src={character.image} alt={character.name} className="card-img-top" />
      <div className="card-body">
        <h6 className="card-title">{character.name}</h6>
        <p className="card-text">Status: {character.status}</p>
        <p className="card-text">Species: {character.species}</p>
        {character.location && (
          <p className="card-text">Location: {character.location.name}</p>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;
