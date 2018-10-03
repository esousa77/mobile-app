import { call, put, select } from 'redux-saga/effects'
import CandidatesActions from '../Redux/CandidatesRedux'
import { SearchFiltersSelectors } from '../Selectors'
import { generateCandidatesQueryWithFilters } from '../Lib/Utils'

export function * getCandidates (api, { options }) {
  const query = generateCandidatesQueryWithFilters(options)
  const response = yield call(api.getCandidates, query)
  const key = yield select(SearchFiltersSelectors.getSearchFilterKey)

  if (response.ok) {
    yield put(CandidatesActions.candidatesSuccess(key, response.data))
  } else {
    yield put(CandidatesActions.candidatesFailure(key))
  }
}
