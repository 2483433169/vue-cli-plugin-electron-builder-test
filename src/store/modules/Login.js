const state = {
  access_token: ''
}
const mutations = {
  SET_ACCESS_TOKEN (state, access_token) {
    console.log(access_token, 'access_token')
    state.access_token = access_token
  }
}

const actions = {
  LOGIN_IN (context, access_token) {
    context.commit('SET_ACCESS_TOKEN', access_token)
  },
  LOGIN_OUT (context) {
    context.commit('SET_ACCESS_TOKEN', '')
  }

}

export default {
  state,
  mutations,
  actions
}
