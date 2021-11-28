/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import config from '../config';

export default function CreateAlbum() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [artists, setArtists] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/artists`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          response.text().then((msg) => Promise.reject(new Error(msg)));
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' })
        .deserialize(data, (_error, artistList) => setArtists(artistList)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="form">
      <Formik
        initialValues={{
          artistId: '',
          name: '',
          publishedAt: '',
        }}
        validationSchema={Yup.object({
          artistId: Yup.number()
            .required('This field is required'),
          name: Yup.string()
            .required('This field is required'),
          publishedAt: Yup.date()
            .required('This field is required'),
          cover: Yup.string(),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.access_token}`,
            },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${config.API_URL}/api/albums`, requestOptions);
            if (response.status !== 201) {
              setError(true);
              const err = await response.text();
              throw new Error(err);
            }
            navigate('/albums');
          } catch (err) {
            setMessage(err.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="artistId">Artist:</label>
              <Field name="artistId" as="select">
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </Field>
              {errors.artistId && touched.artistId && (
                <div>{errors.artistId}</div>
              )}
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" placeholder="Name" />
              {errors.name && touched.name && (
                <div>{errors.name}</div>
              )}
            </div>
            <div>
              <label htmlFor="publishedAt"> Published at</label>
              <Field name="publishedAt" type="date" />
              {errors.publishedAt && touched.publishedAt && (
                <div>{errors.publishedAt}</div>
              )}
            </div>
            <div>
              <button type="submit">Create Album</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
}
