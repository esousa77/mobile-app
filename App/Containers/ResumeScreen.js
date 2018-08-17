// @flow
import React, { Component } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { CandidateSelectors } from '../Selectors'
import ProfileCard from '../Components/ProfileCard'
import { Images } from '../Themes'

// Styles
import styles from './Styles/ResumeScreenStyle'
import type { CandidateProfileType } from '../Redux/CandidateRedux'

type Props = {
  navigation: any,
  candidateProfile: CandidateProfileType
}

class ResumeScreen extends Component<Props> {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const {
      candidateProfile,
      navigation: { navigate }
    } = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('MainScreen')} style={styles.backButton}>
            <Image source={Images.arrowLeft} resizeMode={'contain'} style={styles.backImage} />
            <Text style={styles.backText}>Candidatos</Text>
          </TouchableOpacity>
          <Image source={Images.logo} resizeMode={'contain'} style={styles.logo} />
        </View>
        <ProfileCard candidate={candidateProfile} source={''} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    candidateProfile: CandidateSelectors.getSelectedCandidate(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResumeScreen)
