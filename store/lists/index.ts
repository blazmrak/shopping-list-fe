import {
  getModule,
  Module,
  MutationAction,
  VuexAction,
  VuexModule,
  VuexMutation
} from 'nuxt-property-decorator'
import { $axios } from '~/assets/api'
import { store } from '~/store'

export interface List {
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

  @VuexAction({ commit: 'addListLocal' })
  async create (param: { list: List }) {
    const listResult = await $axios.post('/api/shopping-lists', param.list)

    return listResult.data
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

  @VuexMutation
  addListLocal (list: List) {
    this._lists.push(list)
  }
}

export const listStore = getModule(ListStore)
