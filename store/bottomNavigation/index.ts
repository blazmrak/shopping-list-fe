import { getModule, Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'
import { store } from '~/store'

export interface Tab {
  label?: string
  icon?: string
  to: string
  exact?: boolean
}

@Module({ name: 'bottomNavigation', namespaced: true, stateFactory: true, dynamic: true, store })
class BottomNavigation extends VuexModule {
  private _tabs: Tab[] = []
  private page: string = ''

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

export const bottomNavigationStore = getModule(BottomNavigation)
