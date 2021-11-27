/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import config from '../config';

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
    const requestPromises = [
      fetch(`${config.API_URL}/api/artists`),
      fetch(`${config.API_URL}/api/albums/${id}`),
    ];
    Promise.all(requestPromises)
      .then(([artistsResponse, albumResponse]) => {
        if (!artistsResponse.ok) {
          setError(true);
          return artistsResponse.text().then((msg) => Promise.reject(new Error(msg)));
        }
        if (!albumResponse.ok) {
          setError(true);
          return albumResponse.text().then((msg) => Promise.reject(new Error(msg)));
        }
        return Promise.all([artistsResponse.json(), albumResponse.json()]);
      })
      .then(([artistsData, albumData]) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(artistsData, (_error, artistList) => setArtists(artistList));
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(albumData, (_error, albumInfo) => setAlbum(albumInfo));
      })
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
          artistId: Yup.number()
            .required('This field is required'),
          publishedAt: Yup.date()
            .required('This field is required'),
          cover: Yup.string(),
        })}
        onSubmit={async (values) => {
          setLoading(true);
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
            const response = await fetch(`${config.API_URL}/api/albums/${id}`, requestOptions);
            if (response.status !== 200) {
              setError(true);
              const err = await response.text();
              throw new Error(err);
            } else {
              navigate(`/albums/${id}`);
            }
          } catch (err) {
            setMessage(err.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="artistId">Artist:</label>
              <Field name="artistId" as="select">
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                    {' '}
                  </option>
                ))}
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
              {errors.publishedAt && touched.publishedAt && (
                <div>{errors.publishedAt}</div>
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
              <button type="submit">Update album</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
}
