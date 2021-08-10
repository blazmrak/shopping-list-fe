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

export interface Item {
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

  @VuexAction({ commit: 'addItemLocal' })
  async create (param: { listId: string; item: Item }) {
    const itemResponse = await $axios.post(`/api/shopping-lists/${param.listId}/items`, param.item)

    return itemResponse.data
  }

  @VuexAction({ commit: 'updateItemLocal' })
  async update (param: { listId: string; itemId: string; item: Item }) {
    const itemResponse = await $axios.put(`/api/shopping-lists/${param.listId}/items/${param.itemId}`, param.item)

    return itemResponse.data
  }

  @VuexMutation
  setLists (items: Item[]) {
    this._items = items
  }

  @VuexMutation
  addItemLocal (item: Item) {
    this._items.push(item)
  }

  @VuexMutation
  updateItemLocal (updatedItem: Item) {
    this._items = this._items.map((item) => {
      if (item.id === updatedItem.id) { return updatedItem }

      return item
    })
  }
}

export const itemStore = getModule(ItemStore)
