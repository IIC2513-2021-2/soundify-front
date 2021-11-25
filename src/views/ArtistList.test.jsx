import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import AppRoutes from '../AppRoutes';

function TestRouter({ path }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  );
}

const artist1 = {
  type: 'artists',
  id: '1',
  attributes: {
    name: 'Tame Impala',
    origin: 'Perth, Australia',
    genres: 'Psychedelic pop, psychedelic rock, disco, synth-pop, neo-psychedelia',
    foundedIn: 2007,
    members: 'Kevin Parker',
  },
};

const artist2 = {
  type: 'artists',
  id: '2',
  attributes: {
    name: 'Khruangbin',
    origin: 'Houston, Texas, United States',
    genres: 'Psychedelic rock, surf rock, funk, instrumental rock, dub, rock',
    foundedIn: 2009,
    members: 'Laura Lee, Mark Speer, Donald "DJ" Johnson',
  },
};

const user = {
  firstName: 'Test',
  lastName: 'Dummy',
  email: 'TestDummy@gmail.com',
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2MzcxNzczNjcsImV4cCI6MTYzNzI2Mzc2N30.LveWBdgcSsgSnEFDbmxpt-aFnq9Q3_cJmQSJJ9tARHk',
  token_type: 'Bearer',
};

const sessionExpiration = new Date(
  new Date().getTime() + 1000 * 60 * 60 * 24, // One day in the future
);

const testResponse = {
  data: [artist1, artist2],
};

const localStorageMapping = {
  user,
  sessionExpiration,
};

const server = setupServer(
  rest.get('http://localhost:3000/api/artists', (req, res, ctx) => res(ctx.json(testResponse))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ArtistList', () => {
  describe('when user is not logged in', () => {
    it('renders the artist list data', async () => {
      render(<TestRouter path="/artists" />);
      const loadingText = screen.getByText(/Loading/i);
      await waitFor(() => {
        expect(loadingText).not.toBeInTheDocument();
      });

      const linkElement1 = screen.getByText(/Tame Impala/i);
      const linkElement2 = screen.getByText(/Khruangbin/i);
      expect(linkElement1).toBeInTheDocument();
      expect(linkElement2).toBeInTheDocument();
    });
    it('renders the not login message', async () => {
      render(<TestRouter path="/artists" />);
      const loadingText = screen.getByText(/Loading/i);
      await waitFor(() => {
        expect(loadingText).not.toBeInTheDocument();
      });

      const loginMessage = screen.getByText(/Log in to create a new artist/i);
      expect(loginMessage).toBeInTheDocument();
    })
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      global.Storage.prototype.getItem = jest.fn(
        (key) => JSON.stringify(localStorageMapping[key]),
      );
    });
    afterEach(() => {
      global.Storage.prototype.getItem.mockReset();
    });
    it('renders the artist list data', async () => {
      render(<TestRouter path="/artists" />);
      const loadingText = screen.getByText(/Loading/i);
      await waitFor(() => {
        expect(loadingText).not.toBeInTheDocument();
      });

      const linkElement1 = screen.getByText(/Tame Impala/i);
      const linkElement2 = screen.getByText(/Khruangbin/i);
      expect(linkElement1).toBeInTheDocument();
      expect(linkElement2).toBeInTheDocument();
    });
    it('does not render the not login message', async () => {
      render(<TestRouter path="/artists" />);
      const loadingText = screen.getByText(/Loading/i);
      await waitFor(() => {
        expect(loadingText).not.toBeInTheDocument();
      });

      const loginMessage = screen.queryByText(/Log in to create a new artist/i);
      expect(loginMessage).not.toBeInTheDocument();
    });
  });

  describe('when error in server is present', () => {
    it('does not load artists', async () => {
      server.use(
        rest.get('http://localhost:3000/api/artists', (req, res, ctx) => res(ctx.status(500))),
      );
      render(<TestRouter path="/artists" />);
      const loadingText = screen.getByText(/Loading/i);
      await waitFor(() => {
        expect(loadingText).not.toBeInTheDocument();
      });

      const errorMessage = screen.getByText(/Error/i);
      const linkelement = screen.queryByText(/Tame Impala/i);

      expect(errorMessage).toBeInTheDocument();
      expect(linkelement).not.toBeInTheDocument();
    });
  });
});
