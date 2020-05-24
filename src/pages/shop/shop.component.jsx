import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import {fetchCollectionsStart} from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {
  state = {thisloading: true};
  
  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const {fetchCollectionsStart} = this.props;
    fetchCollectionsStart();
  }

//  USING FETCH API
  // fetch('https://firestore.googleapis.com/v1/projects/crown-db-2f3ca/databases/(default)/documents/collections')
  //     .then(res => res.json())
  //     .then(collections => console.log(collections))

  // PROMISES
  
  // collectionRef.get().then(snapShot => {
  //   const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
  //   updateCollections(collectionsMap);
  //   this.setState({ loading: false })
  // });

  // componentDidMount() {
  //   const {updateCollections} = this.props;
  //   const collectionRef = firestore.collection('collections');

  //   this.unsubscribeFromSnapShot = collectionRef.onSnapshot(
  //     async (snapShot) => {
  //       const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
  //       updateCollections(collectionsMap);
  //       this.setState({ loading: false })
  //     }
  //   );
  // }

  render() {
    const {match } = this.props;

    return (
      <div className='shop-page'>
        <Route 
          exact path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
