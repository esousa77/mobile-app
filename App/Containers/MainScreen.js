// @flow
import React, { Component } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import SearchBar from '../Components/SearchBar'
import Section from '../Components/Section'
import ImageButton from '../Components/ImageButton'
import _ from 'lodash'
import { SearchBarSelectors, CandidatesSelectors } from '../Selectors'
import SearchBarActions from '../Redux/SearchBarRedux'
import CandidateActions from '../Redux/CandidateRedux'
import { developmentAlert } from '../Lib/Utils'

// Styles
import styles from './Styles/MainScreenStyle'
import { Images, Colors } from '../Themes'
import type { CandidatesType, CandidateType } from '../Redux/CandidatosRedux'

type Props = {
  fetching: boolean,
  candidates: CandidatesType,
  searchQuery: string,
  searchBarSuggestions: Array<CandidateType>,
  onChangeSearchQuery: string => mixed,
  getCandidateProfile: number => mixed
}

class MainScreen extends Component<Props> {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const {
      fetching,
      candidates,
      searchQuery,
      searchBarSuggestions,
      onChangeSearchQuery,
      getCandidateProfile
    } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageButton source={Images.menu} style={styles.filtersButton} onPress={developmentAlert} />
          <View style={styles.verticalSeparator} />
          <SearchBar
            query={searchQuery}
            showSuggestions={false}
            onChange={onChangeSearchQuery}
            onChoose={developmentAlert}
            suggestions={searchBarSuggestions}
            placeholder={'Você conhece o seu candidato?'}
          />
        </View>
        {fetching || !candidates ? (
          <View style={styles.fetchingContainer}>
            <ActivityIndicator color={Colors.text} size={'large'} />
          </View>
        ) : (
          <FlatList
            bounces
            contentContainerStyle={styles.content}
            data={Object.keys(candidates)}
            showsHorizontalScrollIndicator={false}
            keyExtractor={role => `${role}`}
            renderItem={({ item: role }: { item: CandidateType }) => (
              <Section data={candidates[role]} title={_.startCase(role)} onPressCandidate={getCandidateProfile} />
            )}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    candidates: CandidatesSelectors.filterResults(state),
    fetching: state.candidatos.fetching,
    searchQuery: state.searchBar.query,
    searchBarSuggestions: SearchBarSelectors.fetchSuggestions(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeSearchQuery: query => dispatch(SearchBarActions.searchBarChange(query)),
    getCandidateProfile: id => dispatch(CandidateActions.candidateRequest(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
