import Vue, { VueConstructor } from 'vue';
import { Ajax } from './helper/ajax';
import { Api } from './helper/api';
import { Validators } from './helper/validators';

declare module 'vue/types/vue' {
  interface Vue {
    $ajax: Ajax;
    $api: Api;
    $validators: Validators;
  }
  interface VueConstructor {
    $ajax: Ajax;
    $api: Api;
    $validators: Validators;
  }
}
