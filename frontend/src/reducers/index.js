import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import articles from 'reducers/articles/articlesReducers';

import tags from 'reducers/tags/tagsReducers';

import categories from 'reducers/categories/categoriesReducers';

import comments from 'reducers/comments/commentsReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    articles,

    tags,

    categories,

    comments,
  });
