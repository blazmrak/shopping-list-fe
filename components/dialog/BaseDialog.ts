import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component
export class BaseDialog extends Vue {
  @Prop({ default: () => false, type: Boolean })
  show!: boolean

  @Emit()
  opened (dialog: boolean) {
    return dialog
  }
}
