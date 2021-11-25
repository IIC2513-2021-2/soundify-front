/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config';
import useAuth from '../hooks/useAuth';

export default function PatchAlbum() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [artists, setArtists] = useState([]);
  const [album, setAlbum] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/artists`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, artistList) => setArtists(artistList)))
      .catch(() => setError(true));
    fetch(`${config.API_URL}/api/albums/${id}`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, albumInfo) => setAlbum(albumInfo)))
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
          artistId: album?.artistId,
          name: album?.name,
          publishedAt: album?.publishedAt,
          cover: album?.cover,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('This field is required'),
          publishedAt: Yup.date()
            .required('This field is required'),
          cover: Yup.string(),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          console.log(values);
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
          });
          const requestOptions = {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${currentUser?.access_token}`,
            },
            body: formData,
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/albums/${id}`, requestOptions);
            if (response.status !== 201) {
              setError(true);
              const err = await response.text();
              throw new Error(err);
            }
          } catch (err) {
            setMessage(err.message);
          } finally {
            setLoading(false);
            navigate(`/albums/${id}`);
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="Artist">Artist:</label>
              <Field name="artistId" as="select">
                {artists.map((artist) => <option key={artist.name} value={artist.id}>{artist.name} </option>)}
              </Field>
              {errors.artistId && touched.artistId && (
                <div>{errors.artistId}</div>
              )}
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" placeholder={album?.name} />
              {errors.name && touched.name && (
                <div>{errors.name}</div>
              )}
            </div>
            <div>
              <label htmlFor="publishedAt" placeholder={album?.publishedAt}> Published at</label>
              <Field name="publishedAt" type="date" />
              {errors.email && touched.email && (
                <div>{errors.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="cover"> Cover</label>
              <input
                type="file"
                id="cover"
                name="cover"
                onChange={(event) => {
                  setFieldValue('cover', event.currentTarget.files[0]);
                }}
              />
            </div>
            <div>
              <button type="submit">Patch album</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
}
