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

export interface ListItemCreate {
  itemId: string,
  quantity?: number
  cost?: number,
}

export interface ListItem extends ListItemCreate{
  id: string
  listId: string
  boughtAt?: Date | null,
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
  async fetchAll (listId: string) {
    const listItems = (await $axios.get(`/api/shopping-lists/${listId}/list-items`)).data

    return {
      _listItems: listItems.map(ListItemStore.mapToDomain)
    }
  }

  @VuexAction({ commit: 'updateLocal', rawError: false })
  async update (params: {listId: string, listItemId: string, listItem: ListItem}) {
    const response = await $axios.put(
      `/api/shopping-lists/${params.listId}/list-items/${params.listItemId}`,
      ListItemStore.mapToApi(params.listItem)
    )

    return response.data
  }

  @VuexAction({ commit: 'addLocal', rawError: false })
  async create (params: {listId: string, listItem: ListItem}) {
    const response = await $axios.post(
      `/api/shopping-lists/${params.listId}/list-items`,
      ListItemStore.mapToApi(params.listItem)
    )

    return response.data
  }

  @VuexAction({ commit: 'deleteLocal', rawError: false })
  async delete (params: {listId: string, listItemId: string }) {
    await $axios.delete(
      `/api/shopping-lists/${params.listId}/list-items/${params.listItemId}`
    )

    return params.listItemId
  }

  @VuexMutation
  setLists (listItems: ViewListItem[]) {
    this._listItems = listItems
  }

  @VuexMutation
  updateLocal (listItem: ViewListItem) {
    this._listItems = this._listItems.map((item) => {
      if (item.id === listItem.id) { return ListItemStore.mapToDomain(listItem) }

      return item
    })
  }

  @VuexMutation
  addLocal (listItem: ViewListItem) {
    this._listItems.push(listItem)
  }

  @VuexMutation
  deleteLocal (listItemId: string) {
    this._listItems = this._listItems.filter(listItem => listItem.id !== listItemId)
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
