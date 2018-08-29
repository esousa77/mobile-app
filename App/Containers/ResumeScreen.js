// @flow
import React, { Component } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { CandidateSelectors, CandidacySelectors, ProjectProposalsSelectors, SummarySelectors } from '../Selectors'
import ProfileCard from '../Components/ProfileCard'
import CandidacyCard from '../Components/CandidacyCard'
import { Images } from '../Themes'

// Styles
import styles from './Styles/ResumeScreenStyle'
import type { CandidateProfileType } from '../Redux/CandidateRedux'
import type { CandidacyType } from '../Redux/CandidacyRedux'
import { ProjectsType } from '../Redux/ProjectProposalRedux'
import { generateProjectProposalKey } from '../Lib/Utils'
import SummaryCard from '../Components/SummaryCard'
import type { SummaryType } from '../Redux/SummaryRedux'

type Props = {
  navigation: any,
  fetchingCandidate: ?boolean,
  candidateProfile: CandidateProfileType,
  fetchingCandidacies: ?boolean,
  candidacties: CandidacyType,
  getProposals: string => ProjectsType,
  summary: SummaryType,
  fetchingSummary: ?boolean
}

class ResumeScreen extends Component<Props> {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const {
      candidacies,
      candidateProfile,
      navigation,
      fetchingCandidacies,
      getProposals,
      summary,
      fetchingSummary
    } = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={Images.arrowLeft} resizeMode={'contain'} style={styles.backImage} />
            <Text style={styles.backText}>Candidatos</Text>
          </TouchableOpacity>
          <Image source={Images.logo} resizeMode={'contain'} style={styles.logo} />
        </View>
        <ProfileCard candidate={candidateProfile} />
        {summary && <Text style={styles.sectionTitle}>RESUMO</Text>}
        {summary && <SummaryCard data={summary} fetching={fetchingSummary} />}
        {candidacies && candidacies.length && <Text style={styles.sectionTitle}>CANDIDATURAS</Text>}
        {candidacies &&
          candidacies.map(candidacy => {
            const key = generateProjectProposalKey(candidacy.idCandidato, candidacy.anoEleicao, candidacy.cargo)
            return (
              <CandidacyCard
                candidacy={candidacy}
                projectProposals={getProposals(key)}
                key={key}
                fetching={fetchingCandidacies}
              />
            )
          })}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetchingCandidate: CandidateSelectors.fetchingCandidate(state),
    candidateProfile: CandidateSelectors.getSelectedCandidate(state),
    fetchingCandidacies: CandidacySelectors.fetchingCandidacies(state),
    candidacies: CandidacySelectors.getCandidacies(state),
    getProposals: key => ProjectProposalsSelectors.getProposals(state, key),
    summary: SummarySelectors.getSummary(state),
    fetchingSummary: SummarySelectors.fetching(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResumeScreen)
