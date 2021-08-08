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

export interface ListItem {
  id: string
  listId: string
  itemId: string
  quantity?: number
  cost?: number,
  boughtAt?: Date,
  status: string
}

export interface ViewListItem extends ListItem {
  hidden?: boolean
}

@Module({ name: 'listItems', namespaced: true, stateFactory: true, dynamic: true, store })
class ListItemStore extends VuexModule {
  _listItems: ViewListItem[] = []

  get listItems () {
    return this._listItems
  }

  get required () {
    return this._listItems.filter(listItem => listItem.status === 'required')
  }

  get bought () {
    return this._listItems.filter(listItem => listItem.status === 'bought')
  }

  get archived () {
    return this._listItems.filter(listItem => listItem.status === 'archived')
  }

  @MutationAction({ mutate: ['_listItems'] })
  async fetchListItems (listId: string) {
    const listItems = (await $axios.get(`/api/shopping-lists/${listId}/list-items`)).data

    return {
      _listItems: listItems.map(ListItemStore.mapToDomain)
    }
  }

  @VuexAction({ commit: 'updateListItem', rawError: false })
  async updateItem (params: {listId: string, listItemId: string, listItem: ListItem}) {
    const response = await $axios.put(
      `/api/shopping-lists/${params.listId}/list-items/${params.listItemId}`,
      ListItemStore.mapToApi(params.listItem)
    )

    return response.data
  }

  @VuexAction({ commit: 'addListItem', rawError: false })
  async createNewItem (params: {listId: string, listItem: ListItem}) {
    const response = await $axios.post(
      `/api/shopping-lists/${params.listId}/list-items`,
      ListItemStore.mapToApi(params.listItem)
    )

    return response.data
  }

  @VuexMutation
  setLists (listItems: ViewListItem[]) {
    this._listItems = listItems
  }

  @VuexMutation
  updateListItem (listItem: ViewListItem) {
    this._listItems = this._listItems.map((item) => {
      if (item.id === listItem.id) { return ListItemStore.mapToDomain(listItem) }

      return item
    })
  }

  @VuexMutation
  addListItem (listItem: ViewListItem) {
    this._listItems.push(listItem)
  }

  private static mapToDomain (listItem: ListItem) {
    return {
      ...listItem,
      cost: (listItem?.cost ?? 0) / 100,
      boughtAt: (listItem.boughtAt && new Date(listItem.boughtAt))
    }
  }

  private static mapToApi (listItem: ListItem) {
    return {
      ...listItem,
      cost: (listItem.cost && Math.round(listItem.cost * 100)),
      boughtAt: listItem.boughtAt?.toISOString().substr(0, 23)
    }
  }
}

export const listItemStore = getModule(ListItemStore)
