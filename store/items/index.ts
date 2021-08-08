import { getModule, Module, MutationAction, VuexModule, VuexMutation } from 'nuxt-property-decorator'
import { $axios } from '~/assets/api'
import { store } from '~/store'

interface Item {
  id: string
  ownerId: string
  name: string
}

@Module({ name: 'items', namespaced: true, stateFactory: true, dynamic: true, store })
export default class ItemStore extends VuexModule {
  _items: Item[] = []

  get items () {
    return this._items
  }

  get item () {
    return (id: string) => this._items.find(item => item.id === id)
  }

  @MutationAction({ mutate: ['_items'] })
  async fetchItems (listId: string) {
    return {
      _items: (await $axios.get(`/api/shopping-lists/${listId}/items`)).data
    }
  }

  @VuexMutation
  setLists (items: Item[]) {
    this._items = items
  }
}

export const itemStore = getModule(ItemStore)
