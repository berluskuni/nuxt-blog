
const posts = [
  {title: 'Post 1', date: new Date(), views: 22, comments: [1, 2], _id: '2345'},
  {title: 'Post 2', date: new Date(), views: 22, comments: [1, 2], _id: '2443'}
]

export const actions = {
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('/api/post/admin')
    } catch  (e) {
      commit('setError', e, {root:true})
    }
  },
  async fetch({commit}) {
    try {
      return await this.$axios.$get('/api/post')
    } catch  (e) {
      commit('setError', e, {root:true})
    }
  },
  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`)
    } catch  (e) {
      commit('setError', e, {root:true})
    }
  },
  async update({commit}, {id, text}) {
    try {
      return await this.$axios.$put(`/api/post/admin/${id}`, {text})
    } catch  (e) {
      commit('setError', e, {root:true})
    }
  },
  async create({commit}, {title, text, image}) {
    try {
      let fd = new FormData()
      fd.append('image', image, image.name)
      fd.append('title', title)
      fd.append('text', text)
      return await this.$axios.$post('/api/post/admin', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (e) {
      commit('setError', e, {root:true})
      throw e
    }
  },
  async fetchAdminById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`)
    } catch  (e) {
      commit('setError', e, {root:true})
      throw e
    }
  },
  async fetchById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch  (e) {
      commit('setError', e, {root:true})
      throw e
    }
  },
  async addView({commit}, {views, _id} ) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, {views})
    } catch  (e) {
      commit('setError', e, {root:true})
      throw e
    }
  },
  async getAnalytics({commit}) {
    try {
      return await this.$axios.$get('/api/post/admin/get/analytics')
    } catch (e) {
      commit('setError', e, {root:true})
      throw e
    }
  }
}
