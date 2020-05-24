import {takeLatest, call, put} from 'redux-saga/effects';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils.js';
import {fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  yield console.log('Async fired');

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));

  } catch (err) {
    yield put(fetchCollectionsFailure(err.message));
  }

  //   collectionRef.get().then((snapShot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
  //     dispatch(fetchCollectionsSuccess(collectionsMap));
  //   }).catch(error => fetchCollectionsFailure(error.message))
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
