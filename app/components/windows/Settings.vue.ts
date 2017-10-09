import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Inject } from '../../util/injector';
import ModalLayout from '../ModalLayout.vue';
import NavMenu from '../shared/NavMenu.vue';
import NavItem from '../shared/NavItem.vue';
import GenericFormGroups from '../shared/forms/GenericFormGroups.vue';
import { WindowsService } from '../../services/windows';
import { ISettingsServiceApi, ISettingsState, ISettingsSubCategory } from '../../services/settings';
import windowMixin from '../mixins/window';
import ExtraSettings from '../ExtraSettings.vue';
import Hotkeys from '../Hotkeys.vue';

@Component({
  components: {
    ModalLayout,
    GenericFormGroups,
    NavMenu,
    NavItem,
    ExtraSettings,
    Hotkeys
  },
  mixins: [windowMixin]
})
export default class SceneTransitions extends Vue {

  @Inject()
  settingsService: ISettingsServiceApi;

  @Inject()
  windowsService: WindowsService;

  categoryName = 'General';
  settingsData = this.settingsService.getSettingsFormData(this.categoryName);
  icons: {[key in keyof ISettingsState]: string} = {
    General: 'th-large',
    Stream: 'globe',
    Output: 'microchip',
    Video: 'film',
    Audio: 'volume-up',
    Hotkeys: 'keyboard-o',
    Advanced: 'cogs'
  };

  get categoryNames() {
    return this.settingsService.getCategories();
  }

  save(settingsData: ISettingsSubCategory[]) {
    this.settingsService.setSettings(this.categoryName, settingsData);
    this.settingsData = this.settingsService.getSettingsFormData(this.categoryName);
  }

  done() {
    this.windowsService.closeChildWindow();
  }

  @Watch('categoryName')
  onCategoryNameChangedHandler(categoryName: string) {
    this.settingsData = this.settingsService.getSettingsFormData(categoryName);
  }

}
