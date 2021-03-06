// @flow
import React, { Component } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import { openExternalApp, requireAndroidLocationPermission } from '../Lib/Utils'
import SearchFiltersActions from '../Redux/SearchFiltersRedux'
import { resetAction } from '../Navigation/NavigationActions'

// Styles
import styles from './Styles/WelcomeScreenStyle'
import { Images } from '../Themes'
import { SearchFiltersSelectors } from '../Selectors'

type Props = {
  stateInitials: ?string,
  requestState: ({ [string]: number }) => mixed,
  navigateForOptionsScreen: () => mixed
}

class WelcomeScreen extends Component<Props> {
  getUserLocation () {
    navigator.geolocation.getCurrentPosition(
      coords => {
        if (coords) {
          const { latitude: lat, longitude: lng } = coords
          this.props.requestState({ lat, lng })
        }
      },
      err => console.log(err),
      { enableHighAccuracy: true, timeout: 5000 }
    )
  }

  constructor (props: Props) {
    super(props)
    if (!props.stateInitials) {
      if (Platform.OS === 'android') {
        requireAndroidLocationPermission()
          .then(this.getUserLocation())
          .catch(err => console.log(err))
      } else {
        this.getUserLocation()
      }
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={Images.logoDescricao} resizeMode='contain' style={styles.logo} />
        </View>
        <View style={styles.body}>
          <Text style={styles.question}>LADDRES vem de ladrão?</Text>
          <Text style={styles.answer}>
            Não. LADDRES vem de Laboratório de Análise de Desempenho Dos REpresentantes da Sociedade. Por ter surgido no
            meio acadêmico, o nome do projeto tem como inspiração o currículo Lattes, sistema do CNPq desenvolvido para
            que possamos encontrar o histórico/currículo dos acadêmicos que atuam no Brasil.
          </Text>

          <Text style={styles.question}>De onde vocês tiraram as informações que estão no app?</Text>
          <Text style={styles.answer}>
            Todos os dados coletados pelo projeto estão disponíveis para consulta na internet. Após um trabalho de
            coleta e mineração dos dados abertos de órgãos do governo como o Tribunal Superior Eleitoral, a Câmara de
            Deputados e o Senado Federal; reportagens dos maiores jornais e veículos de informação do país; redes
            sociais de candidatos e partidos; além de parceiras com outros projetos, como o{' '}
            <Text
              style={styles.link}
              onPress={() => openExternalApp('http://www.vigieaqui.com.br/detectordefichadepolitico')}
            >
              VigieAqui
            </Text>
            , montamos uma base curricular para todos os candidatos que estão na disputa das eleições de 2018. Além
            disso, para deixar o processo ainda mais transparente, todos os algoritmos e sistemas desenvolvidos durante
            o processo estão disponíveis para análise e contribuição em{' '}
            <Text style={styles.link} onPress={() => openExternalApp('https://github.com/laddres')}>
              https://github.com/laddres
            </Text>
            .
          </Text>

          <Text style={styles.question}>O aplicativo mostra todos os dados desde a proclamação da república?</Text>
          <Text style={styles.answer}>
            Infelizmente, não. Apesar de o governo ter dados abertos anteriores a 1950, apenas os arquivos posteriores a
            2002 estão bem estruturados e refletem a realidade com precisão. Portanto, todos os dados disponíveis no app
            refletem a vida política dos candidatos a partir de 2003.{' '}
          </Text>

          <Text style={styles.question}>Processado = culpado?</Text>
          <Text style={styles.answer}>
            Não. E é importante ter isto em mente. Muitas vezes o candidato é réu em processo A ou B, mas, ao fim do
            julgamento consegue provar sua inocência. Como nosso objetivo é manter a transparência em todas as etapas, o
            projeto não apenas mostra o fato (ação judicial), mas também disponibiliza todas as fontes. Em caso de
            dúvida, basta acessar o link fornecido e acompanhar cada caso individualmente.
          </Text>
        </View>
        <TouchableOpacity onPress={this.props.navigateForOptionsScreen} style={styles.buttonNextStep}>
          <Text style={styles.buttonContent}>AVANÇAR</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  stateInitials: SearchFiltersSelectors.getStateInitials(state)
})

const mapDispatchToProps = dispatch => ({
  requestState: coordinates => dispatch(SearchFiltersActions.searchFiltersRequestState(coordinates)),
  navigateForOptionsScreen: () => dispatch(resetAction({ routeName: 'OptionsScreen' }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeScreen)
