import { Component, Vue } from 'nuxt-property-decorator'

@Component
export class BaseDialogContainer extends Vue {
  showDialog: boolean = false

  opened (show: boolean) {
    this.showDialog = show
  }
}
