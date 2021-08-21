import { getModule, Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'
import { store } from '~/store'

export interface Tab {
  label?: string
  icon?: string
  to: string
}

@Module({ name: 'tabs', namespaced: true, stateFactory: true, dynamic: true, store })
class Tabs extends VuexModule {
  private _tabs: Tab[] = []

  get tabs () {
    return this._tabs
  }

  @VuexMutation
  addTab (tab: Tab) {
    this._tabs.push(tab)

    this._tabs = [...this._tabs]
  }

  @VuexMutation
  setTabs (tabs: Tab[]) {
    this._tabs = tabs

    this._tabs = [...tabs]
  }

  @VuexMutation
  reset () {
    this._tabs = []
  }
}

export const tabsStore = getModule(Tabs)
