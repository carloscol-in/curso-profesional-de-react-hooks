import { useState, useEffect, useReducer } from 'react'

const initialState = {
  favorites: [],
}

const favoriteReducer = (state, action) => {
  let newState = {}

  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      newState = {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
      break
    default:
      newState = { ...state }
      break
  }

  return newState
}

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results))

    return () => { }
  }, [])

  const handleClick = (favorite) => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  return (
    <>
      <div className="Characters">

        {favorites.favorites.map(favorite => (
          <li key={favorite.id}>
            {favorite.name}
          </li>
        ))}

        {characters.map(character => (
          <div className="item" key={character.id}>
            <h2>
              {character.name}
            </h2>

            <button type="button" onClick={() => handleClick(character)}></button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Characters;
