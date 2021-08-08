import { getModule, Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'
import { store } from '~/store'

@Module({ name: 'menu', namespaced: true, stateFactory: true, dynamic: true, store })
class MenuStore extends VuexModule {
  private _show = false

  get show () {
    return this._show
  }

  @VuexMutation
  toggle () {
    this._show = !this._show
  }

  @VuexMutation
  hide () {
    this._show = false
  }

  @VuexMutation
  setShow (show: boolean) {
    this._show = show
  }
}

export const menuStore = getModule(MenuStore)
