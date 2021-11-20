/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useMemo } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';

const initialValues = {
  name: '',
  origin: '',
  genres: '',
  foundedIn: '',
  members: '',
};

export default function CreateArtist({ addArtist }) {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
      body: JSON.stringify(values),
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/artists`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' })
          .deserialize(data, (_error, artist) => addArtist(artist));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setValues(initialValues);
        setLoading(false);
      });
  };

  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const isDisabled = useMemo(
    () => !(values.name && values.origin && values.genres && values.foundedIn && values.members),
    [values],
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Create an Artist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="origin">Origin:</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={values.origin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="genres">Genre:</label>
          <input
            type="text"
            id="genres"
            name="genres"
            value={values.genres}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="foundedIn">Foundation date:</label>
          <input
            type="number"
            id="foundedIn"
            name="foundedIn"
            value={values.foundedIn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="members">Members:</label>
          <input
            type="text"
            id="members"
            name="members"
            value={values.members}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" disabled={isDisabled}>Create</button>
        </div>
        {error && <p>Something went wrong, please try again later :(</p>}
      </form>
    </div>
  );
}
