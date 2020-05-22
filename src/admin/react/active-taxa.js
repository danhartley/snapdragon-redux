import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { itemProperties } from 'ui/helpers/data-checking';

export const renderActiveTaxa = () => {

  const PLACE_HOLDER = '--- ----';

  const displaySpecies = species => {
    return !!species.vernacularName
      ? `${species.name} (${species.vernacularName})`
      : species.name === PLACE_HOLDER 
        ? PLACE_HOLDER
        : `${species.name} (${itemProperties.getVernacularName(species, { language: 'en'})})`;
  }

  const Active = ({label, children}) => <div><span>{label}:</span><span className="feedback">{children}</span></div>
  // const Active = props => <div><span>{props.label}:</span><span className="feedback">{props.children}</span></div>

  const ActiveSpecies = () => {

    let [ species, setSpecies ] = useState({ name: PLACE_HOLDER});

    useEffect(() => {
      const updateHandler = e => {
        if(window.snapdragon.species) {
          setSpecies(window.snapdragon.species);
        }
      };
      window.addEventListener('click', updateHandler, false);
      window.addEventListener('keyup', event => {
        if(event.key === 'Enter') {
          setTimeout(() => {
            updateHandler();
          }, 500);
        }
      });
    }, [species]);
    
    return (
      <Active label="Active Species">{displaySpecies(species)}</Active>
    );
    
  };
  
  const ActiveCollection = () => {

    let [ collection, setCollection ] = useState({ name: PLACE_HOLDER});

    useEffect(() => {
      const updateHandler = e => {
        if(window.snapdragon.collection) {
          setCollection(window.snapdragon.collection);
        }
      };
      window.addEventListener('click', updateHandler, false);
      window.addEventListener('keyup', event => {
        if(event.key === 'Enter') {
          setTimeout(() => {
            updateHandler();
          }, 500);
        }
      });
    });
    
    return (
      <Active label="Active Collection">{collection.name}</Active>
    );
    
  };
  
  const activeSpeciesDisplay = document.querySelector('#activeSpeciesDisplay');
  ReactDOM.render(<ActiveSpecies />, activeSpeciesDisplay);
  
  const activeCollectionDisplay = document.querySelector('#activeCollectionDisplay');
  ReactDOM.render(<ActiveCollection />, activeCollectionDisplay);
};