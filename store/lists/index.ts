import { getModule, Module, MutationAction, VuexModule, VuexMutation } from 'nuxt-property-decorator'
import { $axios } from '~/assets/api'
import { store } from '~/store'

interface List {
  id: string
  ownerId: string
  permissions: string[]
  name: string
}

@Module({ name: 'lists', namespaced: true, stateFactory: true, dynamic: true, store })
class ListStore extends VuexModule {
  _lists: List[] = []

  get lists () {
    return this._lists
  }

  @MutationAction({ mutate: ['_lists'] })
  async fetchLists () {
    return {
      _lists: (await $axios.get('/api/shopping-lists')).data
    }
  }

  @VuexMutation
  setLists (lists: List[]) {
    this._lists = lists
  }
}

export const listStore = getModule(ListStore)
