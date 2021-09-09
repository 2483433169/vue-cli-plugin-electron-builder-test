const state = {
  isMaximized: false
}
const mutations = {
  SET_WIN_isMaximized (state, isMaximized) {
    state.isMaximized = isMaximized
    console.log(state.isMaximized, 'state.isMaximized')
  }
}

const actions = {
  DISPATCH_TO_SET_WIN_isMaximized (context, isMaximized) {
    context.commit('SET_WIN_isMaximized', isMaximized)
  }

}

export default {
  state,
  mutations,
  actions
}
