import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

import PropTypes from 'prop-types';

const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-centre'>
          <img
            src={avatar_url}
            className='round-img'
            alt='user'
            style={{ width: '180px' }}
          />
          <h1 style={{ maxWidth: '180px', textAlign: 'center' }}>{name}</h1>
          <a
            href={html_url}
            className='btn btn-dark my-1'
            style={{
              display: 'block',
              maxWidth: '180px',
              textAlign: 'center',
              borderRadius: '100px',
            }}
          >
            View on GitHub
          </a>
        </div>
        <div>
          <ul>
            <li className='smy-3px'>
              {bio && (
                <Fragment>
                  <strong>Bio:</strong> {login}
                </Fragment>
              )}
            </li>
            <li className='smy-3px'>
              {login && (
                <Fragment>
                  <strong>location:</strong> {location}
                </Fragment>
              )}
            </li>
            <li className='smy-3px'>
              {blog && (
                <Fragment>
                  <strong>blog:</strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-dark'>Following: {following}</div>
        <div className='badge badge-success'>Public repos: {public_repos}</div>
        <div className='badge badge-warn'>Public gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

export default User;
